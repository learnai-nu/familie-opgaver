import React, { useState, useEffect } from 'react';
import { Home, Star, Users, Gift, CheckCircle, Plus } from 'lucide-react';

// Demo data
const familyMembers = [
  { id: 1, name: 'Josefine', age: 13, role: 'child', avatar: '👧' },
  { id: 2, name: 'Lilly', age: 9, role: 'child', avatar: '👧' },
  { id: 3, name: 'William', age: 7, role: 'child', avatar: '👦' },
  { id: 4, name: 'Mor', age: 42, role: 'parent', avatar: '👩' },
  { id: 5, name: 'Far', age: 46, role: 'parent', avatar: '👨' }
];

const initialTasks = [
  { id: 1, title: 'Ryd op på værelset', description: 'Ryd op på dit værelse og gør det rent', points: 10, deadline: '2025-07-13T18:00', completed: false, assignedTo: 1, frequency: 'once', category: '10-13', weekday: 'monday', createdBy: 4 },
  { id: 2, title: 'Tøm opvaskemaskine', description: 'Tøm opvaskemaskinen og ryd op', points: 5, deadline: '2025-07-14T16:00', completed: false, assignedTo: 2, frequency: 'daily', category: '5-9', weekday: 'monday', createdBy: 4 },
  { id: 3, title: 'Støvsug stue', description: 'Støvsug hele stuen grundigt', points: 15, deadline: '2025-07-15T12:00', completed: false, assignedTo: 3, frequency: 'weekly', category: '5-9', weekday: 'saturday', createdBy: 5 }
] as Array<{
  id: number;
  title: string;
  description: string;
  points: number;
  deadline: string | null;
  completed: boolean;
  assignedTo: number;
  frequency: string;
  category: string;
  weekday: string;
  createdBy: number;
}>;

// Initial rewards data
const initialRewards = [
  { id: 1, title: 'Ekstra fredagsslik', price: 20, type: 'individual' as const, icon: '🍬' },
  { id: 2, title: 'Filmaften', price: 35, type: 'individual' as const, icon: '🎬' },
  { id: 3, title: 'Biograftur', price: 150, type: 'family' as const, icon: '🎭' },
  { id: 4, title: 'Zoo-besøg', price: 200, type: 'family' as const, icon: '🦁' }
];

type Reward = typeof initialRewards[0];

// Styles object
const styles = {
  app: {
    minHeight: '100vh',
    backgroundColor: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    backgroundAttachment: 'fixed'
  },
  navigation: {
    background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
    color: 'white',
    padding: '1.25rem 1rem',
    boxShadow: '0 8px 32px rgba(124, 58, 237, 0.3)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backdropFilter: 'blur(10px)',
    borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
  },
  userSelect: {
    background: 'rgba(255, 255, 255, 0.15)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: '12px',
    padding: '0.75rem 1rem',
    color: 'white',
    fontSize: '0.875rem',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.2s ease',
    fontWeight: '500'
  },
  pointsBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    background: 'rgba(255, 255, 255, 0.15)',
    padding: '0.75rem 1.25rem',
    borderRadius: '25px',
    fontSize: '0.875rem',
    fontWeight: '600',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
  },
  card: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '16px',
    padding: '1.75rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    marginBottom: '1.5rem',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    transition: 'all 0.3s ease'
  },
  buttonPrimary: {
    background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
    color: 'white',
    border: 'none',
    padding: '14px 28px',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.875rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 16px rgba(124, 58, 237, 0.3)',
    position: 'relative' as const,
    overflow: 'hidden'
  },
  buttonSuccess: {
    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    color: 'white',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)'
  },

  progressBar: {
    background: 'rgba(226, 232, 240, 0.8)',
    borderRadius: '9999px',
    height: '1.25rem',
    overflow: 'hidden',
    marginBottom: '0.75rem',
    boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
  },
  progressFill: {
    background: 'linear-gradient(90deg, #059669 0%, #3b82f6 100%)',
    height: '100%',
    transition: 'width 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 2px 8px rgba(5, 150, 105, 0.3)',
    position: 'relative' as const
  },
  bottomTabs: {
    position: 'fixed' as const,
    bottom: 0,
    left: 0,
    right: 0,
    background: 'rgba(255, 255, 255, 0.95)',
    borderTop: '1px solid rgba(226, 232, 240, 0.5)',
    boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    justifyContent: 'space-around',
    padding: '0.75rem 0',
    backdropFilter: 'blur(20px)'
  },
  tabButton: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    padding: '0.75rem 1rem',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    color: '#64748b',
    border: 'none',
    background: 'none',
    cursor: 'pointer',
    fontSize: '0.75rem',
    fontWeight: '500'
  },
  tabButtonActive: {
    color: '#7c3aed',
    background: 'rgba(124, 58, 237, 0.1)',
    transform: 'translateY(-2px)',
    boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)'
  },
  content: {
    padding: '1.5rem',
    paddingBottom: '6rem',
    maxWidth: '1200px',
    margin: '0 auto'
  },
  taskItem: {
    border: '2px solid #e5e7eb',
    borderRadius: '8px',
    padding: '1rem',
    marginBottom: '1rem',
    transition: 'all 0.3s ease'
  },
  taskItemUrgent: {
    border: '2px solid #ef4444',
    background: '#fef2f2'
  },
  taskHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '0.5rem'
  },

  taskPoints: {
    background: '#fbbf24',
    color: 'white',
    padding: '0.25rem 0.5rem',
    borderRadius: '12px',
    fontSize: '0.75rem',
    fontWeight: '600'
  },
  taskDetails: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: '1rem',
    fontSize: '0.875rem',
    color: '#666',
    marginBottom: '1rem'
  },
  rewardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem'
  },
  rewardCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    border: '1px solid rgba(226, 232, 240, 0.5)',
    borderRadius: '16px',
    padding: '2rem',
    textAlign: 'center' as const,
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)'
  },
  rewardIcon: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  rewardTitle: {
    fontWeight: '600',
    fontSize: '1.125rem',
    marginBottom: '0.5rem'
  },
  rewardPrice: {
    fontSize: '1.75rem',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
    WebkitBackgroundClip: 'text' as const,
    WebkitTextFillColor: 'transparent',
    marginBottom: '1rem'
  },
  pointsGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1.5rem',
    marginBottom: '1.5rem'
  },
  pointsCard: {
    textAlign: 'center' as const,
    padding: '1rem'
  },
  pointsIcon: {
    fontSize: '2rem',
    marginBottom: '0.5rem'
  },
  pointsValue: {
    fontSize: '2rem',
    fontWeight: 'bold',
    marginBottom: '0.5rem'
  },
  pointsLabel: {
    color: '#666',
    fontSize: '0.875rem'
  },
  familyGoal: {
    background: 'linear-gradient(135deg, #7c3aed 0%, #db2777 100%)',
    color: 'white',
    padding: '2rem',
    borderRadius: '20px',
    marginBottom: '1.5rem',
    boxShadow: '0 12px 40px rgba(124, 58, 237, 0.3)',
    position: 'relative' as const,
    overflow: 'hidden'
  },
  animationOverlay: {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none' as const,
    zIndex: 1000
  },
  // Form styles
  formContainer: {
    padding: '1.5rem',
    paddingBottom: '6rem',
    maxWidth: '800px',
    margin: '0 auto'
  },
  formCard: {
    background: 'rgba(255, 255, 255, 0.95)',
    borderRadius: '16px',
    padding: '2rem',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
    marginBottom: '1rem',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.2)'
  },
  formGroup: {
    marginBottom: '1rem'
  },
  label: {
    display: 'block',
    marginBottom: '0.5rem',
    fontWeight: '600',
    color: '#374151'
  },
  input: {
    width: '100%',
    padding: '14px 16px',
    border: '1px solid #cbd5e1',
    borderRadius: '12px',
    fontSize: '0.875rem',
    transition: 'all 0.3s ease',
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)'
  },
  select: {
    width: '100%',
    padding: '14px 16px',
    border: '1px solid #cbd5e1',
    borderRadius: '12px',
    fontSize: '0.875rem',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    backdropFilter: 'blur(10px)'
  },
  textarea: {
    width: '100%',
    padding: '14px 16px',
    border: '1px solid #cbd5e1',
    borderRadius: '12px',
    fontSize: '0.875rem',
    minHeight: '100px',
    resize: 'vertical' as const,
    outline: 'none',
    background: 'rgba(255, 255, 255, 0.8)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease'
  },
  formRow: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center'
  },
  formCol: {
    flex: 1
  },
  buttonSecondary: {
    background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    color: '#475569',
    border: '1px solid #cbd5e1',
    padding: '12px 24px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '0.875rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.05)'
  },
  backButton: {
    background: 'linear-gradient(135deg, #64748b 0%, #475569 100%)',
    color: 'white',
    border: 'none',
    padding: '10px 18px',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '0.875rem',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 12px rgba(100, 116, 139, 0.3)'
  },
  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem'
  },
  sectionHeader: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    color: '#374151',
    margin: 0
  },
  completedTask: {
    opacity: 0.6,
    background: '#f9fafb'
  },
  taskTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    marginBottom: '0.5rem',
    color: '#374151'
  },
  taskMeta: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: '1rem',
    fontSize: '0.875rem'
  },
  textSmall: {
    fontSize: '0.875rem',
    color: '#6b7280'
  },
  textPurple: {
    color: '#8b5cf6',
    fontWeight: '500'
  },
  textYellow: {
    color: '#f59e0b',
    fontWeight: '500'
  },
  textRed: {
    color: '#ef4444',
    fontWeight: '500'
  },
  textGray: {
    color: '#6b7280'
  }
};

