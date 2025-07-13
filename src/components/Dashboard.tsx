import React from 'react';
import { FamilyMember, Task } from '../types';
import { calculateTimeLeft } from '../utils/storage';

interface DashboardProps {
  currentUser: FamilyMember;
  tasks: Task[];
  onCompleteTask: (taskId: number) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  currentUser,
  tasks,
  onCompleteTask
}) => {
  const userTasks = tasks.filter(task => task.assignedTo === currentUser.id);
  const pendingTasks = userTasks.filter(task => !task.completed);
  const completedTasks = userTasks.filter(task => task.completed);

  const getUrgentTasks = () => {
    return pendingTasks.filter(task => {
      const timeLeft = calculateTimeLeft(task.deadline);
      return timeLeft && timeLeft.urgent;
    });
  };

  const urgentTasks = getUrgentTasks();

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-purple-500 to-blue-500 rounded-xl p-6 text-white">
        <h2 className="text-2xl font-bold mb-2">
          Hej {currentUser.name}! 👋
        </h2>
        <p className="text-purple-100">
          {currentUser.role === 'parent' 
            ? 'Du har ' + pendingTasks.length + ' opgaver at fordele'
            : 'Du har ' + pendingTasks.length + ' opgaver at fuldføre'
          }
        </p>
      </div>

      {/* Urgent Tasks Alert */}
      {urgentTasks.length > 0 && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-lg">
          <div className="flex items-center">
            <div className="text-2xl mr-3">🚨</div>
            <div>
              <h3 className="font-semibold text-red-800">
                Hasteopgaver!
              </h3>
              <p className="text-red-700">
                Du har {urgentTasks.length} opgave(r) der skal fuldføres inden for 2 timer
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-md text-center">
          <div className="text-2xl mb-2">📋</div>
          <div className="text-2xl font-bold text-blue-600">{pendingTasks.length}</div>
          <div className="text-sm text-gray-600">Afventende</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md text-center">
          <div className="text-2xl mb-2">✅</div>
          <div className="text-2xl font-bold text-green-600">{completedTasks.length}</div>
          <div className="text-sm text-gray-600">Fuldført</div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-md text-center">
          <div className="text-2xl mb-2">⭐</div>
          <div className="text-2xl font-bold text-purple-600">{currentUser.points}</div>
          <div className="text-sm text-gray-600">Point</div>
        </div>
      </div>

      {/* Recent Tasks */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          {currentUser.role === 'parent' ? 'Seneste Opgaver' : 'Dine Opgaver'}
        </h3>
        
        {pendingTasks.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🎉</div>
            <p className="text-gray-600">
              {currentUser.role === 'parent' 
                ? 'Alle opgaver er fordelt!' 
                : 'Alle dine opgaver er fuldført!'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingTasks.slice(0, 3).map(task => {
              const timeLeft = calculateTimeLeft(task.deadline);
              return (
                <div 
                  key={task.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{task.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>⭐ {task.points} point</span>
                      {timeLeft && (
                        <span className={`font-medium ${
                          timeLeft.urgent ? 'text-red-600' : 'text-gray-600'
                        }`}>
                          ⏰ {timeLeft.hours}t {timeLeft.minutes}m
                        </span>
                      )}
                    </div>
                  </div>
                  {currentUser.role === 'child' && (
                    <button
                      onClick={() => onCompleteTask(task.id)}
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
                    >
                      Fuldfør
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard; 