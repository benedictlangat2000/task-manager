// frontend/app/providers.tsx
'use client';
import { ApolloProvider } from '@apollo/client';
import client from '../apollo-client';
import { ReactNode } from 'react';
import React from 'react';


export default function Providers({ children }: { children: ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
