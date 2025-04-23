import React from 'react';
import { 
  LineChart, 
  Line, 
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
import { lineConfig } from '../../../components/ui/ChartComponents';

interface AudienceGroupTrendProps {
  data: FtsRecallData[];
}

const AudienceGroupTrend: React.FC<AudienceGroupTrendProps> = ({ data }) => {
  // Process data - in a real implementation, this would process the FtsRecallData
  // For demo purposes, using static data matching the mockup
  const millennialsData = [
    { quarter: 'Q1 2023', audience: 'Millennials', ftsAssociation: 28, commRecall: 25 },
    { quarter: 'Q2 2023', audience: 'Millennials', ftsAssociation: 36, commRecall: 33 },
    { quarter: 'Q3 2023', audience: 'Millennials', ftsAssociation: 45, commRecall: 42 },
    { quarter: 'Q4 2023', audience: 'Millennials', ftsAssociation: 54, commRecall: 51 }
  ];
  
  const genXData = [
    { quarter: 'Q1 2023', audience: 'Gen X', ftsAssociation: 24, commRecall: 22 },
    { quarter: 'Q2 2023', audience: 'Gen X', ftsAssociation: 32, commRecall: 29 },
    { quarter: 'Q3 2023', audience: 'Gen X', ftsAssociation: 40, commRecall: 37 },
    { quarter: 'Q4 2023', audience: 'Gen X', ftsAssociation: 48, commRecall: 45 }
  ];

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Quarterly trend by audience group
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="quarter" 
              type="category" 
              allowDuplicatedCategory={false} 
              tick={{ fill: '#6B7280' }}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis 
              domain={[0, 70]} 
              tick={{ fill: '#6B7280' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} />
            
            {/* Millennials data */}
            <Line 
              data={millennialsData}
              name="Millennials FTS" 
              type="monotone" 
              dataKey="ftsAssociation" 
              stroke={colors.hiltonBlue} 
              {...lineConfig}
            />
            
            {/* Gen X data */}
            <Line 
              data={genXData}
              name="Gen X FTS" 
              type="monotone" 
              dataKey="ftsAssociation" 
              stroke={colors.turquoise} 
              {...lineConfig}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AudienceGroupTrend;