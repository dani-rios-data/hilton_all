import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { AwarenessData } from '../../../types/data';
import { colors } from '../../../utils/colors';
import CustomTooltip from '../../../components/ui/CustomTooltip';

interface AudienceAwarenessProps {
  data: AwarenessData[];
}

const AudienceAwareness: React.FC<AudienceAwarenessProps> = ({ data }) => {
  const audienceData = useMemo(() => {
    if (!data || data.length === 0) {
      console.log("No awareness data available for audience chart");
      return [];
    }

    // Filtrar los datos más recientes (Q4 2023) y solo Unaided Awareness
    const latestQuarter = 'Q4 2023';
    const awarenessData = data.filter(
      item => item.quarter === latestQuarter && 
      item.category === 'Unaided Awareness'
    );
    
    // Obtener todas las audiencias únicas
    const audiences = [...new Set(awarenessData
      .filter(item => item.audience)
      .map(item => item.audience)
    )];

    // Procesar datos por audiencia
    return audiences.map(audience => {
      const audienceData = awarenessData.filter(item => item.audience === audience);
      
      // Procesar datos de Hilton
      const hiltonData = audienceData.find(item => item.brand === 'Hilton');
      const hiltonValue = hiltonData ? 
        (typeof hiltonData.value === 'string' ? 
          parseFloat(String(hiltonData.value).replace('%', '')) : 
          hiltonData.value) : 0;

      // Procesar datos de Marriott
      const marriottData = audienceData.find(item => item.brand === 'Marriott');
      const marriottValue = marriottData ? 
        (typeof marriottData.value === 'string' ? 
          parseFloat(String(marriottData.value).replace('%', '')) : 
          marriottData.value) : 0;

      return {
        name: audience,
        hilton: Math.round(hiltonValue),
        marriott: Math.round(marriottValue)
      };
    });
  }, [data]);

  // Calcular el valor máximo para ajustar el dominio del eje Y
  const maxValue = useMemo(() => {
    if (!audienceData || audienceData.length === 0) return 100;
    
    let max = 0;
    audienceData.forEach(item => {
      if (item.hilton > max) max = item.hilton;
      if (item.marriott > max) max = item.marriott;
    });
    
    return Math.ceil(max) + 5; // Añadir 5 puntos al máximo
  }, [audienceData]);

  if (audienceData.length === 0) {
    return (
      <div className="p-4 bg-white rounded shadow-sm">
        <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
          Awareness by Generation
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
        Awareness by Generation
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={audienceData}
            margin={{ top: 10, right: 30, left: 0, bottom: 25 }}
          >
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6B7280', fontSize: 12 }}
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
            <Bar 
              name="Hilton" 
              dataKey="hilton" 
              fill={colors.hiltonBlue}
              barSize={24}
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
            <Bar 
              name="Marriott" 
              dataKey="marriott" 
              fill={colors.turquoise}
              barSize={24}
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AudienceAwareness;