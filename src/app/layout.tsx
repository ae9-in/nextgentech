import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { UserProvider } from '@/context/UserContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'NextGen Tech — Developer Experiences, Internships & Bootcamps',
  description: 'Hands-on IT training, simulated developer internships, and intensive bootcamps built for the next generation of engineers.',
  keywords: ['IT Training', 'Web Development Bootcamp', 'Developer Internship', '1-Day Coding Workshop', 'NextGen Tech', 'EdTech', 'React', 'AI Engineering'],
  authors: [{ name: 'NextGen Tech' }],
  openGraph: {
    title: 'NextGen Tech — Modern Technical Education',
    description: 'Hands-on IT training, simulated developer internships, and intensive bootcamps.',
    type: 'website',
    locale: 'en_US',
    siteName: 'NextGen Tech',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} antialiased bg-[#0D1117] text-[#F5F7FA] min-h-screen selection:bg-[#3B82F6] selection:text-white`}
      >
        <UserProvider>
          {children}
        </UserProvider>
      </body>
    </html>
  );
}
