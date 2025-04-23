import React from 'react';
import { 
  ComposedChart, 
  Bar, 
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

interface AwarenessCombinedProps {
  data: AwarenessData[];
}

const AwarenessCombined: React.FC<AwarenessCombinedProps> = ({ data }) => {
  // Process data - in a real implementation, this would process the AwarenessData
  // For demo purposes, using static data matching the mockup
  const combinedData = [
    { name: 'Hilton', awareness: 85, consideration: 72 },
    { name: 'Marriott', awareness: 83, consideration: 68 },
    { name: 'Hyatt', awareness: 76, consideration: 61 },
    { name: 'IHG', awareness: 72, consideration: 59 }
  ];

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Awareness vs Consideration
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={combinedData}
            margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6B7280' }}
              axisLine={false}
            />
            <YAxis 
              domain={[0, 100]} 
              tick={{ fill: '#6B7280' }}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} />
            <Bar 
              name="Awareness" 
              dataKey="awareness" 
              barSize={30} 
              fill={colors.hiltonBlue}
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              name="Consideration" 
              dataKey="consideration" 
              barSize={30} 
              fill={colors.turquoise}
              radius={[4, 4, 0, 0]}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AwarenessCombined;