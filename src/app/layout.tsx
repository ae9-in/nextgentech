import type { Metadata } from 'next';
import { Space_Grotesk, Inter } from 'next/font/google';
import './globals.css';
import { UserProvider } from '@/context/UserContext';
import { NextGenChatBot } from '@/components/NextGenChatBot';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['500', '600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-body',
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
        className={`${spaceGrotesk.variable} ${inter.variable} font-sans antialiased bg-[#FFFFFF] text-[#0A1E33] min-h-screen selection:bg-[#0E8C93] selection:text-white`}
      >
        <UserProvider>
          {children}
        </UserProvider>
        <NextGenChatBot />
      </body>
    </html>
  );
}
