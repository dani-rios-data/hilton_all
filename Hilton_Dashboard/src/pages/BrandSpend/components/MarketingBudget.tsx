import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  TooltipProps
} from 'recharts';
import { BrandSpendData } from '../../../types/data';
import { colors } from '../../../utils/colors';
import { NameType, ValueType } from 'recharts/types/component/DefaultTooltipContent';

interface MarketingBudgetProps {
  data: BrandSpendData[];
}

// Componente personalizado para el tooltip
const CustomTooltip = ({ active, payload, label, totalSpend }: TooltipProps<ValueType, NameType> & { totalSpend: number }) => {
  if (active && payload && payload.length) {
    const spend = payload[0].value as number;
    const percentage = ((spend / totalSpend) * 100).toFixed(1);
    
    return (
      <div className="p-3 bg-white border border-gray-200 rounded shadow-sm">
        <p className="mb-1 font-medium">{label}</p>
        <p className="text-sm text-gray-700">
          <span className="font-medium" style={{ color: colors.hiltonBlue }}>
            ${(spend/1000000).toFixed(2)}M
          </span>
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-medium" style={{ color: colors.turquoise }}>
            {percentage}% of total budget
          </span>
        </p>
      </div>
    );
  }

  return null;
};

const MarketingBudget: React.FC<MarketingBudgetProps> = ({ data }) => {
  // Calculate total spend first since we need it for percentages
  const totalSpend = data.reduce((sum, item) => sum + item.spend, 0);
  
  // Sort data by spend in descending order and take top 15
  const sortedData = [...data]
    .filter(item => item.spend > 0)
    .sort((a, b) => b.spend - a.spend)
    .slice(0, 15)
    .map(item => ({
      ...item,
      displayBrand: item.brand.length > 25 ? `${item.brand.substring(0, 22)}...` : item.brand,
      percentage: ((item.spend / totalSpend) * 100).toFixed(1) // Calcular porcentaje
    }));

  // Calculate color gradients
  const getColor = (index: number) => {
    const baseColor = colors.hiltonBlue;
    const opacity = 1 - (index / sortedData.length * 0.7);
    return `${baseColor}${Math.round(opacity * 255).toString(16).padStart(2, '0')}`;
  };

  // Calculate spending distribution statistics for other analysis
  const topFiveSpend = sortedData.slice(0, 5).reduce((sum, item) => sum + item.spend, 0);
  const topFivePercentage = Math.round((topFiveSpend / totalSpend) * 100);
  const digitalChannels = ['LF Social', 'UF Social', 'Branded Paid Search', 'Generic Paid Search', 
                          'Sponsored Meta Search', 'Traditional Meta Search', 'Brand Retargeting Display',
                          'NonBrand LF Display', 'NonBrand UF Display', 'Travel Ads', 'Native', 'Affiliate',
                          'Brand UF Display', 'Brand LF Display'];
  const digitalSpend = data
    .filter(item => digitalChannels.includes(item.brand))
    .reduce((sum, item) => sum + item.spend, 0);
  const digitalPercentage = Math.round((digitalSpend / totalSpend) * 100);

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
            margin={{ top: 5, right: 20, left: 20, bottom: 70 }}
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
              content={<CustomTooltip totalSpend={totalSpend} />}
              cursor={{ fill: 'rgba(0, 47, 97, 0.05)' }}
            />
            <Bar 
              dataKey="spend" 
              radius={[4, 4, 0, 0]}
              barSize={15}
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