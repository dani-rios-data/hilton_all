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
import { AwarenessData } from '../../../types/data';
import { colors } from '../../../utils/colors';
import CustomTooltip from '../../../components/ui/CustomTooltip';
import { lineConfig } from '../../../components/ui/ChartComponents';

interface AwarenessTrendProps {
  data: AwarenessData[];
}

const AwarenessTrend: React.FC<AwarenessTrendProps> = ({ data }) => {
  const trendData = useMemo(() => {
    if (!data || data.length === 0) {
      console.log("No awareness data available");
      return [];
    }

    // Filtrar solo datos de Unaided Awareness
    const awarenessData = data.filter(item => item.category === 'Unaided Awareness');
    
    // Obtener todos los trimestres únicos
    const quarters = [...new Set(awarenessData.map(item => item.quarter))].sort();
    
    // Crear datos para cada trimestre
    return quarters.map(quarter => {
      // Datos base para este trimestre
      const quarterData: Record<string, any> = { name: quarter };
      
      // Procesar datos de Hilton
      const hiltonData = awarenessData.filter(
        item => item.quarter === quarter && item.brand === 'Hilton'
      );
      
      if (hiltonData.length > 0) {
        const hiltonValues = hiltonData.map(item => {
          if (typeof item.value === 'string') {
            return parseFloat(String(item.value).replace('%', ''));
          }
          return item.value;
        });
        const hiltonAvg = Math.round(
          hiltonValues.reduce((sum, val) => sum + val, 0) / hiltonValues.length
        );
        quarterData.hilton = hiltonAvg;
      }
      
      // Procesar datos de Marriott
      const marriottData = awarenessData.filter(
        item => item.quarter === quarter && item.brand === 'Marriott'
      );
      
      if (marriottData.length > 0) {
        const marriottValues = marriottData.map(item => {
          if (typeof item.value === 'string') {
            return parseFloat(String(item.value).replace('%', ''));
          }
          return item.value;
        });
        const marriottAvg = Math.round(
          marriottValues.reduce((sum, val) => sum + val, 0) / marriottValues.length
        );
        quarterData.marriott = marriottAvg;
      }
      
      return quarterData;
    });
  }, [data]);

  // Calcular los valores mínimo y máximo para ajustar el dominio del eje Y
  const { minValue, maxValue } = useMemo(() => {
    if (!trendData || trendData.length === 0) return { minValue: 0, maxValue: 100 };
    
    let min = Infinity;
    let max = 0;
    
    trendData.forEach(item => {
      const hiltonVal = item.hilton !== undefined ? item.hilton : Infinity;
      const marriottVal = item.marriott !== undefined ? item.marriott : Infinity;
      
      if (hiltonVal < min) min = hiltonVal;
      if (marriottVal < min) min = marriottVal;
      
      if (item.hilton > max) max = item.hilton;
      if (item.marriott > max) max = item.marriott;
    });
    
    // Si min sigue siendo Infinity, significa que no hay datos válidos
    if (min === Infinity) min = 0;

    return { 
      minValue: Math.max(0, Math.floor(min) - 5), // Empezar 5 puntos por debajo del mínimo, pero no menos de 0
      maxValue: Math.ceil(max) + 5 // Añadir 5 puntos al máximo
    };
  }, [trendData]);

  if (trendData.length === 0) {
    return (
      <div className="p-4 bg-white rounded shadow-sm">
        <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
          Unaided Brand Awareness Over Time
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
        Unaided Brand Awareness Over Time
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
            {trendData.length > 0 && trendData[0].hilton !== undefined && (
              <Line 
                name="Hilton" 
                type="monotone" 
                dataKey="hilton" 
                stroke={colors.hiltonBlue} 
                {...lineConfig} 
              />
            )}
            {trendData.length > 0 && trendData[0].marriott !== undefined && (
              <Line 
                name="Marriott" 
                type="monotone" 
                dataKey="marriott" 
                stroke={colors.turquoise} 
                {...lineConfig}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AwarenessTrend;