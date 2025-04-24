import React from 'react'
import { colors } from '../utils/colors'

interface LayoutProps {
  children: React.ReactNode
  setActivePage: (page: string) => void
  activePage: string
}

const Layout: React.FC<LayoutProps> = ({ children, setActivePage, activePage }) => {
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'brandspend', label: 'Brand Spend' },
    { id: 'proof', label: 'Proof of Point' },
    { id: 'priceworth', label: 'Price vs Worth' },
    { id: 'fts', label: 'FTS Association' },
    { id: 'awareness', label: 'Awareness & Consideration' }
  ]

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="fixed top-0 left-0 right-0 z-50 bg-white flex items-center justify-between px-8 py-5 border-b border-border-color shadow-sm">
        <div className="flex items-center border border-hilton-blue p-2">
          <img src="/logo_hilton.svg" alt="Hilton Logo" className="h-8" />
        </div>
        
        <div className="flex items-center justify-center flex-1">
          <h1 className="dashboard-title text-2xl">
            Global Insights Dashboard
          </h1>
        </div>
        
        <div style={{ width: '120px' }}></div>
      </div>
      
      <nav className="fixed top-[82px] left-0 right-0 z-40 shadow-sm" style={{ backgroundColor: colors.hiltonOffWhite }}>
        <div className="container mx-auto">
          <div className="flex justify-center">
            {navItems.map(item => (
              <button 
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`nav-tab ${
                  activePage === item.id 
                    ? 'nav-tab-active' 
                    : 'nav-tab-inactive'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </nav>
      
      <main className="flex-1 container mx-auto px-4 pt-40 pb-6 space-y-8">
        {children}
      </main>
      
      <footer className="bg-gray-100 p-3 border-t border-border-color mt-auto">
        <div className="container mx-auto text-center text-inactive-tab text-xs">
          <p>Hilton Dashboard &copy; {new Date().getFullYear()}</p>
        </div>
      </footer>
    </div>
  )
}

export default Layout 