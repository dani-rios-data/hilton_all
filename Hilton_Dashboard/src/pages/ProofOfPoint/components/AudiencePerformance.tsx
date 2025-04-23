import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Tooltip, 
  Cell 
} from 'recharts';
import { ProofOfPointData } from '../../../types/data';
import { colors, pieColors } from '../../../utils/colors';

interface AudiencePerformanceProps {
  data: ProofOfPointData[];
}

const AudiencePerformance: React.FC<AudiencePerformanceProps> = ({ data }) => {
  // Process data - in a real implementation, this would process the ProofOfPointData
  // For demo purposes, using static data matching the mockup
  const audienceData = [
    { name: 'Global', value: 0.29 },
    { name: 'Zillennials', value: 0.30 }
  ];

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Performance by audience
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={audienceData}
            layout="vertical"
            margin={{ top: 5, right: 30, left: 80, bottom: 5 }}
          >
            <XAxis 
              type="number" 
              domain={[0, 0.5]} 
              tickFormatter={value => `${(value * 100).toFixed(0)}%`} 
              tick={{ fill: '#6B7280' }} 
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={80} 
              tick={{ fill: '#6B7280' }} 
            />
            <Tooltip formatter={(value: number) => `${(value * 100).toFixed(1)}%`} />
            <Bar 
              dataKey="value" 
              barSize={30}
              radius={[0, 4, 4, 0]}
            >
              {audienceData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index % pieColors.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AudiencePerformance;