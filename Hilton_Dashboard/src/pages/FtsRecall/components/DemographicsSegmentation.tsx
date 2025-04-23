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
import { FtsRecallData } from '../../../types/data';
import { colors } from '../../../utils/colors';
import CustomTooltip from '../../../components/ui/CustomTooltip';

interface DemographicsSegmentationProps {
  data: FtsRecallData[];
}

const DemographicsSegmentation: React.FC<DemographicsSegmentationProps> = ({ data }) => {
  // Process data - in a real implementation, this would process the FtsRecallData
  // For demo purposes, using static data matching the mockup
  const demographicsData = [
    { name: 'Frequent', ftsAssociation: 62, commRecall: 59 },
    { name: 'Millennials', ftsAssociation: 54, commRecall: 51 },
    { name: 'Gen X', ftsAssociation: 48, commRecall: 45 },
    { name: 'Families', ftsAssociation: 43, commRecall: 39 },
    { name: 'Business', ftsAssociation: 58, commRecall: 55 }
  ];

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Demographics segmentation
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart 
            outerRadius={90} 
            width={730} 
            height={250} 
            data={demographicsData}
            style={{ margin: "0 auto" }}
          >
            <PolarAngleAxis 
              dataKey="name" 
              tick={{ fill: '#6B7280', fontSize: 11 }}
              cy="50%"
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 70]} 
              tick={{ fontSize: 10 }}
            />
            <Radar 
              name="FTS Association" 
              dataKey="ftsAssociation" 
              stroke={colors.hiltonBlue} 
              fill={colors.hiltonBlue} 
              fillOpacity={0.6} 
            />
            <Radar 
              name="Communication Recall" 
              dataKey="commRecall" 
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

export default DemographicsSegmentation;