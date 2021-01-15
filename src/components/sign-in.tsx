import React, { useState } from 'react';

import { signInWithEmail } from '@libs/client/auth';

const SignIn: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignInWithEmail = async (): Promise<void> => {
    try {
      setLoading(true);
      await signInWithEmail(email, password);
      // Do not setLoading(false) because Signin will unmount this component.
    } catch (err) {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Sign in</h2>
      <input value={email} onChange={(event) => setEmail(event.target.value)} />
      <input
        value={password}
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <button onClick={handleSignInWithEmail}>
        {loading ? 'loading...' : 'Sign in with email'}
      </button>
    </div>
  );
};

export default SignIn;
