import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex space-x-8 mb-6">
          <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
            <img src={viteLogo} className="h-16 w-16" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
            <img src={reactLogo} className="h-16 w-16" alt="React logo" />
          </a>
        </div>
        <h1 className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-4">Vite + React + Tailwind</h1>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-4">
          <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" onClick={() => setCount((count) => count + 1)}>
            count is {count}
          </button>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            Edit <code>src/App.jsx</code> and save to test HMR
          </p>
        </div>
        <p className="text-gray-500 dark:text-gray-400">
          Click on the Vite and React logos to learn more
        </p>
      </div>
    </>
  )
}

export default App
