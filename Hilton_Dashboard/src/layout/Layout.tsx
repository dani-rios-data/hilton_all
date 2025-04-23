import React from 'react'
import Header from './Header'
import { TabType } from '../types/data'

interface LayoutProps {
  children: React.ReactNode
  setActivePage: (page: string) => void
  activePage: string
}

const Layout: React.FC<LayoutProps> = ({ children, setActivePage, activePage }) => {
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'awareness', label: 'Awareness & Consideration' },
    { id: 'brandspend', label: 'Brand Spend' },
    { id: 'fts', label: 'FTS Recall' },
    { id: 'priceworth', label: 'Price Worth' },
    { id: 'proof', label: 'Proof of Point' }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Header 
        activeTab={activePage as TabType} 
        setActiveTab={(tab) => setActivePage(tab)}
      />
      
      <nav className="bg-blue-700 text-white">
        <div className="container mx-auto px-4">
          <ul className="flex space-x-4 overflow-x-auto py-2">
            {navItems.map(item => (
              <li key={item.id}>
                <button 
                  onClick={() => setActivePage(item.id)}
                  className={`py-2 px-4 rounded-md transition-colors ${
                    activePage === item.id 
                      ? 'bg-white text-blue-800' 
                      : 'hover:bg-blue-600'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      
      <main className="flex-1 container mx-auto p-6">
        {children}
      </main>
      
      <footer className="bg-gray-100 p-4 border-t">
        <div className="container mx-auto text-center text-gray-600">
          <p>Hilton Dashboard &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout 