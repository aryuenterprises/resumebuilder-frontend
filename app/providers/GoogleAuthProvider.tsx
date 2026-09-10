'use client';

import { GoogleOAuthProvider } from '@react-oauth/google';
import React from 'react';

export default function GoogleAuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {

    
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '913819624664-d3d2mocd11d5e5m24lg3kkfl99lk944b.apps.googleusercontent.com';

  return (
    <GoogleOAuthProvider clientId={clientId}>
      {children}
    </GoogleOAuthProvider>
  );
}