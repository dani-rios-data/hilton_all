import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { PriceWorthData } from '../../../types/data';
import { colors } from '../../../utils/colors';
import CustomTooltip from '../../../components/ui/CustomTooltip';
import { lineConfig } from '../../../components/ui/ChartComponents';

interface ValuePriceRatioProps {
  data: PriceWorthData[];
}

const ValuePriceRatio: React.FC<ValuePriceRatioProps> = ({ data }) => {
  // Process data - in a real implementation, this would process the PriceWorthData
  // For demo purposes, using static data matching the mockup
  const ratioData = [
    { name: 'Q4 2022', hilton: 34.9, marriott: 37.9 },
    { name: 'Q1 2023', hilton: 31.9, marriott: 34.3 },
    { name: 'Q2 2023', hilton: 39.4, marriott: 41.3 },
    { name: 'Q3 2023', hilton: 38.7, marriott: 39.5 },
    { name: 'Q4 2023', hilton: 40.6, marriott: 38.5 }
  ];

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Value-to-price ratio trend
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={ratioData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6B7280' }}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis 
              domain={[30, 45]} 
              tick={{ fill: '#6B7280' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} />
            <Line 
              name="Hilton" 
              type="monotone" 
              dataKey="hilton" 
              stroke={colors.hiltonBlue} 
              {...lineConfig}
            />
            <Line 
              name="Marriott" 
              type="monotone" 
              dataKey="marriott" 
              stroke={colors.turquoise} 
              strokeDasharray="5 5"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ValuePriceRatio;