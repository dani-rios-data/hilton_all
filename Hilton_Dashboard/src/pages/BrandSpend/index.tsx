import React from 'react';
import { useCSVData } from '../../hooks/useCSVData';
import { processBrandSpendData } from '../../utils/dataProcessing';
import { colors } from '../../utils/colors';
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
      <div>
        <h1 className="text-2xl font-serif mb-4" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
          Brand Spend Analysis
        </h1>
      </div>

      <div>
        <h2 className="mb-4 text-xl font-serif" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
          Key Metrics
        </h2>
        <KeyStatistics data={processedData} />
      </div>
      
      <div className="space-y-6">
        <MarketingBudget data={processedData} />
      </div>
      
      <DataSummary />
    </div>
  );
};

export default BrandSpend;