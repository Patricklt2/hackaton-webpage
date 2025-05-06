'use client';

import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Layout from '../components/layouts/Main';
import Fonts from '../components/Fonts';
import theme from '../lib/theme';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ChakraProvider theme={theme}>
          <Fonts />
          <Layout>
            {children}
          </Layout>
        </ChakraProvider>
      </body>
    </html>
  );
}