const FamilieApp: React.FC = () => {
  // States
  const [currentView, setCurrentView] = useState('dashboard');
  const [currentUser, setCurrentUser] = useState(familyMembers[0]);
  const [tasks, setTasks] = useState(initialTasks);
  const [userPoints, setUserPoints] = useState<Record<number, number>>({ 1: 89, 2: 52, 3: 35, 4: 120, 5: 95 });
  const [communalPoints, setCommunalPoints] = useState(125);
  const [showAnimation, setShowAnimation] = useState(false);
  const [animationPoints, setAnimationPoints] = useState(0);
  const [redeemedRewards, setRedeemedRewards] = useState<Array<{
    id: number;
    rewardId: number;
    rewardTitle: string;
    rewardIcon: string;
    redeemedByUserId: number;
    redeemedByName: string;
    redeemedAt: string;
    pointsSpent: number;
    type: 'individual' | 'family';
  }>>([]);
  const [showDonateModal, setShowDonateModal] = useState(false);
  const [donateAmount, setDonateAmount] = useState(10);
  const [showCommunalModal, setShowCommunalModal] = useState(false);
  const [communalHistory, setCommunalHistory] = useState<Array<{
    id: number;
    type: 'earned' | 'donated' | 'redeemed';
    amount: number;
    description: string;
    userId?: number;
    userName?: string;
    timestamp: string;
  }>>([
    {
      id: 1,
      type: 'donated',
      amount: 25,
      description: 'Josefine donerede point til familien',
      userId: 1,
      userName: 'Josefine',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 2,
      type: 'donated',
      amount: 15,
      description: 'Lilly donerede point til familien',
      userId: 2,
      userName: 'Lilly',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: 3,
      type: 'redeemed',
      amount: -50,
      description: 'Familien købte: Filmaften',
      userId: 4,
      userName: 'Mor',
      timestamp: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString()
    }
  ]);
  const [showAddRewardModal, setShowAddRewardModal] = useState(false);
  const [showEditRewardModal, setShowEditRewardModal] = useState(false);
  const [editingReward, setEditingReward] = useState<Reward | null>(null);
  const [newReward, setNewReward] = useState({
    title: '',
    price: 10,
    type: 'individual' as 'individual' | 'family',
    icon: '🎁'
  });
  const [rewards, setRewards] = useState([
    { id: 1, title: 'Ekstra fredagsslik', price: 20, type: 'individual' as const, icon: '🍬' },
    { id: 2, title: 'Filmaften', price: 35, type: 'individual' as const, icon: '🎬' },
    { id: 3, title: 'Biograftur', price: 150, type: 'family' as const, icon: '🎭' },
    { id: 4, title: 'Zoo-besøg', price: 200, type: 'family' as const, icon: '🦁' }
  ]);

  // Load data from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('familyTasks');
    const savedUserPoints = localStorage.getItem('userPoints');
    const savedCommunalPoints = localStorage.getItem('communalPoints');
    const savedRedeemedRewards = localStorage.getItem('redeemedRewards');
    const savedCommunalHistory = localStorage.getItem('communalHistory');
    const savedRewards = localStorage.getItem('rewards');

    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedUserPoints) setUserPoints(JSON.parse(savedUserPoints));
    if (savedCommunalPoints) setCommunalPoints(JSON.parse(savedCommunalPoints));
    if (savedRedeemedRewards) setRedeemedRewards(JSON.parse(savedRedeemedRewards));
    if (savedCommunalHistory) setCommunalHistory(JSON.parse(savedCommunalHistory));
    if (savedRewards) setRewards(JSON.parse(savedRewards));
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('familyTasks', JSON.stringify(tasks));
    localStorage.setItem('userPoints', JSON.stringify(userPoints));
    localStorage.setItem('communalPoints', JSON.stringify(communalPoints));
    localStorage.setItem('redeemedRewards', JSON.stringify(redeemedRewards));
    localStorage.setItem('communalHistory', JSON.stringify(communalHistory));
    localStorage.setItem('rewards', JSON.stringify(rewards));
  }, [tasks, userPoints, communalPoints, redeemedRewards, communalHistory, rewards]);

  // Countdown timer logic
  const getTimeLeft = (deadline: string | null) => {
    if (!deadline) return { noDeadline: true };
    
    const now = new Date();
    const target = new Date(deadline);
    const diff = target.getTime() - now.getTime();
    
    if (diff <= 0) return { expired: true };
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const urgent = diff < 2 * 60 * 60 * 1000; // Under 2 timer
    
    return { hours, minutes, urgent };
  };

  // Complete task function
  const completeTask = (taskId: number) => {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
      if (task.frequency === 'once' && !task.completed) {
        // One-time task - mark as completed
        setTasks(tasks.map(t => t.id === taskId ? { ...t, completed: true } : t));
        setUserPoints(prev => ({ ...prev, [currentUser.id]: (prev[currentUser.id] || 0) + task.points }));
        
        // Trigger animation
        setAnimationPoints(task.points);
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 1000);
      } else if (task.frequency !== 'once') {
        // Recurring task - give points but don't mark as permanently completed
        setUserPoints(prev => ({ ...prev, [currentUser.id]: (prev[currentUser.id] || 0) + task.points }));
        
        // Trigger animation
        setAnimationPoints(task.points);
        setShowAnimation(true);
        setTimeout(() => setShowAnimation(false), 1000);
        
        // Show success message for recurring task
        alert(`🎉 Godt gået! Du har fået ${task.points} point for at fuldføre "${task.title}"!`);
      }
    }
  };

  // Donate points function
  const donatePoints = () => {
    if (donateAmount > 0 && donateAmount <= (userPoints[currentUser.id] || 0)) {
      setUserPoints(prev => ({ ...prev, [currentUser.id]: prev[currentUser.id] - donateAmount }));
      setCommunalPoints(prev => prev + donateAmount);
      setShowDonateModal(false);
      setDonateAmount(10);
      
      // Track donation in communal history
      const newHistoryEntry = {
        id: Date.now(),
        type: 'donated' as const,
        amount: donateAmount,
        description: `${currentUser.name} donerede point til familien`,
        userId: currentUser.id,
        userName: currentUser.name,
        timestamp: new Date().toISOString()
      };
      setCommunalHistory(prev => [...prev, newHistoryEntry]);
      
      // Show success message
      alert(`🎉 ${currentUser.name} har doneret ${donateAmount} point til familien!`);
    } else {
      alert('Ugyldigt beløb eller ikke nok point!');
    }
  };

  // Buy reward function
  const buyReward = (reward: Reward) => {
    if (reward.type === 'individual') {
      if ((userPoints[currentUser.id] || 0) >= reward.price) {
        setUserPoints(prev => ({ ...prev, [currentUser.id]: prev[currentUser.id] - reward.price }));
        
        // Track redeemed reward
        const newRedeemedReward = {
          id: Date.now(),
          rewardId: reward.id,
          rewardTitle: reward.title,
          rewardIcon: reward.icon,
          redeemedByUserId: currentUser.id,
          redeemedByName: currentUser.name,
          redeemedAt: new Date().toISOString(),
          pointsSpent: reward.price,
          type: 'individual' as const
        };
        setRedeemedRewards(prev => [...prev, newRedeemedReward]);
        
        alert(`🎉 ${currentUser.name} har købt: ${reward.title}!`);
      } else {
        alert('Ikke nok point!');
      }
    } else {
      if (communalPoints >= reward.price) {
        setCommunalPoints(prev => prev - reward.price);
        
        // Track redeemed reward
        const newRedeemedReward = {
          id: Date.now(),
          rewardId: reward.id,
          rewardTitle: reward.title,
          rewardIcon: reward.icon,
          redeemedByUserId: currentUser.id,
          redeemedByName: currentUser.name,
          redeemedAt: new Date().toISOString(),
          pointsSpent: reward.price,
          type: 'family' as const
        };
        setRedeemedRewards(prev => [...prev, newRedeemedReward]);
        
        // Track redemption in communal history
        const newHistoryEntry = {
          id: Date.now() + 1,
          type: 'redeemed' as const,
          amount: -reward.price,
          description: `Familien købte: ${reward.title}`,
          userId: currentUser.id,
          userName: currentUser.name,
          timestamp: new Date().toISOString()
        };
        setCommunalHistory(prev => [...prev, newHistoryEntry]);
        
        alert(`🎉 Familien har købt: ${reward.title}!`);
      } else {
        alert('Ikke nok fælles point!');
      }
    }
  };

  // Add new reward function
  const addReward = () => {
    if (newReward.title.trim() && newReward.price > 0) {
      const newRewardItem = {
        id: Date.now(),
        title: newReward.title.trim(),
        price: newReward.price,
        type: newReward.type,
        icon: newReward.icon
      };
      setRewards(prev => [...prev, newRewardItem]);
      setNewReward({ title: '', price: 10, type: 'individual', icon: '🎁' });
      setShowAddRewardModal(false);
      alert(`🎉 Ny belønning tilføjet: ${newRewardItem.title}!`);
    } else {
      alert('Udfyld venligst alle felter korrekt!');
    }
  };

  // Edit reward function
  const editReward = () => {
    if (editingReward && editingReward.title.trim() && editingReward.price > 0) {
      setRewards(prev => prev.map(reward => 
        reward.id === editingReward.id ? editingReward : reward
      ));
      setEditingReward(null);
      setShowEditRewardModal(false);
      alert(`🎉 Belønning opdateret: ${editingReward.title}!`);
    } else {
      alert('Udfyld venligst alle felter korrekt!');
    }
  };

  // Delete reward function
  const deleteReward = (rewardId: number) => {
    if (window.confirm('Er du sikker på, at du vil slette denne belønning?')) {
      setRewards(prev => prev.filter(reward => reward.id !== rewardId));
      alert('Belønning slettet!');
    }
  };

  // Navigation component
  const Navigation = () => (
    <nav style={styles.navigation}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Home size={24} />
        <span style={{ fontWeight: 'bold', fontSize: '1.125rem' }}>Familie Pligter</span>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <select 
          style={styles.userSelect}
          value={currentUser.id}
          onChange={(e) => setCurrentUser(familyMembers.find(m => m.id === parseInt(e.target.value))!)}
        >
          {familyMembers.map(member => (
            <option key={member.id} value={member.id} style={{color: '#333'}}>
              {member.avatar} {member.name}
            </option>
          ))}
        </select>
        
        <div style={styles.pointsBadge}>
          <Star size={16} color="#fbbf24" />
          <span>{userPoints[currentUser.id] || 0}</span>
        </div>
      </div>
    </nav>
  );

  // Bottom tabs component
  const BottomTabs = () => (
    <div style={styles.bottomTabs}>
      <button 
        style={{...styles.tabButton, ...(currentView === 'dashboard' ? styles.tabButtonActive : {})}}
        onClick={() => setCurrentView('dashboard')}
      >
        <Home size={20} />
        <span>Dashboard</span>
      </button>
      <button 
        style={{...styles.tabButton, ...(currentView === 'tasks' ? styles.tabButtonActive : {})}}
        onClick={() => setCurrentView('tasks')}
      >
        <CheckCircle size={20} />
        <span>Opgaver</span>
      </button>
      <button 
        style={{...styles.tabButton, ...(currentView === 'rewards' ? styles.tabButtonActive : {})}}
        onClick={() => setCurrentView('rewards')}
      >
        <Gift size={20} />
        <span>Belønninger</span>
      </button>
      <button 
        style={{...styles.tabButton, ...(currentView === 'family' ? styles.tabButtonActive : {})}}
        onClick={() => setCurrentView('family')}
      >
        <Users size={20} />
        <span>Familie</span>
      </button>
    </div>
  );

  // Dashboard component
  const Dashboard = () => (
    <div style={styles.content}>
      <div style={styles.familyGoal}>
        <div style={{ position: 'absolute', top: '-20px', right: '-20px', fontSize: '4rem', opacity: 0.1 }}>🎭</div>
        <h2 style={{ marginBottom: '0.75rem', fontSize: '1.5rem', fontWeight: '700' }}>Familien Mål: Biograftur</h2>
        <div style={styles.progressBar}>
          <div style={{...styles.progressFill, width: `${Math.min((communalPoints / 500) * 100, 100)}%`}} />
        </div>
        <p style={{ fontSize: '1.125rem', fontWeight: '600', marginTop: '0.5rem' }}>{communalPoints} / 500 point</p>
      </div>

      <div style={styles.pointsGrid}>
        <div style={{...styles.card, padding: '1.5rem', textAlign: 'center' as const}}>
          <div style={{...styles.pointsIcon, fontSize: '2.5rem', marginBottom: '0.75rem'}}>⭐</div>
          <div style={{...styles.pointsValue, fontSize: '2.5rem', color: '#7c3aed'}}>{userPoints[currentUser.id] || 0}</div>
          <div style={{...styles.pointsLabel, fontSize: '1rem', fontWeight: '600'}}>Mine Point</div>
          {currentUser.role === 'child' && (userPoints[currentUser.id] || 0) > 0 && (
            <button 
              onClick={() => setShowDonateModal(true)}
              style={{
                ...styles.buttonSecondary,
                marginTop: '1rem',
                fontSize: '0.75rem',
                padding: '0.5rem 1rem'
              }}
            >
              💝 Doner Point
            </button>
          )}
        </div>
        <div style={{...styles.card, padding: '1.5rem', textAlign: 'center' as const}}>
          <div style={{...styles.pointsIcon, fontSize: '2.5rem', marginBottom: '0.75rem'}}>👨‍👩‍👧‍👦</div>
          <div style={{...styles.pointsValue, fontSize: '2.5rem', color: '#db2777'}}>{communalPoints}</div>
          <div style={{...styles.pointsLabel, fontSize: '1rem', fontWeight: '600'}}>Fælles Point</div>
          <button 
            onClick={() => setShowCommunalModal(true)}
            style={{
              ...styles.buttonSecondary,
              marginTop: '1rem',
              fontSize: '0.75rem',
              padding: '0.5rem 1rem'
            }}
          >
            📊 Se Detaljer
          </button>
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={{ marginBottom: '1rem' }}>Mine Opgaver</h3>
        {tasks.filter(task => task.assignedTo === currentUser.id && (task.frequency !== 'once' || !task.completed)).map(task => (
          <div key={task.id} style={styles.taskItem}>
            <div style={styles.taskHeader}>
              <span style={styles.taskTitle}>{task.title}</span>
              <span style={styles.taskPoints}>+{task.points}</span>
            </div>
            <div style={styles.taskDetails}>
              <div style={{ color: task.frequency === 'once' ? '#666' : '#8b5cf6' }}>
                📅 {task.frequency === 'once' ? 'Engangs' : 
                    task.frequency === 'daily' ? 'Daglig' :
                    task.frequency === 'weekly' ? 'Ugentlig' :
                    task.frequency === 'biweekly' ? 'Hver 14. dag' :
                    'Månedlig'}
                {task.frequency !== 'once' && ' 🔄'}
              </div>
              {task.deadline ? (
                <>
                  <div>📅 Deadline: {new Date(task.deadline).toLocaleDateString('da-DK')}</div>
                  <div>⏰ {new Date(task.deadline).toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' })}</div>
                </>
              ) : (
                <div>📅 Ingen deadline</div>
              )}
            </div>
            <button 
              style={styles.buttonSuccess}
              onClick={() => completeTask(task.id)}
              disabled={task.frequency === 'once' && task.completed}
            >
              {task.frequency === 'once' && task.completed ? 'Færdig!' : 'Fuldfør Opgave'}
            </button>
          </div>
        ))}
        {tasks.filter(task => task.assignedTo === currentUser.id && (task.frequency !== 'once' || !task.completed)).length === 0 && (
          <p style={{ color: '#666', textAlign: 'center' }}>Ingen opgaver tildelt endnu! 🎉</p>
        )}
      </div>

      {/* Indløste Belønninger Section */}
      <div style={styles.card}>
        <h3 style={{ marginBottom: '1rem' }}>🎁 Indløste Belønninger</h3>
        {redeemedRewards.length === 0 ? (
          <p style={{ color: '#666', textAlign: 'center' }}>Ingen belønninger indløst endnu</p>
        ) : (
          <div style={{ maxHeight: '300px', overflowY: 'auto' as const }}>
            {redeemedRewards
              .sort((a, b) => new Date(b.redeemedAt).getTime() - new Date(a.redeemedAt).getTime())
              .slice(0, 10) // Show only last 10
              .map(redeemed => (
                <div key={redeemed.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.75rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  marginBottom: '0.5rem',
                  background: redeemed.type === 'family' ? '#f0f9ff' : '#fef3c7'
                }}>
                  <div style={{ fontSize: '1.5rem' }}>{redeemed.rewardIcon}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>
                      {redeemed.rewardTitle}
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#666' }}>
                      Indløst af {redeemed.redeemedByName} • {redeemed.pointsSpent} point
                    </div>
                    <div style={{ fontSize: '0.75rem', color: '#666' }}>
                      {new Date(redeemed.redeemedAt).toLocaleDateString('da-DK')} {new Date(redeemed.redeemedAt).toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                  <div style={{
                    fontSize: '0.75rem',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '12px',
                    background: redeemed.type === 'family' ? '#3b82f6' : '#f59e0b',
                    color: 'white',
                    fontWeight: '600'
                  }}>
                    {redeemed.type === 'family' ? 'Familie' : 'Individuel'}
                  </div>
                </div>
              ))}
          </div>
        )}
        {redeemedRewards.length > 10 && (
          <p style={{ fontSize: '0.875rem', color: '#666', textAlign: 'center', marginTop: '0.5rem' }}>
            Viser de seneste 10 belønninger
          </p>
        )}
      </div>
    </div>
  );

  // Tasks view component
  const TasksView = () => (
    <div style={styles.content}>
      <div style={styles.flexBetween}>
        <h1 style={styles.sectionHeader}>Alle Opgaver</h1>
        {currentUser.role === 'parent' && (
          <button 
            onClick={() => setCurrentView('create-task')}
            style={styles.buttonPrimary}
            className="hover-lift"
          >
            <Plus size={20} style={{marginRight: '0.5rem'}} />
            Opret Opgave
          </button>
        )}
      </div>

      {tasks.length === 0 ? (
        <div style={styles.card}>
          <div style={{textAlign: 'center' as const, padding: '2rem'}}>
            <p style={{color: '#6b7280', fontSize: '1.125rem'}}>
              Ingen opgaver endnu
            </p>
            {currentUser.role === 'parent' && (
              <button 
                onClick={() => setCurrentView('create-task')}
                style={{...styles.buttonPrimary, marginTop: '1rem'}}
              >
                Opret den første opgave
              </button>
            )}
          </div>
        </div>
      ) : (
        <div>
          {tasks.map(task => {
            const timeLeft = getTimeLeft(task.deadline);
            const assignedUser = familyMembers.find(m => m.id === task.assignedTo);
            
            return (
              <div key={task.id} style={{
                ...styles.card,
                ...(task.completed ? styles.completedTask : {})
              }}>
                <div style={styles.flexBetween}>
                  <div style={{flex: 1}}>
                    <h3 style={styles.taskTitle}>{task.title}</h3>
                    {task.description && (
                      <p style={{...styles.textSmall, marginBottom: '0.5rem'}}>
                        {task.description}
                      </p>
                    )}
                    <div style={styles.taskMeta}>
                      <span style={styles.textPurple}>
                        {assignedUser?.avatar} {assignedUser?.name}
                      </span>
                      <span style={styles.textYellow}>⭐ {task.points} point</span>
                      <span style={task.frequency === 'once' ? styles.textGray : styles.textPurple}>
                        📅 {task.frequency === 'once' ? 'Engangs' : 
                            task.frequency === 'daily' ? 'Daglig' :
                            task.frequency === 'weekly' ? 'Ugentlig' :
                            task.frequency === 'biweekly' ? 'Hver 14. dag' :
                            'Månedlig'}
                        {task.frequency !== 'once' && ' 🔄'}
                      </span>
                      {task.deadline && !task.completed && !timeLeft.expired && (
                        <span style={timeLeft.urgent ? styles.textRed : styles.textGray}>
                          ⏰ {timeLeft.hours}t {timeLeft.minutes}m
                        </span>
                      )}
                      {task.deadline && timeLeft.expired && !task.completed && (
                        <span style={styles.textRed}>
                          ⚠️ Forfalden!
                        </span>
                      )}
                      {!task.deadline && (
                        <span style={styles.textGray}>
                          📅 Ingen deadline
                        </span>
                      )}
                    </div>
                  </div>
                  {currentUser.role === 'child' && task.assignedTo === currentUser.id && (
                    <button 
                      onClick={() => completeTask(task.id)}
                      style={styles.buttonSuccess}
                      className="hover-lift"
                      disabled={task.frequency === 'once' && task.completed}
                    >
                      {task.frequency === 'once' && task.completed ? 'Færdig!' : 'Gør Færdig'}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  // Rewards view component
  const RewardsView = () => (
    <div style={styles.content}>
      <div style={styles.flexBetween}>
        <h1 style={styles.sectionHeader}>🎁 Belønnings Shop</h1>
        {currentUser.role === 'parent' && (
          <button 
            onClick={() => setShowAddRewardModal(true)}
            style={styles.buttonPrimary}
            className="hover-lift"
          >
            <Plus size={20} style={{marginRight: '0.5rem'}} />
            Tilføj Belønning
          </button>
        )}
      </div>

      <div style={styles.card}>
        <div style={styles.rewardGrid}>
          {rewards.map(reward => (
            <div 
              key={reward.id} 
              style={styles.rewardCard}
              className="hover-lift card-hover"
            >
              <div style={styles.rewardIcon}>{reward.icon}</div>
              <div style={styles.rewardTitle}>{reward.title}</div>
              <div style={styles.rewardPrice}>{reward.price} point</div>
              <div style={{ fontSize: '0.875rem', color: '#666', marginBottom: '1rem' }}>
                {reward.type === 'individual' ? 'Individuel' : 'Fælles'}
              </div>
              
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                <button 
                  onClick={() => buyReward(reward)}
                  style={styles.buttonSuccess}
                  className="hover-lift"
                >
                  Køb
                </button>
                
                {currentUser.role === 'parent' && (
                  <>
                    <button 
                      onClick={() => {
                        setEditingReward(reward);
                        setShowEditRewardModal(true);
                      }}
                      style={{
                        ...styles.buttonSecondary,
                        fontSize: '0.75rem',
                        padding: '0.5rem 0.75rem'
                      }}
                    >
                      ✏️
                    </button>
                    <button 
                      onClick={() => deleteReward(reward.id)}
                      style={{
                        background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)',
                        color: 'white',
                        border: 'none',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 4px 12px rgba(239, 68, 68, 0.3)'
                      }}
                    >
                      🗑️
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Create task view component
  const CreateTaskView = () => {
    const [formData, setFormData] = useState({
      title: '',
      description: '',
      points: 10,
      assignedTo: '',
      deadline: '',
      category: '5-9',
      frequency: 'once',
      weekday: 'monday'
    });

    const handleInputChange = (field: string, value: string | number) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      
      const newTask = {
        id: Date.now(),
        title: formData.title,
        description: formData.description,
        points: parseInt(formData.points.toString()),
        assignedTo: parseInt(formData.assignedTo),
        deadline: formData.deadline || null,
        category: formData.category,
        frequency: formData.frequency,
        weekday: formData.weekday,
        completed: false,
        createdBy: currentUser.id
      };

      setTasks(prev => [...prev, newTask]);
      setCurrentView('tasks');
      
      // Reset form
      setFormData({
        title: '',
        description: '',
        points: 10,
        assignedTo: '',
        deadline: '',
        category: '5-9',
        frequency: 'once',
        weekday: 'monday'
      });
    };

    // Kun tilgængelig for forældre
    if (currentUser.role !== 'parent') {
      return (
        <div style={styles.formContainer}>
          <div style={styles.formCard}>
            <h2>Adgang Nægtet</h2>
            <p>Kun forældre kan oprette opgaver.</p>
            <button onClick={() => setCurrentView('tasks')} style={styles.backButton}>
              Tilbage til opgaver
            </button>
          </div>
        </div>
      );
    }

    return (
      <div style={styles.formContainer}>
        <div style={styles.flexBetween}>
          <h1 style={styles.sectionHeader}>➕ Opret Opgave</h1>
          <button 
            onClick={() => setCurrentView('tasks')} 
            style={styles.backButton}
          >
            ← Tilbage
          </button>
        </div>

        <form onSubmit={handleSubmit} style={styles.formCard}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Opgave Titel *</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              style={styles.input}
              placeholder="F.eks. Ryd op på værelset"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Beskrivelse (valgfri)</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              style={styles.textarea}
              placeholder="Uddybende beskrivelse af opgaven..."
            />
          </div>

          <div style={styles.formRow}>
            <div style={styles.formCol}>
              <label style={styles.label}>Point Værdi *</label>
              <input
                type="number"
                value={formData.points}
                onChange={(e) => handleInputChange('points', e.target.value)}
                style={styles.input}
                min="1"
                max="100"
                required
              />
            </div>
            <div style={styles.formCol}>
              <label style={styles.label}>Alderskategori *</label>
              <select
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                style={styles.select}
              >
                <option value="5-9">5-9 år</option>
                <option value="10-13">10-13 år</option>
                <option value="14+">14+ år</option>
              </select>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Tildel til *</label>
            <select
              value={formData.assignedTo}
              onChange={(e) => handleInputChange('assignedTo', e.target.value)}
              style={styles.select}
              required
            >
              <option value="">Vælg familiemedlem</option>
              {familyMembers.filter(m => m.role === 'child').map(child => (
                <option key={child.id} value={child.id}>
                  {child.avatar} {child.name} ({child.age} år)
                </option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Deadline (valgfri)</label>
            <input
              type="datetime-local"
              value={formData.deadline}
              onChange={(e) => handleInputChange('deadline', e.target.value)}
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Opgave Type *</label>
            <select
              value={formData.frequency}
              onChange={(e) => handleInputChange('frequency', e.target.value)}
              style={styles.select}
            >
              <option value="once">Engangsopgave</option>
              <option value="daily">Daglig</option>
              <option value="weekly">Ugentlig</option>
              <option value="biweekly">Hver 14. dag</option>
              <option value="monthly">Månedlig</option>
            </select>
          </div>

          {formData.frequency === 'weekly' && (
            <div style={styles.formGroup}>
              <label style={styles.label}>Ugedag *</label>
              <select
                value={formData.weekday}
                onChange={(e) => handleInputChange('weekday', e.target.value)}
                style={styles.select}
              >
                <option value="monday">Mandag</option>
                <option value="tuesday">Tirsdag</option>
                <option value="wednesday">Onsdag</option>
                <option value="thursday">Torsdag</option>
                <option value="friday">Fredag</option>
                <option value="saturday">Lørdag</option>
                <option value="sunday">Søndag</option>
              </select>
            </div>
          )}

          <div style={styles.formRow}>
            <button 
              type="button" 
              onClick={() => setCurrentView('tasks')}
              style={styles.buttonSecondary}
            >
              Annuller
            </button>
            <button 
              type="submit" 
              style={styles.buttonPrimary}
              disabled={!formData.title || !formData.assignedTo}
            >
              Opret Opgave
            </button>
          </div>
        </form>
      </div>
    );
  };

  // Family view component
  const FamilyView = () => (
    <div style={styles.content}>
      <div style={styles.card}>
        <h2 style={{ marginBottom: '1rem' }}>Familie Oversigt</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          {familyMembers.map(member => (
            <div key={member.id} style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1rem',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              background: member.id === currentUser.id ? '#f3f4f6' : 'white'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '1.5rem' }}>{member.avatar}</span>
                <div>
                  <div style={{ fontWeight: '600' }}>{member.name}</div>
                  <div style={{ fontSize: '0.875rem', color: '#666' }}>
                    {member.role === 'child' ? 'Barn' : 'Forælder'} • {member.age} år
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Star size={16} color="#fbbf24" />
                <span style={{ fontWeight: '600' }}>{userPoints[member.id] || 0}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={styles.card}>
        <h3 style={{ marginBottom: '1rem' }}>Fælles Mål Progress</h3>
        <div style={styles.progressBar}>
          <div style={{...styles.progressFill, width: `${Math.min((communalPoints / 500) * 100, 100)}%`}} />
        </div>
        <p style={{ textAlign: 'center', marginTop: '0.5rem' }}>
          {communalPoints} / 500 point til Biograftur 🎭
        </p>
      </div>
    </div>
  );

  // Animation overlay component
  const AnimationOverlay = () => (
    <div style={styles.animationOverlay}>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: '4rem',
          animation: 'bounce 1s infinite'
        }}>🎉</div>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#eab308',
          animation: 'pulse 1s infinite'
        }}>
          +{animationPoints} point!
        </div>
      </div>
    </div>
  );

  // Donate modal component
  const DonateModal = () => (
    <div style={{
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '2rem',
        maxWidth: '400px',
        width: '90%',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)'
      }}>
        <h2 style={{ 
          marginBottom: '1rem', 
          textAlign: 'center' as const,
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#374151'
        }}>
          💝 Doner Point til Familien
        </h2>
        
        <p style={{ 
          marginBottom: '1.5rem', 
          textAlign: 'center' as const,
          color: '#6b7280',
          fontSize: '0.875rem'
        }}>
          Hjælp familien med at nå målet om Biograftur ved at donere dine point til fælles puljen.
        </p>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#374151'
          }}>
            Antal point at donere:
          </label>
          <input
            type="number"
            value={donateAmount}
            onChange={(e) => setDonateAmount(parseInt(e.target.value) || 0)}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #cbd5e1',
              borderRadius: '12px',
              fontSize: '1rem',
              textAlign: 'center' as const,
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)'
            }}
            min="1"
            max={userPoints[currentUser.id] || 0}
          />
          <p style={{ 
            fontSize: '0.75rem', 
            color: '#6b7280', 
            marginTop: '0.5rem',
            textAlign: 'center' as const
          }}>
            Du har {userPoints[currentUser.id] || 0} point at donere
          </p>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={() => setShowDonateModal(false)}
            style={{
              ...styles.buttonSecondary,
              flex: 1
            }}
          >
            Annuller
          </button>
          <button 
            onClick={donatePoints}
            style={{
              ...styles.buttonPrimary,
              flex: 1
            }}
            disabled={donateAmount <= 0 || donateAmount > (userPoints[currentUser.id] || 0)}
          >
            Doner {donateAmount} Point
          </button>
        </div>
      </div>
    </div>
  );

  // Communal modal component
  const CommunalModal = () => {
    const familyRewards = rewards.filter(reward => reward.type === 'family');
    const familyRedeemedRewards = redeemedRewards.filter(reward => reward.type === 'family');
    
    return (
      <div style={{
        position: 'fixed' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        backdropFilter: 'blur(5px)'
      }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '20px',
          padding: '2rem',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '80vh',
          overflowY: 'auto' as const,
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ 
              fontSize: '1.5rem',
              fontWeight: '700',
              color: '#374151'
            }}>
              👨‍👩‍👧‍👦 Fælles Point Oversigt
            </h2>
            <button 
              onClick={() => setShowCommunalModal(false)}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.5rem',
                cursor: 'pointer',
                color: '#6b7280'
              }}
            >
              ✕
            </button>
          </div>

          {/* Current Balance */}
          <div style={{
            background: 'linear-gradient(135deg, #db2777 0%, #be185d 100%)',
            color: 'white',
            padding: '1.5rem',
            borderRadius: '16px',
            textAlign: 'center' as const,
            marginBottom: '1.5rem'
          }}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>💰</div>
            <div style={{ fontSize: '2rem', fontWeight: '700' }}>{communalPoints} point</div>
            <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Tilgængelige fælles point</div>
          </div>

          {/* Family Rewards Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>🎁 Familie Belønninger</h3>
            <div style={{ display: 'grid', gap: '1rem' }}>
              {familyRewards.map(reward => (
                <div key={reward.id} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '1rem',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  background: 'rgba(255, 255, 255, 0.8)'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ fontSize: '1.5rem' }}>{reward.icon}</div>
                    <div>
                      <div style={{ fontWeight: '600' }}>{reward.title}</div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{reward.price} point</div>
                    </div>
                  </div>
                  <button 
                    onClick={() => buyReward(reward)}
                    style={{
                      ...styles.buttonPrimary,
                      fontSize: '0.75rem',
                      padding: '0.5rem 1rem'
                    }}
                    disabled={communalPoints < reward.price}
                  >
                    Køb
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* History Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>📊 Point Historie</h3>
            <div style={{ maxHeight: '300px', overflowY: 'auto' as const }}>
              {communalHistory.length === 0 ? (
                <p style={{ color: '#6b7280', textAlign: 'center' }}>Ingen aktivitet endnu</p>
              ) : (
                communalHistory
                  .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                  .map(entry => (
                    <div key={entry.id} style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      marginBottom: '0.5rem',
                      background: entry.type === 'donated' ? '#f0f9ff' : 
                                entry.type === 'redeemed' ? '#fef2f2' : '#f0fdf4'
                    }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>
                          {entry.description}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          {new Date(entry.timestamp).toLocaleDateString('da-DK')} {new Date(entry.timestamp).toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                      <div style={{
                        fontSize: '0.875rem',
                        fontWeight: '600',
                        color: entry.amount > 0 ? '#059669' : '#dc2626'
                      }}>
                        {entry.amount > 0 ? '+' : ''}{entry.amount} point
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>

          {/* Redeemed Rewards Section */}
          <div>
            <h3 style={{ marginBottom: '1rem', fontSize: '1.125rem', fontWeight: '600' }}>🎁 Indløste Familie Belønninger</h3>
            <div style={{ maxHeight: '200px', overflowY: 'auto' as const }}>
              {familyRedeemedRewards.length === 0 ? (
                <p style={{ color: '#6b7280', textAlign: 'center' }}>Ingen belønninger indløst endnu</p>
              ) : (
                familyRedeemedRewards
                  .sort((a, b) => new Date(b.redeemedAt).getTime() - new Date(a.redeemedAt).getTime())
                  .map(redeemed => (
                    <div key={redeemed.id} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.75rem',
                      border: '1px solid #e5e7eb',
                      borderRadius: '8px',
                      marginBottom: '0.5rem',
                      background: '#f0f9ff'
                    }}>
                      <div style={{ fontSize: '1.25rem' }}>{redeemed.rewardIcon}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: '600', fontSize: '0.875rem' }}>
                          {redeemed.rewardTitle}
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          Indløst af {redeemed.redeemedByName} • {redeemed.pointsSpent} point
                        </div>
                        <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>
                          {new Date(redeemed.redeemedAt).toLocaleDateString('da-DK')} {new Date(redeemed.redeemedAt).toLocaleTimeString('da-DK', { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Edit Reward Modal
  const EditRewardModal = () => (
    <div style={{
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '2rem',
        maxWidth: '400px',
        width: '90%',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)'
      }}>
        <h2 style={{ 
          marginBottom: '1rem', 
          textAlign: 'center' as const,
          fontSize: '1.5rem',
          fontWeight: '700',
          color: '#374151'
        }}>
          ✏️ Rediger Belønning
        </h2>
        
        <form onSubmit={(e) => {
          e.preventDefault();
          editReward();
          setShowEditRewardModal(false);
        }} style={styles.formCard}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Belønning Titel *</label>
            <input
              type="text"
              value={editingReward?.title || ''}
              onChange={(e) => setEditingReward(prev => prev ? { ...prev, title: e.target.value } : null)}
              style={styles.input}
              placeholder="F.eks. Filmaften"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Pris *</label>
            <input
              type="number"
              value={editingReward?.price || ''}
              onChange={(e) => setEditingReward(prev => prev ? { ...prev, price: parseInt(e.target.value) || 0 } : null)}
              style={styles.input}
              min="1"
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Type *</label>
            <select
              value={editingReward?.type || ''}
              onChange={(e) => setEditingReward(prev => prev ? { ...prev, type: e.target.value as 'individual' | 'family' } : null)}
              style={styles.select}
              required
            >
              <option value="individual">Individuel</option>
              <option value="family">Fælles</option>
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Ikon *</label>
            <input
              type="text"
              value={editingReward?.icon || ''}
              onChange={(e) => setEditingReward(prev => prev ? { ...prev, icon: e.target.value } : null)}
              style={styles.input}
              placeholder="F.eks. 🎬"
              required
            />
          </div>

          <div style={styles.formRow}>
            <button 
              type="button" 
              onClick={() => setShowEditRewardModal(false)}
              style={styles.buttonSecondary}
            >
              Annuller
            </button>
            <button 
              type="submit" 
              style={styles.buttonPrimary}
              disabled={!editingReward?.title || !editingReward?.price || !editingReward?.icon}
            >
              Opdater Belønning
            </button>
          </div>
        </form>
      </div>
    </div>
  );

  // Add Reward Modal
  const AddRewardModal = () => (
    <div style={{
      position: 'fixed' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(5px)'
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '20px',
        padding: '2rem',
        maxWidth: '500px',
        width: '90%',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h2 style={{ 
            fontSize: '1.5rem',
            fontWeight: '700',
            color: '#374151'
          }}>
            🎁 Tilføj Ny Belønning
          </h2>
          <button 
            onClick={() => setShowAddRewardModal(false)}
            style={{
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: '#6b7280'
            }}
          >
            ✕
          </button>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#374151'
          }}>
            Belønning Titel:
          </label>
          <input
            type="text"
            value={newReward.title}
            onChange={(e) => setNewReward(prev => ({ ...prev, title: e.target.value }))}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #cbd5e1',
              borderRadius: '12px',
              fontSize: '1rem',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)'
            }}
            placeholder="F.eks. Ekstra fredagsslik"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#374151'
          }}>
            Emoji/Ikon:
          </label>
          <input
            type="text"
            value={newReward.icon}
            onChange={(e) => setNewReward(prev => ({ ...prev, icon: e.target.value }))}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #cbd5e1',
              borderRadius: '12px',
              fontSize: '1rem',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)'
            }}
            placeholder="🎁"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#374151'
          }}>
            Point Pris:
          </label>
          <input
            type="number"
            value={newReward.price}
            onChange={(e) => setNewReward(prev => ({ ...prev, price: parseInt(e.target.value) || 0 }))}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #cbd5e1',
              borderRadius: '12px',
              fontSize: '1rem',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)'
            }}
            min="1"
            max="1000"
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{
            display: 'block',
            marginBottom: '0.5rem',
            fontWeight: '600',
            color: '#374151'
          }}>
            Type:
          </label>
          <select
            value={newReward.type}
            onChange={(e) => setNewReward(prev => ({ ...prev, type: e.target.value as 'individual' | 'family' }))}
            style={{
              width: '100%',
              padding: '12px 16px',
              border: '1px solid #cbd5e1',
              borderRadius: '12px',
              fontSize: '1rem',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)'
            }}
          >
            <option value="individual">Individuel (købes med egne point)</option>
            <option value="family">Familie (købes med fælles point)</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={() => setShowAddRewardModal(false)}
            style={{
              ...styles.buttonSecondary,
              flex: 1
            }}
          >
            Annuller
          </button>
          <button 
            onClick={addReward}
            style={{
              ...styles.buttonPrimary,
              flex: 1
            }}
            disabled={!newReward.title.trim() || newReward.price <= 0}
          >
            Tilføj Belønning
          </button>
        </div>
      </div>
    </div>
  );

  // Render current view
  const renderView = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'tasks':
        return <TasksView />;
      case 'create-task':
        return <CreateTaskView />;
      case 'rewards':
        return <RewardsView />;
      case 'family':
        return <FamilyView />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div style={styles.app}>
      <Navigation />
      {renderView()}
      <BottomTabs />
      {showAnimation && <AnimationOverlay />}
      {showDonateModal && <DonateModal />}
      {showCommunalModal && <CommunalModal />}
      {showAddRewardModal && <AddRewardModal />}
      {showEditRewardModal && <EditRewardModal />}
    </div>
  );
};

export default FamilieApp;
