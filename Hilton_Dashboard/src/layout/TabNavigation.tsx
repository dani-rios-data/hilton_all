import React from 'react';
import { TabType } from '../types/data';
import { colors } from '../utils/colors';

interface TabNavigationProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview' as TabType, label: 'Overview' },
    { id: 'brandSpend' as TabType, label: 'Brand Spend' },
    { id: 'priceWorth' as TabType, label: 'Price vs Worth' },
    { id: 'awareness' as TabType, label: 'Awareness & Consideration' },
    { id: 'ftsRecall' as TabType, label: 'FTS Association' },
    { id: 'proofOfPoint' as TabType, label: 'Proof of Point' }
  ];

  return (
    <div className="flex border-b border-gray-200" style={{ backgroundColor: colors.hiltonOffWhite }}>
      <div className="flex w-full justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className="px-6 py-3 font-medium"
            style={{ 
              color: activeTab === tab.id ? colors.hiltonBlue : colors.inactiveTab,
              borderBottom: activeTab === tab.id ? `3px solid ${colors.hiltonBlue}` : 'none',
              backgroundColor: activeTab === tab.id ? colors.white : colors.hiltonOffWhite,
              fontSize: '15px',
              margin: '0 2px',
              fontFamily: 'Helvetica, Arial, sans-serif',
              transition: 'color 0.2s ease-in-out, background-color 0.2s ease-in-out, border-bottom 0.2s ease-in-out'
            }}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TabNavigation;