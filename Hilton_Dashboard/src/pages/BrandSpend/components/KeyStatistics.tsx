import React from 'react';
import { BrandSpendData } from '../../../types/data';
import { colors } from '../../../utils/colors';

interface KeyStatisticsProps {
  data: BrandSpendData[];
}

const KeyStatistics: React.FC<KeyStatisticsProps> = ({ data }) => {
  // Sort data by spend in descending order
  const sortedData = [...data].sort((a, b) => b.spend - a.spend);
  
  // Calculate statistics
  const totalSpend = data.reduce((sum, item) => sum + item.spend, 0);
  const highestSpend = sortedData[0]?.spend || 0;
  const top3Spend = sortedData.slice(0, 3).reduce((sum, item) => sum + item.spend, 0);
  const avgSpend = totalSpend / (data.length || 1); // Avoid division by zero

  // Calculate percentage for top 3
  const top3Percentage = totalSpend > 0 ? (top3Spend / totalSpend) * 100 : 0;

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.primary }}>
        Key Statistics
      </h3>
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 rounded bg-gray-50 border border-gray-100">
          <div className="mb-2 text-3xl font-bold" style={{ color: colors.primary }}>
            ${(totalSpend/1000000).toFixed(1)}M
          </div>
          <div className="text-sm">Total marketing spend</div>
        </div>
        
        <div className="p-4 rounded bg-gray-50 border border-gray-100">
          <div className="mb-2 text-3xl font-bold" style={{ color: colors.secondary }}>
            ${(highestSpend/1000000).toFixed(1)}M
          </div>
          <div className="text-sm">Highest spend category</div>
        </div>
        
        <div className="p-4 rounded bg-gray-50 border border-gray-100">
          <div className="mb-2 text-3xl font-bold" style={{ color: colors.tertiary }}>
            {top3Percentage.toFixed(0)}%
          </div>
          <div className="text-sm">Top 3 categories (% of budget)</div>
        </div>
        
        <div className="p-4 rounded bg-gray-50 border border-gray-100">
          <div className="mb-2 text-3xl font-bold" style={{ color: colors.accent }}>
            ${(avgSpend/1000000).toFixed(1)}M
          </div>
          <div className="text-sm">Average spend per category</div>
        </div>
      </div>
    </div>
  );
};

export default KeyStatistics;