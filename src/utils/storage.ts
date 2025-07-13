import { FamilyData } from '../types';

const STORAGE_KEY = 'familyChoresData';

export const getInitialData = (): FamilyData => ({
  currentUser: { id: 1, name: "Josefine", age: 8, role: "child", points: 45 },
  members: [
    { id: 1, name: "Josefine", age: 8, role: "child", points: 45 },
    { id: 2, name: "Lilly", age: 12, role: "child", points: 78 },
    { id: 3, name: "William", age: 42, role: "parent", points: 0 }
  ],
  tasks: [
    { 
      id: 1, 
      title: "Ryd op på værelset", 
      points: 10, 
      assignedTo: 1, 
      deadline: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString(), // 2 hours from now
      completed: false,
      category: "5-9"
    },
    { 
      id: 2, 
      title: "Tøm opvaskemaskine", 
      points: 5, 
      assignedTo: 2, 
      deadline: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // tomorrow
      completed: false,
      category: "10-13"
    },
    { 
      id: 3, 
      title: "Støvsug stue", 
      points: 15, 
      assignedTo: 1, 
      deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days from now
      completed: false,
      category: "5-9"
    }
  ],
  rewards: [
    { id: 1, title: "Ekstra fredagsslik", price: 20, type: "individual", icon: "🍬" },
    { id: 2, title: "Filmaften", price: 35, type: "individual", icon: "🎬" },
    { id: 3, title: "Biograftur", price: 150, type: "family", icon: "🎭" },
    { id: 4, title: "Zoo-besøg", price: 200, type: "family", icon: "🦁" }
  ],
  communalPoints: 25,
  communalGoal: { title: "Biograftur", target: 500 }
});

export const loadData = (): FamilyData => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : getInitialData();
  } catch (error) {
    console.error('Error loading data:', error);
    return getInitialData();
  }
};

export const saveData = (data: FamilyData): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const calculateTimeLeft = (deadline: string) => {
  const now = new Date();
  const target = new Date(deadline);
  const difference = target.getTime() - now.getTime();
  
  if (difference > 0) {
    return {
      hours: Math.floor(difference / (1000 * 60 * 60)),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      urgent: difference < 2 * 60 * 60 * 1000 // Under 2 timer
    };
  }
  return null;
}; 