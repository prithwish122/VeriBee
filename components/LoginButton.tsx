// 'use client'

// import { useOCAuth } from '@opencampus/ocid-connect-js';
// import { JSX } from 'react';

// export default function LoginButton(): JSX.Element {
//   const { ocAuth } = useOCAuth();

//   const handleLogin = async (): Promise<void> => {
//     try {
//       await ocAuth.signInWithRedirect({ state: 'opencampus' });
//     } catch (error) {
//       console.error('Login error:', error);
//     }
//   };

//   return <button onClick={handleLogin}>OCID Login</button>;
// }
