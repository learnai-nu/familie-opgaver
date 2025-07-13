import React, { useState } from 'react';
import { FamilyMember } from '../types';

interface TaskFormProps {
  onAddTask: (task: {
    title: string;
    points: number;
    assignedTo: number;
    deadline: string;
    category: string;
  }) => void;
  members: FamilyMember[];
}

const TaskForm: React.FC<TaskFormProps> = ({ onAddTask, members }) => {
  const [formData, setFormData] = useState({
    title: '',
    points: 5,
    assignedTo: 1,
    deadline: '',
    category: '5-9'
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title.trim() && formData.deadline) {
      onAddTask({
        ...formData,
        deadline: new Date(formData.deadline).toISOString()
      });
      setFormData({
        title: '',
        points: 5,
        assignedTo: 1,
        deadline: '',
        category: '5-9'
      });
      setIsExpanded(false);
    }
  };

  const children = members.filter(member => member.role === 'child');

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-gray-800 flex items-center">
          <span className="mr-2">➕</span>
          Opret Ny Opgave
        </h3>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors"
        >
          {isExpanded ? 'Skjul' : 'Vis Formular'}
        </button>
      </div>

      {isExpanded && (
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Task Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opgave Titel
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="F.eks. Ryd op på værelset"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              required
            />
          </div>

          {/* Points and Assignment */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Point
              </label>
              <select
                value={formData.points}
                onChange={(e) => setFormData({ ...formData, points: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value={5}>5 point</option>
                <option value={10}>10 point</option>
                <option value={15}>15 point</option>
                <option value={20}>20 point</option>
                <option value={25}>25 point</option>
                <option value={30}>30 point</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tildel til
              </label>
              <select
                value={formData.assignedTo}
                onChange={(e) => setFormData({ ...formData, assignedTo: Number(e.target.value) })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                {children.map(child => (
                  <option key={child.id} value={child.id}>
                    {child.name} ({child.age} år)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Deadline and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Deadline
              </label>
              <input
                type="datetime-local"
                value={formData.deadline}
                onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Aldersgruppe
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="5-9">5-9 år</option>
                <option value="10-13">10-13 år</option>
                <option value="14+">14+ år</option>
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={() => setIsExpanded(false)}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
            >
              Annuller
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold transition-colors transform hover:scale-105"
            >
              Opret Opgave
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default TaskForm; 