import React from 'react';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  Legend, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { ConsiderationData } from '../../../types/data';
import { colors } from '../../../utils/colors';
import CustomTooltip from '../../../components/ui/CustomTooltip';

interface FeatureConsiderationProps {
  data: ConsiderationData[];
}

const FeatureConsideration: React.FC<FeatureConsiderationProps> = ({ data }) => {
  // Process data - in a real implementation, this would process the ConsiderationData
  // For demo purposes, using static data matching the mockup
  const featureData = [
    { name: 'Loyalty', hilton: 75, marriott: 73 },
    { name: 'Rooms', hilton: 74, marriott: 72 },
    { name: 'Location', hilton: 78, marriott: 76 },
    { name: 'Service', hilton: 76, marriott: 70 },
    { name: 'Value', hilton: 68, marriott: 65 }
  ];

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Consideration by feature
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart 
            outerRadius={90} 
            width={730} 
            height={250} 
            data={featureData}
            style={{ margin: "0 auto" }}
          >
            <PolarAngleAxis 
              dataKey="name" 
              tick={{ fill: '#6B7280', fontSize: 11 }}
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[60, 80]} 
              tick={{ fontSize: 10 }}
            />
            <Radar 
              name="Hilton" 
              dataKey="hilton" 
              stroke={colors.hiltonBlue} 
              fill={colors.hiltonBlue} 
              fillOpacity={0.6} 
            />
            <Radar 
              name="Marriott" 
              dataKey="marriott" 
              stroke={colors.turquoise} 
              fill={colors.turquoise} 
              fillOpacity={0.6} 
            />
            <Legend />
            <Tooltip content={<CustomTooltip />} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FeatureConsideration;