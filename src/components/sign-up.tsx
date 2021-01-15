import React, { useState } from 'react';

import { signUpWithEmail } from '@libs/client/auth';

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignUpWithEmail = async (): Promise<void> => {
    try {
      setLoading(true);
      await signUpWithEmail(email, password);
      // Do not setLoading(false) because Signup will unmount this component.
    } catch (err) {
      setLoading(true);
    }
  };

  return (
    <div>
      <h2>Sign up</h2>
      <input value={email} onChange={(event) => setEmail(event.target.value)} />
      <input
        value={password}
        type="password"
        onChange={(event) => setPassword(event.target.value)}
      />
      <button onClick={handleSignUpWithEmail}>
        {loading ? 'loading...' : 'Sign up with email'}
      </button>
    </div>
  );
};

export default SignUp;
