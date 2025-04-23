import React from 'react';
import { TabType } from '../types/data';
import { colors } from '../utils/colors';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="flex items-center justify-between px-8 py-5" style={{ borderBottom: '1px solid #E5E7EB' }}>
      <div className="flex items-center">
        <img src="/logo_hilton.svg" alt="Hilton Logo" className="h-20" />
      </div>
      
      <div className="flex-grow flex flex-col items-center">
        <h1 style={{ 
          fontFamily: 'Georgia, serif', 
          fontSize: '36px', 
          color: colors.black,
          fontWeight: 'normal',
          letterSpacing: '0.5px',
          margin: 0,
          lineHeight: '1.2'
        }}>
          Global Insights Dashboard
        </h1>
      </div>
      
      <div className="flex invisible" style={{ width: '140px' }}>
        {/* Empty div for balance - invisible but takes up space */}
      </div>
    </div>
  );
};

export default Header;