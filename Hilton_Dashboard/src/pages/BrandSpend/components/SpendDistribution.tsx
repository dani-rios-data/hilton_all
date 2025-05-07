import React from 'react';
import { BrandSpendData } from '../../../types/data';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { colors } from '../../../utils/colors';

interface SpendDistributionProps {
  data: BrandSpendData[];
}

const SpendDistribution: React.FC<SpendDistributionProps> = ({ data }) => {
  // Sort data by spend in descending order and limit to top 8
  const sortedData = [...data]
    .filter(item => item.spend > 0)
    .sort((a, b) => b.spend - a.spend)
    .slice(0, 8)
    .map(item => ({
      brand: item.brand,
      spend: item.spend,
      displayBrand: item.brand.length > 25 ? `${item.brand.substring(0, 22)}...` : item.brand
    }));

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm flex">
      <div className="h-[400px] w-1/2">
        <h3 className="mb-4 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
          Brand Spend Distribution
        </h3>
        <ResponsiveContainer width="100%" height="90%">
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
          >
            <XAxis 
              type="number"
              tickFormatter={value => `$${(value/1000000).toFixed(1)}M`}
              tick={{ fill: '#6B7280' }}
            />
            <YAxis 
              dataKey="displayBrand"
              type="category"
              tick={{ fill: '#6B7280' }}
              width={140}
            />
            <Tooltip 
              formatter={(value: number) => [`$${(value/1000000).toFixed(2)}M`, 'Spend']}
              contentStyle={{ 
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '4px'
              }}
            />
            <Bar 
              dataKey="spend"
              fill={colors.hiltonBlue}
              radius={[0, 4, 4, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      
      <div className="w-1/2 pl-6 flex flex-col justify-center">
        <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
          Key Insights
        </h3>
        <ul className="space-y-2 text-sm">
          <li className="text-gray-700">
            <strong>Enterprise Linear TV dominates</strong> with $32.7M in spend, representing the largest single investment in Hilton's marketing mix.
          </li>
          <li className="text-gray-700">
            <strong>Search marketing is critical</strong>, with Generic Paid Search ($29.1M) being the second highest category, showing Hilton's focus on capturing high-intent traffic.
          </li>
          <li className="text-gray-700">
            <strong>Social media represents a significant investment</strong> with LF Social ($20.4M) and UF Social ($16.1M) collectively accounting for over $36M in spending.
          </li>
          <li className="text-gray-700">
            <strong>Meta Search investments</strong> are substantial with Traditional ($15.9M) and Sponsored ($16.1M) channels combining for over $32M in spend.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SpendDistribution; 