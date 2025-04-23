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
    { id: 'proofOfPoint' as TabType, label: 'Proof of Point' },
    { id: 'priceWorth' as TabType, label: 'Price vs Worth' },
    { id: 'ftsRecall' as TabType, label: 'FTS Association' },
    { id: 'awareness' as TabType, label: 'Awareness & Consideration' }
  ];

  return (
    <div className="flex border-b border-gray-200" style={{ backgroundColor: colors.hiltonOffWhite }}>
      <div className="flex w-full justify-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className="px-6 py-3 font-medium"
            style={{ 
              color: activeTab === tab.id ? colors.hiltonBlue : '#6B7280',
              borderBottom: activeTab === tab.id ? `3px solid ${colors.hiltonBlue}` : 'none',
              backgroundColor: activeTab === tab.id ? colors.white : colors.hiltonOffWhite,
              fontSize: '15px',
              margin: '0 2px'
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