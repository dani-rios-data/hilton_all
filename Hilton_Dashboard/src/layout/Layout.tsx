import React from 'react'
import { colors } from '../utils/colors'
import { TabType } from '../types/data'

interface LayoutProps {
  children: React.ReactNode
  setActivePage: (page: string) => void
  activePage: string
}

const Layout: React.FC<LayoutProps> = ({ children, setActivePage, activePage }) => {
  // Mapeo entre los IDs actuales y los que se esperan en el nuevo diseño
  const navItems = [
    { id: 'overview', label: 'Overview' },
    { id: 'brandspend', label: 'Brand Spend' },
    { id: 'proof', label: 'Proof of Point' },
    { id: 'priceworth', label: 'Price vs Worth' },
    { id: 'fts', label: 'FTS Association' },
    { id: 'awareness', label: 'Awareness & Consideration' }
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex items-center justify-between px-8 py-5" style={{ borderBottom: '1px solid #E5E7EB' }}>
        <div className="flex items-center">
          <img src="/logo_hilton.svg" alt="Hilton Logo" className="h-10" />
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
          {/* Empty div for balance - keeps the header centered */}
          <div style={{ width: '120px' }}></div>
        </div>
      </div>
      
      <div className="flex border-b border-gray-200" style={{ backgroundColor: colors.hiltonOffWhite }}>
        <div className="flex w-full justify-center">
          {navItems.map((tab) => (
            <button
              key={tab.id}
              className="px-6 py-3 font-medium transition-colors duration-200"
              style={{ 
                color: activePage === tab.id ? colors.hiltonBlue : '#6B7280',
                borderBottom: activePage === tab.id ? `3px solid ${colors.hiltonBlue}` : 'none',
                backgroundColor: activePage === tab.id ? colors.white : colors.hiltonOffWhite,
                fontSize: '15px',
                margin: '0 2px'
              }}
              onClick={() => setActivePage(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
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