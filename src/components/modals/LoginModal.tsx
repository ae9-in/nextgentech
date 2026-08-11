'use client';

import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { LogIn, KeyRound, ArrowRight } from 'lucide-react';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoggedIn(true);
    setTimeout(() => {
      onClose();
      setLoggedIn(false);
    }, 1500);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Student Portal Login">
      {loggedIn ? (
        <div className="py-8 text-center space-y-3">
          <div className="w-12 h-12 bg-purple-500/20 text-purple-400 rounded-full flex items-center justify-center mx-auto border border-purple-500/40 animate-pulse">
            <LogIn className="w-6 h-6" />
          </div>
          <h4 className="text-xl font-bold text-white">Logging You In...</h4>
          <p className="text-xs text-slate-400">Redirecting to NextGen Tech Student LMS Dashboard</p>
        </div>
      ) : (
        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1">
              Registered Email
            </label>
            <input
              type="email"
              required
              placeholder="student@college.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <a href="#" className="text-xs text-purple-400 hover:underline">
                Forgot password?
              </a>
            </div>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-900/80 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 text-sm"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-bold hover:opacity-95 transition-all flex items-center justify-center gap-2"
          >
            <span>Access Student Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <p className="text-xs text-slate-400 text-center pt-2">
            Don't have an account yet?{' '}
            <button
              type="button"
              onClick={onClose}
              className="text-cyan-400 hover:underline font-semibold"
            >
              Enroll in a program
            </button>
          </p>
        </form>
      )}
    </Modal>
  );
};
