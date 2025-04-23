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
import { ConsiderationData } from '../../../types/data';
import { colors } from '../../../utils/colors';
import CustomTooltip from '../../../components/ui/CustomTooltip';
import { lineConfig } from '../../../components/ui/ChartComponents';

interface ConsiderationTrendProps {
  data: ConsiderationData[];
}

const ConsiderationTrend: React.FC<ConsiderationTrendProps> = ({ data }) => {
  // Process data - in a real implementation, this would process the ConsiderationData
  // For demo purposes, using static data matching the mockup
  const trendData = [
    { name: 'Q1 2023', hilton: 65, marriott: 63, hyatt: 57 },
    { name: 'Q2 2023', hilton: 67, marriott: 64, hyatt: 58 },
    { name: 'Q3 2023', hilton: 69, marriott: 66, hyatt: 59 },
    { name: 'Q4 2023', hilton: 70, marriott: 67, hyatt: 60 },
    { name: 'Q1 2024', hilton: 72, marriott: 68, hyatt: 61 }
  ];

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Consideration trend
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trendData}
            margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6B7280' }}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis 
              domain={[50, 75]} 
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
              {...lineConfig}
            />
            <Line 
              name="Hyatt" 
              type="monotone" 
              dataKey="hyatt" 
              stroke={colors.teal} 
              {...lineConfig}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ConsiderationTrend;