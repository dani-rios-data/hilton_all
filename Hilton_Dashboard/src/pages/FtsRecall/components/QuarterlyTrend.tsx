import React from 'react';
import { 
  AreaChart, 
  Area, 
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

interface QuarterlyTrendProps {
  data: FtsRecallData[];
}

const QuarterlyTrend: React.FC<QuarterlyTrendProps> = ({ data }) => {
  // Process data - in a real implementation, this would process the FtsRecallData
  // For demo purposes, using static data matching the mockup
  const trendData = [
    { name: 'Q1 2023', ftsAssociation: 32, commRecall: 28 },
    { name: 'Q2 2023', ftsAssociation: 38, commRecall: 35 },
    { name: 'Q3 2023', ftsAssociation: 45, commRecall: 42 },
    { name: 'Q4 2023', ftsAssociation: 51, commRecall: 48 },
    { name: 'Q1 2024', ftsAssociation: 58, commRecall: 53 }
  ];

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Quarterly trend of FTS association and communication recall
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={trendData}
            margin={{ top: 10, right: 30, left: 20, bottom: 25 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6B7280' }}
              axisLine={false}
            />
            <YAxis 
              tick={{ fill: '#6B7280' }}
              axisLine={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} />
            <defs>
              <linearGradient id="colorAssoc" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.hiltonBlue} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={colors.hiltonBlue} stopOpacity={0.1}/>
              </linearGradient>
              <linearGradient id="colorRecall" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.turquoise} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={colors.turquoise} stopOpacity={0.1}/>
              </linearGradient>
            </defs>
            <Area 
              type="monotone" 
              dataKey="ftsAssociation" 
              name="FTS Association" 
              stroke={colors.hiltonBlue} 
              fillOpacity={0.7}
              fill="url(#colorAssoc)" 
              {...lineConfig}
            />
            <Area 
              type="monotone" 
              dataKey="commRecall" 
              name="Communication Recall" 
              stroke={colors.turquoise} 
              fillOpacity={0.7}
              fill="url(#colorRecall)" 
              {...lineConfig}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default QuarterlyTrend;