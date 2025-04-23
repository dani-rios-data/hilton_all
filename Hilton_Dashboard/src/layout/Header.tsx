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
        <div style={{ 
          border: `1px solid ${colors.hiltonBlue}`, 
          padding: '8px 12px'
        }}>
          <div className="font-bold" style={{ 
            color: colors.hiltonBlue, 
            fontSize: '20px',
            lineHeight: '1',
            letterSpacing: '0.5px'
          }}>
            Hilton
          </div>
          <div style={{ 
            color: colors.hiltonBlue, 
            fontSize: '10px',
            letterSpacing: '1px',
            marginTop: '2px'
          }}>
            FOR THE STAY
          </div>
        </div>
      </div>
      
      <div className="flex flex-col items-center">
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
      
      <div className="flex">
        {/* Empty div for balance */}
      </div>
    </div>
  );
};

export default Header;