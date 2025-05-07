import React, { useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { AwarenessData, ConsiderationData } from '../../../types/data';
import { colors } from '../../../utils/colors';
import CustomTooltip from '../../../components/ui/CustomTooltip';
import { lineConfig } from '../../../components/ui/ChartComponents';

interface MarriottMetricsTrendProps {
  awarenessData: AwarenessData[];
  considerationData: ConsiderationData[];
}

const MarriottMetricsTrend: React.FC<MarriottMetricsTrendProps> = ({ awarenessData, considerationData }) => {
  const trendData = useMemo(() => {
    if (!awarenessData || !considerationData || awarenessData.length === 0 || considerationData.length === 0) {
      return [];
    }

    // Filtrar datos de Marriott y Unaided Awareness
    const awarenessFiltered = awarenessData.filter(
      item => item.brand === 'Marriott' && item.category === 'Unaided Awareness'
    );

    // Filtrar datos de Marriott y Consideration
    const considerationFiltered = considerationData.filter(
      item => item.brand === 'Marriott' && item.category === 'Consideration'
    );

    // Obtener todos los trimestres únicos
    const quarters = [...new Set([
      ...awarenessFiltered.map(item => item.quarter),
      ...considerationFiltered.map(item => item.quarter)
    ])].sort();

    return quarters.map(quarter => {
      // Procesar datos de awareness
      const quarterAwareness = awarenessFiltered.filter(item => item.quarter === quarter);
      const awarenessValue = quarterAwareness.length > 0
        ? Math.round(quarterAwareness.reduce((sum, item) => {
            let numValue = 0;
            if (typeof item.value === 'string') {
              const strValue = String(item.value);
              numValue = parseFloat(strValue.includes('%') ? strValue.replace('%', '') : strValue);
            } else if (typeof item.value === 'number') {
              numValue = item.value;
            }
            return sum + (isNaN(numValue) ? 0 : numValue);
          }, 0) / quarterAwareness.length)
        : null;

      // Procesar datos de consideration
      const quarterConsideration = considerationFiltered.filter(item => item.quarter === quarter);
      const considerationValue = quarterConsideration.length > 0
        ? Math.round(quarterConsideration.reduce((sum, item) => {
            const numValue = typeof item.value === 'number' ? item.value : 0;
            return sum + numValue;
          }, 0) / quarterConsideration.length)
        : null;

      return {
        name: quarter,
        awareness: awarenessValue,
        consideration: considerationValue
      };
    });
  }, [awarenessData, considerationData]);

  // Calcular los valores mínimo y máximo para ajustar el dominio del eje Y
  const { minValue, maxValue } = useMemo(() => {
    if (!trendData || trendData.length === 0) return { minValue: 0, maxValue: 100 };
    
    let min = Infinity;
    let max = 0;

    trendData.forEach(item => {
      if (item.awareness !== null && item.awareness < min) min = item.awareness;
      if (item.consideration !== null && item.consideration < min) min = item.consideration;
      if (item.awareness !== null && item.awareness > max) max = item.awareness;
      if (item.consideration !== null && item.consideration > max) max = item.consideration;
    });

    return { 
      minValue: Math.max(0, Math.floor(min) - 5),
      maxValue: Math.ceil(max) + 5
    };
  }, [trendData]);

  if (trendData.length === 0) {
    return (
      <div className="p-4 bg-white rounded shadow-sm">
        <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
          Marriott: Awareness vs Consideration Over Time
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Marriott: Awareness vs Consideration Over Time
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trendData}
            margin={{ top: 10, right: 30, left: 0, bottom: 25 }}
          >
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              padding={{ left: 20, right: 20 }}
              axisLine={{ stroke: '#E5E7EB', strokeWidth: 1 }}
              tickLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              domain={[minValue, maxValue]}
              tick={{ fill: '#6B7280', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB', strokeWidth: 1 }}
              tickLine={{ stroke: '#E5E7EB' }}
              tickCount={6}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={24}
              iconType="circle"
              wrapperStyle={{ paddingTop: '8px', fontSize: '11px' }}
            />
            <Line 
              name="Awareness" 
              type="monotone" 
              dataKey="awareness" 
              stroke={colors.turquoise}
              {...lineConfig}
            />
            <Line 
              name="Consideration" 
              type="monotone" 
              dataKey="consideration" 
              stroke={colors.teal}
              {...lineConfig}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MarriottMetricsTrend; 