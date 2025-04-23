import React from 'react';
import { 
  BarChart, 
  Bar, 
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

interface PriceWorthByGenerationProps {
  data: PriceWorthData[];
}

const PriceWorthByGeneration: React.FC<PriceWorthByGenerationProps> = ({ data }) => {
  // Process data - in a real implementation, this would process the PriceWorthData
  // For demo purposes, using static data matching the mockup
  const generationData = [
    { name: 'Millennials', hiltonPrice: 63, marriottPrice: 52.4, hiltonWorth: 31, marriottWorth: 27.6 },
    { name: 'Gen X', hiltonPrice: 61.6, marriottPrice: 56.8, hiltonWorth: 22.6, marriottWorth: 22.6 },
    { name: 'Boomers', hiltonPrice: 57, marriottPrice: 55.6, hiltonWorth: 14.4, marriottWorth: 12.4 }
  ];

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Price/Worth by generation
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={generationData}
            margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6B7280' }} 
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              domain={[0, 70]} 
              tick={{ fill: '#6B7280' }} 
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} />
            <Bar 
              name="Hilton Price" 
              dataKey="hiltonPrice" 
              fill={colors.hiltonBlue} 
              barSize={24}
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              name="Hilton Worth" 
              dataKey="hiltonWorth" 
              fill={colors.turquoise} 
              barSize={24}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceWorthByGeneration;