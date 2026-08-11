interface FetchOptions extends RequestInit {
  params?: Record<string, string>;
}

class ApiClient {
  private getAuthToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('nxtgen_access_token');
  }

  private setAuthTokens(accessToken: string, refreshToken: string) {
    if (typeof window === 'undefined') return;
    localStorage.setItem('nxtgen_access_token', accessToken);
    localStorage.setItem('nxtgen_refresh_token', refreshToken);
  }

  public clearAuth() {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('nxtgen_access_token');
    localStorage.removeItem('nxtgen_refresh_token');
    localStorage.removeItem('nxtgen_user');
  }

  public async request<T = any>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { params, headers, ...customConfig } = options;

    let url = endpoint;
    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    const token = this.getAuthToken();
    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (token) {
      defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    const config: RequestInit = {
      method: options.method || 'GET',
      headers: {
        ...defaultHeaders,
        ...headers,
      },
      ...customConfig,
    };

    try {
      let response = await fetch(url, config);

      // Handle token refresh on 401 Unauthorized
      if (response.status === 401 && endpoint !== '/api/v1/auth/login' && endpoint !== '/api/v1/auth/refresh') {
        const refreshToken = localStorage.getItem('nxtgen_refresh_token');
        if (refreshToken) {
          try {
            const refreshRes = await fetch('/api/v1/auth/refresh', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ refreshToken }),
            });
            const refreshData = await refreshRes.json();
            if (refreshData.success) {
              this.setAuthTokens(refreshData.data.accessToken, refreshData.data.refreshToken);
              (config.headers as Record<string, string>)['Authorization'] = `Bearer ${refreshData.data.accessToken}`;
              response = await fetch(url, config);
            } else {
              this.clearAuth();
            }
          } catch {
            this.clearAuth();
          }
        }
      }

      const resData = await response.json();
      if (!response.ok || resData.success === false) {
        throw new Error(resData?.error?.message || resData?.message || 'API request failed');
      }

      return resData.data !== undefined ? resData.data : resData;
    } catch (error: any) {
      console.error(`[API Error: ${endpoint}]`, error);
      throw error;
    }
  }

  public get<T = any>(endpoint: string, params?: Record<string, string>) {
    return this.request<T>(endpoint, { method: 'GET', params });
  }

  public post<T = any>(endpoint: string, body?: any) {
    return this.request<T>(endpoint, { method: 'POST', body: JSON.stringify(body) });
  }

  public patch<T = any>(endpoint: string, body?: any) {
    return this.request<T>(endpoint, { method: 'PATCH', body: JSON.stringify(body) });
  }

  public delete<T = any>(endpoint: string) {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }
}

export const apiClient = new ApiClient();
