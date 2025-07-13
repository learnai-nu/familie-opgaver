import React, { useState, useEffect } from 'react';
import { Task, FamilyMember } from '../types';
import { calculateTimeLeft } from '../utils/storage';

interface TaskListProps {
  tasks: Task[];
  onCompleteTask: (taskId: number) => void;
  currentUser: FamilyMember;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onCompleteTask,
  currentUser
}) => {
  const [timeLeft, setTimeLeft] = useState<{[key: number]: any}>({});

  useEffect(() => {
    const updateTimers = () => {
      const newTimeLeft: {[key: number]: any} = {};
      tasks.forEach(task => {
        if (!task.completed) {
          newTimeLeft[task.id] = calculateTimeLeft(task.deadline);
        }
      });
      setTimeLeft(newTimeLeft);
    };

    updateTimers();
    const interval = setInterval(updateTimers, 60000); // Update every minute

    return () => clearInterval(interval);
  }, [tasks]);

  const pendingTasks = tasks.filter(task => !task.completed);
  const completedTasks = tasks.filter(task => task.completed);

  const formatTimeLeft = (timeLeft: any) => {
    if (!timeLeft) return 'Forfalden';
    return `${timeLeft.hours}t ${timeLeft.minutes}m`;
  };

  const getTimeLeftColor = (timeLeft: any) => {
    if (!timeLeft) return 'text-red-600';
    if (timeLeft.urgent) return 'text-red-600';
    if (timeLeft.hours < 24) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="space-y-6">
      {/* Pending Tasks */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">📋</span>
          Afventende Opgaver ({pendingTasks.length})
        </h3>
        
        {pendingTasks.length === 0 ? (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🎉</div>
            <p className="text-gray-600">Ingen afventende opgaver!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingTasks.map(task => (
              <div 
                key={task.id}
                className="border-2 border-gray-200 rounded-lg p-4 hover:border-purple-300 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg text-gray-800 mb-2">
                      {task.title}
                    </h4>
                    
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center">
                        <span className="mr-2">⭐</span>
                        <span className="font-medium text-purple-600">
                          {task.points} point
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="mr-2">👤</span>
                        <span className="text-gray-600">
                          {task.category} år
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="mr-2">⏰</span>
                        <span className={`font-medium ${getTimeLeftColor(timeLeft[task.id])}`}>
                          {formatTimeLeft(timeLeft[task.id])}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <span className="mr-2">📅</span>
                        <span className="text-gray-600">
                          {new Date(task.deadline).toLocaleDateString('da-DK')}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {currentUser.role === 'child' && (
                    <button
                      onClick={() => onCompleteTask(task.id)}
                      className="ml-4 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105 shadow-lg"
                    >
                      Fuldfør
                    </button>
                  )}
                </div>
                
                {/* Urgent Warning */}
                {timeLeft[task.id]?.urgent && (
                  <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center text-red-700">
                      <span className="mr-2">🚨</span>
                      <span className="font-medium">Hasteopgave! Skal fuldføres snart!</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">✅</span>
            Fuldførte Opgaver ({completedTasks.length})
          </h3>
          
          <div className="space-y-3">
            {completedTasks.map(task => (
              <div 
                key={task.id}
                className="bg-green-50 border border-green-200 rounded-lg p-4"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800 line-through">
                      {task.title}
                    </h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                      <span>⭐ {task.points} point tjent</span>
                      <span>✅ Fuldført</span>
                    </div>
                  </div>
                  <div className="text-green-600 text-2xl">🎉</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskList; 