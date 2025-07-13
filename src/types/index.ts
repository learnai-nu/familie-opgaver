export interface FamilyMember {
  id: number;
  name: string;
  age: number;
  role: 'parent' | 'child';
  points: number;
}

export interface Task {
  id: number;
  title: string;
  points: number;
  assignedTo: number;
  deadline: string;
  completed: boolean;
  category: string;
}

export interface Reward {
  id: number;
  title: string;
  price: number;
  type: 'individual' | 'family';
  icon?: string;
}

export interface CommunalGoal {
  title: string;
  target: number;
}

export interface FamilyData {
  currentUser: FamilyMember;
  members: FamilyMember[];
  tasks: Task[];
  rewards: Reward[];
  communalPoints: number;
  communalGoal: CommunalGoal;
}

export interface TimeLeft {
  hours: number;
  minutes: number;
  urgent: boolean;
} 