import React from 'react';
import { BrandSpendData } from '../../../types/data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { colors } from '../../../utils/colors';

interface SpendDistributionProps {
  data: BrandSpendData[];
}

const SpendDistribution: React.FC<SpendDistributionProps> = ({ data }) => {
  // Sort data by spend in descending order and limit to top 8
  const sortedData = [...data]
    .sort((a, b) => b.spend - a.spend)
    .slice(0, 8)
    .map(item => ({
      brand: item.brand,
      spend: item.spend,
      displayBrand: item.brand.length > 25 ? `${item.brand.substring(0, 22)}...` : item.brand
    }));

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="mb-4 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Brand Spend Distribution
      </h3>
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 150, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
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
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendDistribution; 