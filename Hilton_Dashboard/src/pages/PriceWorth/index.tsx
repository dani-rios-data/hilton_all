import React from 'react';
import { useCSVData } from '../../hooks/useCSVData';
import { colors } from '../../utils/colors';
import PriceWorthByGeneration from './components/PriceWorthByGeneration';
import CompetitiveComparison from './components/CompetitiveComparison';
import PriceWorthTrend from './components/PriceWorthTrend';
import ValuePriceRatio from './components/ValuePriceRatio';
import CompetitiveDataAnalysis from './components/CompetitiveDataAnalysis';

const PriceWorth: React.FC = () => {
  const { priceWorth, isLoading, error } = useCSVData();

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading data...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <h2 className="mb-4 text-xl font-serif" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Price vs Worth Comparison
      </h2>
      
      <div className="grid grid-cols-2 gap-6">
        <PriceWorthByGeneration data={priceWorth} />
        <CompetitiveComparison data={priceWorth} />
      </div>
      
      <PriceWorthTrend data={priceWorth} />
      
      <ValuePriceRatio data={priceWorth} />
      
      <CompetitiveDataAnalysis />
    </div>
  );
};

export default PriceWorth;