import React, { useState, useEffect } from 'react';
import { FamilyData } from './types';
import { loadData, saveData } from './utils/storage';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import RewardShop from './components/RewardShop';
import PointTracker from './components/PointTracker';
import './App.css';

function App() {
  const [data, setData] = useState<FamilyData>(loadData);
  const [currentView, setCurrentView] = useState<'dashboard' | 'tasks' | 'rewards'>('dashboard');

  useEffect(() => {
    saveData(data);
  }, [data]);

  const updateData = (newData: Partial<FamilyData>) => {
    setData(prev => ({ ...prev, ...newData }));
  };

  const switchUser = (userId: number) => {
    const member = data.members.find(m => m.id === userId);
    if (member) {
      updateData({ currentUser: member });
    }
  };

  const addTask = (task: Omit<typeof data.tasks[0], 'id'>) => {
    const newTask = {
      ...task,
      id: Math.max(...data.tasks.map(t => t.id), 0) + 1
    };
    updateData({ tasks: [...data.tasks, newTask] });
  };

  const completeTask = (taskId: number) => {
    const updatedTasks = data.tasks.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    );
    
    const task = data.tasks.find(t => t.id === taskId);
    if (task) {
      const updatedMembers = data.members.map(member =>
        member.id === task.assignedTo 
          ? { ...member, points: member.points + task.points }
          : member
      );
      updateData({ tasks: updatedTasks, members: updatedMembers });
    }
  };

  const purchaseReward = (rewardId: number) => {
    const reward = data.rewards.find(r => r.id === rewardId);
    if (!reward) return;

    if (reward.type === 'individual') {
      const currentUser = data.members.find(m => m.id === data.currentUser.id);
      if (currentUser && currentUser.points >= reward.price) {
        const updatedMembers = data.members.map(member =>
          member.id === data.currentUser.id
            ? { ...member, points: member.points - reward.price }
            : member
        );
        updateData({ members: updatedMembers });
      }
    } else {
      if (data.communalPoints >= reward.price) {
        updateData({ communalPoints: data.communalPoints - reward.price });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      <Navigation 
        currentUser={data.currentUser}
        members={data.members}
        onSwitchUser={switchUser}
        currentView={currentView}
        onViewChange={setCurrentView}
      />
      
      <div className="container mx-auto px-4 py-6">
        <PointTracker 
          currentUser={data.currentUser}
          communalPoints={data.communalPoints}
          communalGoal={data.communalGoal}
        />
        
        {currentView === 'dashboard' && (
          <Dashboard 
            currentUser={data.currentUser}
            tasks={data.tasks}
            onCompleteTask={completeTask}
          />
        )}
        
        {currentView === 'tasks' && (
          <div className="space-y-6">
            {data.currentUser.role === 'parent' && (
              <TaskForm onAddTask={addTask} members={data.members} />
            )}
            <TaskList 
              tasks={data.tasks.filter(t => t.assignedTo === data.currentUser.id)}
              onCompleteTask={completeTask}
              currentUser={data.currentUser}
            />
          </div>
        )}
        
        {currentView === 'rewards' && (
          <RewardShop 
            rewards={data.rewards}
            onPurchase={purchaseReward}
            currentUser={data.currentUser}
            communalPoints={data.communalPoints}
          />
        )}
      </div>
    </div>
  );
}

export default App;
