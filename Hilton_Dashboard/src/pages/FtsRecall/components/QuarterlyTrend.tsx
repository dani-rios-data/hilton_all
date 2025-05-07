import React, { useMemo } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
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
  const trendData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Filter only Total audience data
    const totalData = data.filter(item => item.audience === 'Total');

    // Custom sort function for quarters
    const quarterOrder = {
      'Q1': 1,
      'Q2': 2,
      'Q3': 3,
      'Q4': 4
    };

    return totalData
      .sort((a, b) => {
        const [yearA, qA] = a.quarter.split(' ');
        const [yearB, qB] = b.quarter.split(' ');
        
        if (yearA !== yearB) {
          return parseInt(yearA) - parseInt(yearB);
        }
        return quarterOrder[qA as keyof typeof quarterOrder] - quarterOrder[qB as keyof typeof quarterOrder];
      })
      .map(item => ({
        name: item.quarter,
        ftsAssociation: item.value,
        commRecall: item.communicationRecall
      }));
  }, [data]);

  // Calcular el valor máximo dinámicamente para el eje Y
  const maxYDomain = useMemo(() => {
    if (!trendData || trendData.length === 0) return 60;

    const maxValue = Math.max(
      ...trendData.map(item => Math.max(
        Number(item.ftsAssociation) || 0,
        Number(item.commRecall) || 0
      ))
    );

    return Math.ceil(maxValue) + 5; // Añadir 5 puntos al máximo
  }, [trendData]);

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-6 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Total Audience: Quarterly trend of FTS association and communication recall
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={trendData}
            margin={{ top: 10, right: 30, left: 20, bottom: 25 }}
          >
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6B7280', fontSize: 11 }}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis 
              tick={{ fill: '#6B7280', fontSize: 11 }}
              domain={[0, maxYDomain]}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: '11px' }}
            />
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