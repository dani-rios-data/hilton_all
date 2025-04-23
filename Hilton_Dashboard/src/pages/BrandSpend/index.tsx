import React from 'react';
import { useCSVData } from '../../hooks/useCSVData';
import { processBrandSpendData } from '../../utils/dataProcessing';
import { colors } from '../../utils/colors';
import SpendDistribution from './components/SpendDistribution';
import MarketingBudget from './components/MarketingBudget';
import KeyStatistics from './components/KeyStatistics';
import DataSummary from './components/DataSummary';

const BrandSpend: React.FC = () => {
  const { brandSpend, isLoading, error } = useCSVData();

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading data...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const processedData = processBrandSpendData(brandSpend);

  return (
    <div className="space-y-8">
      <h2 className="mb-4 text-xl font-serif" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Marketing Spend Analysis
      </h2>
      
      <div className="grid grid-cols-3 gap-6">
        <MarketingBudget data={processedData} />
        <SpendDistribution data={processedData.slice(0, 7)} />
      </div>
      
      <KeyStatistics data={processedData} />
      
      <DataSummary />
    </div>
  );
};

export default BrandSpend;