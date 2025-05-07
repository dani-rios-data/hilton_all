import React from 'react';
import { BrandSpendData } from '../../../types/data';
import { colors } from '../../../utils/colors';

interface KeyStatisticsProps {
  data: BrandSpendData[];
}

const KeyStatistics: React.FC<KeyStatisticsProps> = ({ data }) => {
  // Calculate total marketing spend
  const totalSpend = data.reduce((sum, item) => sum + item.spend, 0);

  // Find highest spend category
  const sortedData = [...data].sort((a, b) => b.spend - a.spend);
  const highestSpend = sortedData[0]?.spend || 0;

  // Calculate top 3 categories percentage
  const top3Spend = sortedData.slice(0, 3).reduce((sum, item) => sum + item.spend, 0);
  const top3Percentage = ((top3Spend / totalSpend) * 100);

  // Calculate average spend per category
  const avgSpend = totalSpend / data.filter(item => item.spend > 0).length;

  // Get highest spend category name for tooltip
  const highestCategory = sortedData[0]?.brand || '';
  const top3Categories = sortedData.slice(0, 3).map(item => item.brand).join(', ');

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 transition-all hover:shadow-md" 
           style={{ borderTopColor: colors.hiltonBlue }}
           title={`Total marketing spend across all categories`}>
        <div className="text-3xl font-bold" style={{ color: colors.hiltonBlue }}>
          ${(totalSpend/1000000).toFixed(1)}M
        </div>
        <div className="text-sm text-gray-600 mt-2 font-medium">Total marketing spend</div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 transition-all hover:shadow-md" 
           style={{ borderTopColor: colors.turquoise }}
           title={`Highest spend: ${highestCategory}`}>
        <div className="text-3xl font-bold" style={{ color: colors.turquoise }}>
          ${(highestSpend/1000000).toFixed(1)}M
        </div>
        <div className="text-sm text-gray-600 mt-2 font-medium">Highest spend category</div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 transition-all hover:shadow-md" 
           style={{ borderTopColor: colors.teal }}
           title={`Top 3 categories: ${top3Categories}`}>
        <div className="text-3xl font-bold" style={{ color: colors.teal }}>
          {Math.round(top3Percentage)}%
        </div>
        <div className="text-sm text-gray-600 mt-2 font-medium">Top 3 categories (% of budget)</div>
      </div>
      
      <div className="bg-white p-6 rounded-lg shadow-sm border-t-4 transition-all hover:shadow-md" 
           style={{ borderTopColor: colors.blueTint }}
           title={`Average spend across ${data.filter(item => item.spend > 0).length} active categories`}>
        <div className="text-3xl font-bold" style={{ color: colors.blueTint }}>
          ${(avgSpend/1000000).toFixed(1)}M
        </div>
        <div className="text-sm text-gray-600 mt-2 font-medium">Average spend per category</div>
      </div>
    </div>
  );
};

export default KeyStatistics;