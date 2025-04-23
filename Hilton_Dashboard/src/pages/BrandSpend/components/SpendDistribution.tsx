import React from 'react';
import { BrandSpendData } from '../../../types/data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { colors } from '../../../utils/colors';

interface SpendDistributionProps {
  data: BrandSpendData[];
}

const SpendDistribution: React.FC<SpendDistributionProps> = ({ data }) => {
  // Group data by brand and sum expenses
  const processedData = data.reduce((acc, item) => {
    const existingBrand = acc.find(b => b.brand === item.brand);
    
    if (existingBrand) {
      existingBrand.spend += item.spend;
    } else {
      acc.push({
        brand: item.brand,
        spend: item.spend
      });
    }
    
    return acc;
  }, [] as { brand: string; spend: number }[]);
  
  // Sort by spend in descending order and limit to top 8
  const sortedData = [...processedData]
    .sort((a, b) => b.spend - a.spend)
    .slice(0, 8);
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Brand Spend Distribution</h3>
      
      <ResponsiveContainer width="100%" height={350}>
        <BarChart
          data={sortedData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="brand" />
          <YAxis />
          <Tooltip
            formatter={(value) => [`$${value.toLocaleString()}`, 'Spend']}
          />
          <Legend />
          <Bar 
            dataKey="spend" 
            name="Spend (USD)" 
            fill={colors.primary} 
            radius={[4, 4, 0, 0]} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendDistribution; 