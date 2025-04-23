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
    { id: 'awareness', label: 'Awareness & Consideration' },
    { id: 'brandspend', label: 'Brand Spend' },
    { id: 'fts', label: 'FTS Recall' },
    { id: 'priceworth', label: 'Price Worth' },
    { id: 'proof', label: 'Proof of Point' }
  ]

  return (
    <div className="min-h-screen flex flex-col">
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
          {/* Empty div for balance - keeps the header centered */}
          <div style={{ width: '120px' }}></div>
        </div>
      </div>
      
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