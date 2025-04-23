import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
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
      // Ensure brand name is not too long for display
      displayBrand: item.brand.length > 25 ? `${item.brand.substring(0, 22)}...` : item.brand
    }));

  return (
    <div className="col-span-2 p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Marketing Budget Distribution
      </h3>
      <div className="h-96">
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
              formatter={(value: number) => [`$${(value/1000000).toFixed(2)}M`, 'Marketing Spend']}
              labelFormatter={(label: string) => label}
            />
            <Bar 
              dataKey="spend" 
              fill={colors.primary} 
              radius={[0, 4, 4, 0]}
            >
              {sortedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={index < 3 ? colors.primary : 
                        index < 6 ? colors.secondary : 
                        index < 9 ? colors.tertiary : 
                        index < 12 ? colors.accent : colors.hilton} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MarketingBudget;