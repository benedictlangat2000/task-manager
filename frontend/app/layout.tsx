// frontend/app/layout.tsx
import Providers from './providers';
import './globals.css';
import React from 'react';


export const metadata = {
  title: 'Task Management App'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
