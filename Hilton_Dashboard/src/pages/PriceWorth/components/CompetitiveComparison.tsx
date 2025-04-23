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

interface CompetitiveComparisonProps {
  data: PriceWorthData[];
}

const CompetitiveComparison: React.FC<CompetitiveComparisonProps> = ({ data }) => {
  // Process data - in a real implementation, this would process the PriceWorthData
  // For demo purposes, using static data matching the mockup
  const competitiveData = [
    { name: 'Millennials', hiltonWorth: 31, marriottWorth: 27.6 },
    { name: 'Gen X', hiltonWorth: 22.6, marriottWorth: 22.6 },
    { name: 'Boomers', hiltonWorth: 14.4, marriottWorth: 12.4 }
  ];

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Competitive comparison by generation
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={competitiveData}
            margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6B7280' }}
              axisLine={false} 
            />
            <YAxis 
              domain={[0, 35]} 
              tick={{ fill: '#6B7280' }}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} />
            <Bar 
              name="Hilton Worth" 
              dataKey="hiltonWorth" 
              fill={colors.hiltonBlue} 
              barSize={24}
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              name="Marriott Worth" 
              dataKey="marriottWorth" 
              fill={colors.blueTint} 
              barSize={24}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CompetitiveComparison;