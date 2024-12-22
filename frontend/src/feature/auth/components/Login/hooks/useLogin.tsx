import { login } from '@/feature/auth/actions/login';
import { useState } from 'react';

export function useLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const response = await login({ email, password });
    // レスポンスが存在する時はエラーのケース
    if (response) {
      setError(response.message);
    }
  };

  return {
    email,
    password,
    error,
    setEmail,
    setPassword,
    handleSubmit,
  };
}
