import React from 'react';
import { TabType } from '../types/data';
import { colors } from '../utils/colors';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
}

const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="bg-blue-800 text-white p-4">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold">Hilton Dashboard</h1>
      </div>
    </header>
  );
};

export default Header;