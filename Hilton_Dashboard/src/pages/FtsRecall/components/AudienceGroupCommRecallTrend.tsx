import React, { useMemo } from 'react';
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

// Renombrar interfaz y props
interface AudienceGroupCommRecallTrendProps {
  data: FtsRecallData[];
}

// Interfaz para los datos procesados 
interface ProcessedRecallTrendData {
  quarter: string;
  Millennials?: number; 
  "Gen X"?: number;
}

// Helper para ordenar trimestres
const quarterOrder = { 'Q1': 1, 'Q2': 2, 'Q3': 3, 'Q4': 4 };
const sortQuarters = (a: string, b: string) => {
  const [yearA, qA] = a.split(' ');
  const [yearB, qB] = b.split(' ');
  if (yearA !== yearB) return parseInt(yearA) - parseInt(yearB);
  return quarterOrder[qA as keyof typeof quarterOrder] - quarterOrder[qB as keyof typeof quarterOrder];
};

// Renombrar componente
const AudienceGroupCommRecallTrend: React.FC<AudienceGroupCommRecallTrendProps> = ({ data }) => {
  const trendData = useMemo((): ProcessedRecallTrendData[] => {
    if (!data || data.length === 0) return [];

    const audienceGroups = ['Millennials', 'Gen X']; 
    const filteredData = data.filter(item => audienceGroups.includes(item.audience));

    const groupedByQuarter: { [quarter: string]: { [audience: string]: number } } = {};
    filteredData.forEach(item => {
      if (!groupedByQuarter[item.quarter]) {
        groupedByQuarter[item.quarter] = {};
      }
      // Usar communicationRecall
      const recallValue = Number(item.communicationRecall);
      groupedByQuarter[item.quarter][item.audience] = isNaN(recallValue) ? 0 : recallValue; 
    });

    const result: ProcessedRecallTrendData[] = Object.entries(groupedByQuarter).map(([quarter, values]) => ({
      quarter: quarter,
      Millennials: values.Millennials,
      "Gen X": values["Gen X"]
    }));

    return result.sort((a, b) => sortQuarters(a.quarter, b.quarter));

  }, [data]);
  
  const yDomain = useMemo(() => {
      if (!trendData || trendData.length === 0) return [0, 70];
      let min = Infinity;
      let max = 0;
      trendData.forEach(item => {
          if (item.Millennials !== undefined && item.Millennials < min) min = item.Millennials;
          if (item.Millennials !== undefined && item.Millennials > max) max = item.Millennials;
          if (item["Gen X"] !== undefined && item["Gen X"] < min) min = item["Gen X"];
          if (item["Gen X"] !== undefined && item["Gen X"] > max) max = item["Gen X"];
      });
      if (min === Infinity) min = 0;
      const minValue = Math.max(0, Math.floor(min) - 5);
      const maxValue = Math.ceil(max / 10) * 10 + 5;
      return [minValue, maxValue]; 
  }, [trendData]);

  if (trendData.length === 0) {
      return (
        <div className="p-4 bg-white rounded shadow-sm">
            <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
                Communication Recall: Quarterly trend by audience group {/* Título actualizado */}
            </h3>
            <div className="h-64 flex items-center justify-center text-gray-500">
                No recall trend data available for Millennials or Gen X.
            </div>
        </div>
      );
  }

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Communication Recall: Quarterly trend by audience group {/* Título actualizado */}
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trendData}
            margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" /> */}
            <XAxis 
              dataKey="quarter" 
              type="category" 
              tick={{ fill: '#6B7280', fontSize: 11 }}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis 
              domain={yDomain}
              tick={{ fill: '#6B7280', fontSize: 11 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px' }} iconType="circle" />
            
            {/* Millennials Recall */}
            <Line 
              name="Millennials" // Mantener nombre para leyenda compartida visualmente
              type="monotone" 
              dataKey="Millennials" 
              stroke={colors.hiltonBlue} 
              {...lineConfig}
            />
            
            {/* Gen X Recall */}
            <Line 
              name="Gen X" // Mantener nombre para leyenda compartida visualmente
              type="monotone" 
              dataKey="Gen X" 
              stroke={colors.turquoise} 
              {...lineConfig}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Renombrar export
export default AudienceGroupCommRecallTrend; 