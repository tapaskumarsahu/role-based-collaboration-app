import { useState } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add login logic (API call)
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <form className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm" onSubmit={handleSubmit}>
        <h2 className="text-2xl font-bold mb-6 text-center text-blue-600 dark:text-blue-400">Login</h2>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Email</label>
          <input type="email" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="mb-6">
          <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">Password</label>
          <input type="password" className="w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600">Login</button>
      </form>
    </div>
  );
};

export default Login;
