const Unauthorized = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
    <div className="bg-white dark:bg-gray-800 p-8 rounded shadow-md w-full max-w-sm text-center">
      <h2 className="text-2xl font-bold mb-6 text-red-600 dark:text-red-400">Unauthorized</h2>
      <p className="text-gray-700 dark:text-gray-300">You do not have permission to view this page.</p>
    </div>
  </div>
);

export default Unauthorized;
