'use client';

import { LoginCallBack } from '@opencampus/ocid-connect-js';
import { useRouter } from 'next/navigation';
import { useOCAuth } from '@opencampus/ocid-connect-js'; // Assuming this is where useOCAuth is from
import React, { JSX } from 'react';

export default function RedirectPage() {
  const router = useRouter();

  const loginSuccess = (): void => {
    router.push('/'); // Redirect after successful login
  };

  const loginError = (error: unknown): void => {
    console.error('Login error:', error);
  };

  function CustomErrorComponent(): JSX.Element {
    const { authState } = useOCAuth();
    return <div>Error Logging in: {authState.error?.message}</div>;
  }

  function CustomLoadingComponent(): JSX.Element {
    return <div>Loading....</div>;
  }

  return (
    <LoginCallBack 
      errorCallback={loginError} 
      successCallback={loginSuccess}
      customErrorComponent={<CustomErrorComponent />}
      customLoadingComponent={<CustomLoadingComponent />} 
    />
  );
}
