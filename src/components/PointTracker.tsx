import React from 'react';
import { FamilyMember, CommunalGoal } from '../types';

interface PointTrackerProps {
  currentUser: FamilyMember;
  communalPoints: number;
  communalGoal: CommunalGoal;
}

const PointTracker: React.FC<PointTrackerProps> = ({
  currentUser,
  communalPoints,
  communalGoal
}) => {
  const progressPercentage = Math.min((communalPoints / communalGoal.target) * 100, 100);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Individual Points */}
        <div className="text-center">
          <div className="text-4xl mb-2">⭐</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            {currentUser.name}s Point
          </h3>
          <div className="text-3xl font-bold text-purple-600 mb-2">
            {currentUser.points}
          </div>
          <div className="text-sm text-gray-500">
            {currentUser.role === 'child' ? 'Dine point' : 'Forælder point'}
          </div>
        </div>

        {/* Communal Points */}
        <div className="text-center">
          <div className="text-4xl mb-2">🏠</div>
          <h3 className="text-lg font-semibold text-gray-700 mb-1">
            Fælles Point
          </h3>
          <div className="text-3xl font-bold text-green-600 mb-2">
            {communalPoints}
          </div>
          <div className="text-sm text-gray-500">
            af {communalGoal.target} til {communalGoal.title}
          </div>
          
          {/* Progress Bar */}
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-600 h-3 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="text-xs text-gray-500 mt-1">
              {Math.round(progressPercentage)}% fuldført
            </div>
          </div>
        </div>
      </div>

      {/* Goal Display */}
      <div className="mt-4 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 rounded-full">
          <span className="text-lg mr-2">🎯</span>
          <span className="font-semibold text-gray-700">
            Mål: {communalGoal.title}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PointTracker; 