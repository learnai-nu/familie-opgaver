import React from 'react';
import { FamilyMember } from '../types';

interface NavigationProps {
  currentUser: FamilyMember;
  members: FamilyMember[];
  onSwitchUser: (userId: number) => void;
  currentView: 'dashboard' | 'tasks' | 'rewards';
  onViewChange: (view: 'dashboard' | 'tasks' | 'rewards') => void;
}

const Navigation: React.FC<NavigationProps> = ({
  currentUser,
  members,
  onSwitchUser,
  currentView,
  onViewChange
}) => {
  return (
    <nav className="bg-white shadow-lg border-b-4 border-purple-500">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Title */}
          <div className="flex items-center space-x-3">
            <div className="text-3xl">🏠</div>
            <h1 className="text-2xl font-bold text-gray-800">Familie Pligter</h1>
          </div>

          {/* User Switcher */}
          <div className="flex items-center space-x-4">
            <div className="relative">
              <select
                value={currentUser.id}
                onChange={(e) => onSwitchUser(Number(e.target.value))}
                className="appearance-none bg-purple-100 border-2 border-purple-300 rounded-lg px-4 py-2 pr-8 text-purple-800 font-semibold focus:outline-none focus:border-purple-500 transition-colors"
              >
                {members.map(member => (
                  <option key={member.id} value={member.id}>
                    {member.name} ({member.role === 'parent' ? 'Forælder' : 'Barn'})
                  </option>
                ))}
              </select>
              <div className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="flex space-x-1 pb-4">
          <button
            onClick={() => onViewChange('dashboard')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
              currentView === 'dashboard'
                ? 'bg-purple-500 text-white shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            📊 Dashboard
          </button>
          <button
            onClick={() => onViewChange('tasks')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
              currentView === 'tasks'
                ? 'bg-purple-500 text-white shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            ✅ Opgaver
          </button>
          <button
            onClick={() => onViewChange('rewards')}
            className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-200 ${
              currentView === 'rewards'
                ? 'bg-purple-500 text-white shadow-lg transform scale-105'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            🎁 Belønninger
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 