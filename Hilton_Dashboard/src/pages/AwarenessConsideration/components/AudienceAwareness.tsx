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
import { AwarenessData } from '../../../types/data';
import { colors } from '../../../utils/colors';
import CustomTooltip from '../../../components/ui/CustomTooltip';

interface AudienceAwarenessProps {
  data: AwarenessData[];
}

const AudienceAwareness: React.FC<AudienceAwarenessProps> = ({ data }) => {
  // Process data - in a real implementation, this would process the AwarenessData
  // For demo purposes, using static data matching the mockup
  const audienceData = [
    { name: 'Business', hilton: 88, marriott: 86 },
    { name: 'Families', hilton: 82, marriott: 81 },
    { name: 'Millennials', hilton: 86, marriott: 83 },
    { name: 'Gen X', hilton: 84, marriott: 82 }
  ];

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Awareness by audience
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={audienceData}
            margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6B7280' }}
              axisLine={false}
            />
            <YAxis 
              domain={[65, 95]} 
              tick={{ fill: '#6B7280' }}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} />
            <Bar 
              name="Hilton" 
              dataKey="hilton" 
              fill={colors.hiltonBlue}
              barSize={24}
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              name="Marriott" 
              dataKey="marriott" 
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

export default AudienceAwareness;