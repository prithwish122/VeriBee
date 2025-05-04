'use client'

import { ReactNode, useEffect } from 'react';
import { OCConnect } from '@opencampus/ocid-connect-js';

interface OCConnectWrapperProps {
  children: ReactNode;
  opts: {
    redirectUri: string;
    referralCode: string;
  };
  sandboxMode?: boolean;
}

export default function OCConnectWrapper({ children, opts, sandboxMode = false }: OCConnectWrapperProps) {
  useEffect(() => {
    console.log('OCConnect initialized with options:', {
      ...opts,
      sandboxMode
    });
  }, [opts, sandboxMode]);

  return (
    <OCConnect opts={opts} sandboxMode={sandboxMode}>
      {children}
    </OCConnect>
  );
}