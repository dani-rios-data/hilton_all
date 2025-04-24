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
import { ConsiderationData } from '../../../types/data';
import { colors } from '../../../utils/colors';
import CustomTooltip from '../../../components/ui/CustomTooltip';
import { lineConfig } from '../../../components/ui/ChartComponents';

interface ConsiderationTrendProps {
  data: ConsiderationData[];
}

const ConsiderationTrend: React.FC<ConsiderationTrendProps> = ({ data }) => {
  // Procesar datos reales del CSV
  const trendData = useMemo(() => {
    if (!data || data.length === 0) {
      console.log("No consideration data available");
      return [];
    }

    // Filtrar solo datos de Consideration
    const considerationData = data.filter(item => item.category === 'Consideration');
    
    // Obtener todos los trimestres únicos
    const quarters = [...new Set(considerationData.map(item => item.quarter))].sort();
    
    // Obtener todas las marcas únicas
    const brands = [...new Set(considerationData.map(item => item.brand))];
    
    // Crear datos para cada trimestre
    return quarters.map(quarter => {
      // Datos de base para este trimestre
      const quarterData: Record<string, any> = { name: quarter };
      
      // Para cada marca, calcular el valor promedio en ese trimestre
      brands.forEach(brand => {
        const brandData = considerationData.filter(
          item => item.quarter === quarter && item.brand === brand
        );
        
        if (brandData.length > 0) {
          // Calcular promedio
          const total = brandData.reduce((sum, item) => sum + item.value, 0);
          const average = Math.round(total / brandData.length);
          
          // Guardar en formato clave-valor donde la clave es el nombre de la marca en minúsculas
          quarterData[brand.toLowerCase()] = average;
        }
      });
      
      return quarterData;
    });
  }, [data]);

  // Calcular los valores mínimo y máximo para ajustar el dominio del eje Y
  const { minValue, maxValue } = useMemo(() => {
    if (!trendData || trendData.length === 0) return { minValue: 0, maxValue: 100 };
    
    let min = Infinity;
    let max = 0;

    trendData.forEach(item => {
      Object.keys(item).forEach(key => {
        if (key !== 'name') {
          const value = item[key];
          if (value < min) min = value;
          if (value > max) max = value;
        }
      });
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
          Consideration trend
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available
        </div>
      </div>
    );
  }
  
  console.log("Processed consideration trend data:", trendData);

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Consideration trend
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
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ paddingTop: '10px' }}
            />
            {trendData.length > 0 && trendData[0].hilton !== undefined && (
              <Line 
                name="Hilton" 
                type="monotone" 
                dataKey="hilton" 
                stroke={colors.competitors.hilton} 
                {...lineConfig}
              />
            )}
            {trendData.length > 0 && trendData[0].marriott !== undefined && (
              <Line 
                name="Marriott" 
                type="monotone" 
                dataKey="marriott" 
                stroke={colors.competitors.marriott} 
                {...lineConfig}
              />
            )}
            {trendData.length > 0 && trendData[0].hyatt !== undefined && (
              <Line 
                name="Hyatt" 
                type="monotone" 
                dataKey="hyatt" 
                stroke={colors.competitors.hyatt} 
                {...lineConfig}
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ConsiderationTrend;