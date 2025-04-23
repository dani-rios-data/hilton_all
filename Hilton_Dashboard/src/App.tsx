import React, { useState } from 'react'
import Overview from './pages/Overview'
import AwarenessConsideration from './pages/AwarenessConsideration'
import BrandSpend from './pages/BrandSpend'
import FtsRecall from './pages/FtsRecall'
import PriceWorth from './pages/PriceWorth'
import ProofOfPoint from './pages/ProofOfPoint'
import Layout from './layout/Layout'

const App: React.FC = () => {
  const [activePage, setActivePage] = useState<string>('overview')

  const renderPage = () => {
    switch (activePage) {
      case 'overview':
        return <Overview />
      case 'awareness':
        return <AwarenessConsideration />
      case 'brandspend':
        return <BrandSpend />
      case 'fts':
        return <FtsRecall />
      case 'priceworth':
        return <PriceWorth />
      case 'proof':
        return <ProofOfPoint />
      default:
        return <Overview />
    }
  }

  return (
    <Layout setActivePage={setActivePage} activePage={activePage}>
      {renderPage()}
    </Layout>
  )
}

export default App 