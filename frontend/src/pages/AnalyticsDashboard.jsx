import { useEffect, useState } from 'react';
import axios from 'axios';

const AnalyticsDashboard = () => {
  const [taskProgress, setTaskProgress] = useState(null);
  const [memberActivity, setMemberActivity] = useState([]);

  useEffect(() => {
    axios.get('/api/analytics/task-progress')
      .then(res => setTaskProgress(res.data));
    axios.get('/api/analytics/member-activity')
      .then(res => setMemberActivity(res.data));
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-blue-600 dark:text-blue-400">Analytics Dashboard</h2>
      <div className="mb-8 bg-white dark:bg-gray-800 rounded shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Task Progress</h3>
        {taskProgress ? (
          <div className="flex space-x-8">
            <div>Todo: <span className="font-bold">{taskProgress.todo}</span></div>
            <div>In Progress: <span className="font-bold">{taskProgress.inProgress}</span></div>
            <div>Done: <span className="font-bold">{taskProgress.done}</span></div>
            <div>Total: <span className="font-bold">{taskProgress.total}</span></div>
          </div>
        ) : <p>Loading...</p>}
      </div>
      <div className="bg-white dark:bg-gray-800 rounded shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Member Activity</h3>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
              <th className="py-2">Role</th>
              <th className="py-2">Assigned</th>
              <th className="py-2">Completed</th>
            </tr>
          </thead>
          <tbody>
            {memberActivity.map(({ user, assigned, completed }) => (
              <tr key={user.id} className="border-t">
                <td className="py-2">{user.name}</td>
                <td className="py-2">{user.email}</td>
                <td className="py-2">{user.role}</td>
                <td className="py-2">{assigned}</td>
                <td className="py-2">{completed}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
