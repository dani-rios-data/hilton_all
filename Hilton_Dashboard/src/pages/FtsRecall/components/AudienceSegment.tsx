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
import { FtsRecallData } from '../../../types/data';
import { colors } from '../../../utils/colors';
import CustomTooltip from '../../../components/ui/CustomTooltip';

interface AudienceSegmentProps {
  data: FtsRecallData[];
}

const AudienceSegment: React.FC<AudienceSegmentProps> = ({ data }) => {
  // Process data - in a real implementation, this would process the FtsRecallData
  // For demo purposes, using static data matching the mockup
  const audienceData = [
    { name: 'Frequent', ftsAssociation: 62, commRecall: 59 },
    { name: 'Millennials', ftsAssociation: 54, commRecall: 51 },
    { name: 'Gen X', ftsAssociation: 48, commRecall: 45 },
    { name: 'Families', ftsAssociation: 43, commRecall: 39 },
    { name: 'Business', ftsAssociation: 58, commRecall: 55 }
  ];

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        FTS association by audience segment
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={audienceData}
            margin={{ top: 5, right: 30, left: 10, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6B7280' }}
              axisLine={false}
            />
            <YAxis 
              domain={[0, 70]} 
              tick={{ fill: '#6B7280' }}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} />
            <Bar 
              name="FTS Association" 
              dataKey="ftsAssociation"
              fill={colors.hiltonBlue} 
              barSize={20}
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              name="Communication Recall" 
              dataKey="commRecall" 
              fill={colors.turquoise}
              barSize={20}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AudienceSegment;