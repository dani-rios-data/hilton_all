import React from 'react';
import { ConsiderationData } from '../../../types/data';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { colors } from '../../../utils/colors';

interface AudiencePerformanceProps {
  data: ConsiderationData[];
}

const AudiencePerformance: React.FC<AudiencePerformanceProps> = ({ data }) => {
  // Group data by audience
  const groupedData = data.reduce((acc, item) => {
    if (item.audience && item.brand === 'Hilton') {
      if (!acc[item.audience]) {
        acc[item.audience] = { audience: item.audience, value: 0, count: 0 };
      }
      
      acc[item.audience].value += item.value;
      acc[item.audience].count += 1;
    }
    
    return acc;
  }, {} as Record<string, { audience: string; value: number; count: number; }>);
  
  // Calculate averages for each audience
  const chartData = Object.values(groupedData).map(item => ({
    audience: item.audience,
    value: item.count > 0 ? item.value / item.count : 0
  }));
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Performance by Audience</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="audience" />
          <YAxis domain={[0, 100]} />
          <Tooltip 
            formatter={(value: number) => [`${value.toFixed(1)}%`, 'Consideration']}
          />
          <Legend />
          <Bar 
            dataKey="value" 
            name="Consideration (%)" 
            fill={colors.primary}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AudiencePerformance;