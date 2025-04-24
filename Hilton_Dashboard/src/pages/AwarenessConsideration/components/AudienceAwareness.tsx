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
  // Procesar datos reales del CSV
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
      .filter(item => item.audience) // Asegurarse de que audience exista
      .map(item => item.audience)
    )];
    
    // Obtener marcas principales para comparar (por ejemplo, Hilton y Marriott)
    const targetBrands = ['Hilton', 'Marriott']; 
    const brands = awarenessData
      .map(item => item.brand)
      .filter(brand => targetBrands.includes(brand));
    
    const uniqueBrands = [...new Set(brands)];
    
    // Procesar datos para cada audiencia
    return audiences.map(audience => {
      // Objeto base con el nombre de la audiencia
      const audienceItem: Record<string, any> = { name: audience };
      
      // Para cada marca principal, calcular el promedio por audiencia
      uniqueBrands.forEach(brand => {
        const brandAudienceData = awarenessData.filter(
          item => item.brand === brand && item.audience === audience
        );
        
        if (brandAudienceData.length > 0) {
          const values = brandAudienceData.map(item => {
            // Convertir valor de string (si viene con %) a número
            if (typeof item.value === 'string') {
              const str = item.value as string;
              return parseFloat(str.replace('%', ''));
            }
            return item.value;
          });
          
          const total = values.reduce((sum, val) => sum + val, 0);
          const average = Math.round(total / values.length);
          
          // Guardar en formato clave-valor donde la clave es el nombre de la marca en minúsculas
          audienceItem[brand.toLowerCase()] = average;
        }
      });
      
      return audienceItem;
    }).filter(item => Object.keys(item).length > 1); // Filtrar items que no tengan datos de marcas
  }, [data]);

  // Calcular el valor máximo para ajustar el dominio del eje Y
  const maxValue = useMemo(() => {
    if (audienceData.length === 0) return 100;
    
    let max = 0;
    audienceData.forEach(item => {
      Object.keys(item).forEach(key => {
        if (key !== 'name' && item[key] > max) {
          max = item[key];
        }
      });
    });
    
    return Math.ceil(max) + 5; // Añadir 5 puntos al máximo
  }, [audienceData]);

  if (audienceData.length === 0) {
    return (
      <div className="p-4 bg-white rounded shadow-sm">
        <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
          Awareness by audience
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available
        </div>
      </div>
    );
  }
  
  console.log("Processed audience awareness data:", audienceData);

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Awareness by audience
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
            {audienceData.length > 0 && audienceData[0].hilton !== undefined && (
              <Bar 
                name="Hilton" 
                dataKey="hilton" 
                fill={colors.competitors.hilton}
                barSize={24}
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            )}
            {audienceData.length > 0 && audienceData[0].marriott !== undefined && (
              <Bar 
                name="Marriott" 
                dataKey="marriott" 
                fill={colors.competitors.marriott}
                barSize={24}
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
              />
            )}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AudienceAwareness;