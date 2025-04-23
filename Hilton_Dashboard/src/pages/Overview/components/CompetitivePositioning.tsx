import React from 'react';
import { AwarenessData } from '../../../types/data';
import { colors } from '../../../utils/colors';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CompetitivePositioningProps {
  data: AwarenessData[];
}

const CompetitivePositioning: React.FC<CompetitivePositioningProps> = ({ data }) => {
  // Processed data (in a real case, this would come from the actual data)
  const chartData = [
    { brand: 'Hilton', awareness: 86, consideration: 72 },
    { brand: 'Marriott', awareness: 82, consideration: 68 },
    { brand: 'Hyatt', awareness: 75, consideration: 63 },
    { brand: 'IHG', awareness: 70, consideration: 61 },
    { brand: 'Accor', awareness: 65, consideration: 57 }
  ];
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Competitive Positioning</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="brand" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar 
            dataKey="awareness" 
            name="Awareness" 
            fill={colors.primary}
          />
          <Bar 
            dataKey="consideration" 
            name="Consideration" 
            fill={colors.secondary}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CompetitivePositioning;