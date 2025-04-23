import React from 'react';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { ProofOfPointData } from '../../../types/data';
import { colors } from '../../../utils/colors';

interface FeatureImportanceProps {
  data: ProofOfPointData[];
}

const FeatureImportance: React.FC<FeatureImportanceProps> = ({ data }) => {
  // Process data - in a real implementation, this would process the ProofOfPointData
  // For demo purposes, using static data matching the mockup
  const featureData = [
    { name: 'Relax & Recharge', value: 0.62 },
    { name: 'In the Know', value: 0.29 },
    { name: 'Feel Special', value: 0.36 },
    { name: 'Brand Fit', value: 0.42 },
    { name: 'Trust', value: 0.52 }
  ];

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Feature importance
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart 
            outerRadius={90} 
            width={730} 
            height={250} 
            data={featureData}
            cy="50%"
          >
            <PolarAngleAxis 
              dataKey="name" 
              tick={{ fill: '#6B7280', fontSize: 11 }} 
            />
            <PolarRadiusAxis 
              angle={90} 
              domain={[0, 0.7]} 
              tickFormatter={value => `${(value * 100).toFixed(0)}%`} 
              tick={{ fontSize: 10 }}
            />
            <Radar 
              name="Feature importance" 
              dataKey="value" 
              stroke={colors.hiltonBlue} 
              fill={colors.hiltonBlue} 
              fillOpacity={0.6} 
            />
            <Tooltip formatter={(value: number) => `${(value * 100).toFixed(1)}%`} />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FeatureImportance;