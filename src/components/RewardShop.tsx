import React, { useState } from 'react';
import { Reward, FamilyMember } from '../types';

interface RewardShopProps {
  rewards: Reward[];
  onPurchase: (rewardId: number) => void;
  currentUser: FamilyMember;
  communalPoints: number;
}

const RewardShop: React.FC<RewardShopProps> = ({
  rewards,
  onPurchase,
  currentUser,
  communalPoints
}) => {
  const [purchasing, setPurchasing] = useState<number | null>(null);

  const individualRewards = rewards.filter(reward => reward.type === 'individual');
  const familyRewards = rewards.filter(reward => reward.type === 'family');

  const handlePurchase = async (rewardId: number) => {
    setPurchasing(rewardId);
    onPurchase(rewardId);
    
    // Simulate purchase animation
    setTimeout(() => {
      setPurchasing(null);
    }, 1000);
  };

  const canAfford = (reward: Reward) => {
    if (reward.type === 'individual') {
      return currentUser.points >= reward.price;
    } else {
      return communalPoints >= reward.price;
    }
  };



  const RewardCard: React.FC<{ reward: Reward }> = ({ reward }) => {
    const affordable = canAfford(reward);
    const isPurchasing = purchasing === reward.id;

    return (
      <div className={`bg-white rounded-xl shadow-lg p-6 border-2 transition-all duration-300 ${
        affordable 
          ? 'border-green-200 hover:border-green-300 hover:shadow-xl' 
          : 'border-gray-200 opacity-60'
      }`}>
        <div className="text-center">
          {/* Icon */}
          <div className="text-4xl mb-3">
            {reward.icon || '🎁'}
          </div>
          
          {/* Title */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {reward.title}
          </h3>
          
          {/* Price */}
          <div className="flex items-center justify-center space-x-2 mb-4">
            <span className="text-2xl font-bold text-purple-600">
              {reward.price}
            </span>
            <span className="text-gray-600">point</span>
          </div>
          
          {/* Type Badge */}
          <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 ${
            reward.type === 'individual' 
              ? 'bg-blue-100 text-blue-800' 
              : 'bg-green-100 text-green-800'
          }`}>
            <span className="mr-1">
              {reward.type === 'individual' ? '👤' : '🏠'}
            </span>
            {reward.type === 'individual' ? 'Individuel' : 'Fælles'}
          </div>
          
          {/* Available Points */}
          <div className="text-sm text-gray-600 mb-4">
            {reward.type === 'individual' 
              ? `Du har: ${currentUser.points} point`
              : `Fælles: ${communalPoints} point`
            }
          </div>
          
          {/* Purchase Button */}
          <button
            onClick={() => handlePurchase(reward.id)}
            disabled={!affordable || isPurchasing}
            className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-200 transform ${
              affordable && !isPurchasing
                ? 'bg-green-500 hover:bg-green-600 text-white hover:scale-105 shadow-lg'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            {isPurchasing ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Køber...
              </div>
            ) : affordable ? (
              'Køb Nu!'
            ) : (
              'Ikke nok point'
            )}
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl p-6 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">🎁 Belønnings Shop</h2>
        <p className="text-purple-100">
          Brug dine point på fantastiske belønninger!
        </p>
      </div>

      {/* Individual Rewards */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">👤</span>
          Individuelle Belønninger
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {individualRewards.map(reward => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </div>
      </div>

      {/* Family Rewards */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
          <span className="mr-2">🏠</span>
          Fælles Belønninger
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {familyRewards.map(reward => (
            <RewardCard key={reward.id} reward={reward} />
          ))}
        </div>
      </div>

      {/* Info Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h4 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
          <span className="mr-2">ℹ️</span>
          Sådan fungerer det
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
          <div>
            <h5 className="font-semibold mb-1">👤 Individuelle Belønninger</h5>
            <p>Brug dine egne point på personlige belønninger som slik, film eller legetøj.</p>
          </div>
          <div>
            <h5 className="font-semibold mb-1">🏠 Fælles Belønninger</h5>
            <p>Brug familiens fælles point på aktiviteter som zoo-ture, biograf eller andre familieudflugter.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardShop; 