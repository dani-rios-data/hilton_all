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

  // Calcular el valor máximo para ajustar el dominio del eje Y
  const maxValue = useMemo(() => {
    if (!trendData || trendData.length === 0) return 100;
    
    let max = 0;
    trendData.forEach(item => {
      if (item.hilton > max) max = item.hilton;
      if (item.marriott > max) max = item.marriott;
    });
    
    return Math.ceil(max) + 5; // Añadir 5 puntos al máximo
  }, [trendData]);

  if (trendData.length === 0) {
    return (
      <div className="p-4 bg-white rounded shadow-sm">
        <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
          Awareness Trend
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
        Awareness Trend
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
              domain={[0, maxValue]} 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB', strokeWidth: 1 }}
              tickLine={{ stroke: '#E5E7EB' }}
              tickCount={6}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ paddingTop: '10px' }}
            />
            <Line 
              name="Hilton" 
              type="monotone" 
              dataKey="hilton" 
              stroke={colors.hiltonBlue}
              strokeWidth={3}
              dot={{ r: 5, fill: colors.hiltonBlue }}
              activeDot={{ r: 7 }}
              animationDuration={1500}
            />
            <Line 
              name="Marriott" 
              type="monotone" 
              dataKey="marriott" 
              stroke={colors.turquoise}
              strokeWidth={3}
              dot={{ r: 5, fill: colors.turquoise }}
              activeDot={{ r: 7 }}
              animationDuration={1500}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AwarenessTrend;