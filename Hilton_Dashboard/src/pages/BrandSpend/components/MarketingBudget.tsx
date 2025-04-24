import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { BrandSpendData } from '../../../types/data';
import { colors } from '../../../utils/colors';

interface MarketingBudgetProps {
  data: BrandSpendData[];
}

const MarketingBudget: React.FC<MarketingBudgetProps> = ({ data }) => {
  // Sort data by spend in descending order and take top 15
  const sortedData = [...data]
    .sort((a, b) => b.spend - a.spend)
    .slice(0, 15)
    .map(item => ({
      ...item,
      displayBrand: item.brand.length > 25 ? `${item.brand.substring(0, 22)}...` : item.brand
    }));

  // Calculate color gradients
  const getColor = (index: number) => {
    const baseColor = colors.hiltonBlue;
    const opacity = 1 - (index / sortedData.length * 0.7);
    return `${baseColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <h3 className="mb-4 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Marketing Budget Distribution
      </h3>
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={sortedData}
            layout="horizontal"
            margin={{ top: 5, right: 30, left: 20, bottom: 70 }}
          >
            <XAxis 
              dataKey="displayBrand"
              tick={{ fill: '#6B7280', fontSize: 10 }}
              angle={-45}
              textAnchor="end"
              interval={0}
              height={60}
            />
            <YAxis 
              type="number"
              tickFormatter={value => `$${Math.round(value/1000000)}M`}
              tick={{ fill: '#6B7280', fontSize: 10 }}
              width={45}
            />
            <Tooltip 
              formatter={(value: number) => [`$${(value/1000000).toFixed(2)}M`, 'Marketing Spend']}
              contentStyle={{ 
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '4px'
              }}
            />
            <Bar 
              dataKey="spend" 
              radius={[4, 4, 0, 0]}
            >
              {sortedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getColor(index)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MarketingBudget;