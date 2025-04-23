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
import { AwarenessData } from '../../../types/data';
import { colors } from '../../../utils/colors';
import CustomTooltip from '../../../components/ui/CustomTooltip';
import { lineConfig } from '../../../components/ui/ChartComponents';

interface AwarenessTrendProps {
  data: AwarenessData[];
}

const AwarenessTrend: React.FC<AwarenessTrendProps> = ({ data }) => {
  // Process data - in a real implementation, this would process the AwarenessData
  // For demo purposes, using static data matching the mockup
  const trendData = [
    { name: 'Q1 2023', hilton: 80, marriott: 79, hyatt: 72 },
    { name: 'Q2 2023', hilton: 81, marriott: 80, hyatt: 73 },
    { name: 'Q3 2023', hilton: 83, marriott: 81, hyatt: 74 },
    { name: 'Q4 2023', hilton: 84, marriott: 82, hyatt: 75 },
    { name: 'Q1 2024', hilton: 85, marriott: 83, hyatt: 76 }
  ];

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Awareness trend
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
              domain={[65, 90]} 
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

export default AwarenessTrend;