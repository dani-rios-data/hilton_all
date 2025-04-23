import React from 'react';
import { AwarenessData } from '../../../types/data';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { colors } from '../../../utils/colors';

interface AwarenessTrendProps {
  data: AwarenessData[];
}

const AwarenessTrend: React.FC<AwarenessTrendProps> = ({ data }) => {
  // In a real case, this would process the actual data
  const chartData = [
    { quarter: 'Q1 2023', hilton: 78, marriott: 76 },
    { quarter: 'Q2 2023', hilton: 80, marriott: 77 },
    { quarter: 'Q3 2023', hilton: 82, marriott: 78 },
    { quarter: 'Q4 2023', hilton: 85, marriott: 79 },
    { quarter: 'Q1 2024', hilton: 86, marriott: 82 }
  ];
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Awareness Trend</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="quarter" />
          <YAxis domain={[70, 90]} />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="hilton" 
            name="Hilton" 
            stroke={colors.primary} 
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="marriott" 
            name="Marriott" 
            stroke={colors.competitors.marriott} 
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AwarenessTrend;