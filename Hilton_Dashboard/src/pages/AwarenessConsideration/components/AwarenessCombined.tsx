import React, { useMemo } from 'react';
import { 
  ComposedChart, 
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

interface AwarenessCombinedProps {
  data: AwarenessData[];
  considerationData?: any[];
}

const AwarenessCombined: React.FC<AwarenessCombinedProps> = ({ data, considerationData = [] }) => {
  const combinedData = useMemo(() => {
    if (!data || data.length === 0) {
      console.log("No awareness data available for combined chart");
      return [];
    }

    // Filtrar los datos más recientes (Q4 2023)
    const latestQuarter = 'Q4 2023';
    const awarenessData = data.filter(
      item => item.quarter === latestQuarter && 
      item.category === 'Unaided Awareness'
    );
    
    // Procesar datos para Hilton y Marriott
    const brands = ['Hilton', 'Marriott'];
    
    return brands.map(brand => {
      // Calcular el promedio de awareness para esta marca
      const brandAwareness = awarenessData.filter(item => item.brand === brand);
      let awarenessValue = 0;
      
      if (brandAwareness.length > 0) {
        const awarenessValues = brandAwareness.map(item => {
          if (typeof item.value === 'string') {
            return parseFloat(String(item.value).replace('%', ''));
          }
          return item.value;
        });
        
        awarenessValue = Math.round(
          awarenessValues.reduce((sum, val) => sum + val, 0) / awarenessValues.length
        );
      }
      
      // Calcular el promedio de consideration para esta marca
      let considerationValue = 0;
      
      if (considerationData && considerationData.length > 0) {
        const brandConsideration = considerationData.filter(
          item => item.brand === brand && 
          item.quarter === latestQuarter &&
          item.category === 'Consideration'
        );
        
        if (brandConsideration.length > 0) {
          const considerationValues = brandConsideration.map(item => {
            if (typeof item.value === 'string') {
              return parseFloat(String(item.value).replace('%', ''));
            }
            return item.value;
          });
          
          considerationValue = Math.round(
            considerationValues.reduce((sum, val) => sum + val, 0) / considerationValues.length
          );
        }
      }
      
      return {
        name: brand,
        awareness: awarenessValue,
        consideration: considerationValue
      };
    });
  }, [data, considerationData]);

  // Calcular el valor máximo para ajustar el dominio del eje Y
  const maxValue = useMemo(() => {
    if (!combinedData || combinedData.length === 0) return 100;
    
    let max = 0;
    combinedData.forEach(item => {
      if (item.awareness > max) max = item.awareness;
      if (item.consideration > max) max = item.consideration;
    });
    
    return Math.ceil(max) + 5; // Añadir 5 puntos al máximo
  }, [combinedData]);

  if (combinedData.length === 0) {
    return (
      <div className="p-4 bg-white rounded shadow-sm">
        <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
          Brand Awareness & Consideration Comparison (Q4 2023)
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
        Brand Awareness & Consideration Comparison (Q4 2023)
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            data={combinedData}
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
              height={24}
              iconType="circle"
              wrapperStyle={{ paddingTop: '8px', fontSize: '11px' }}
            />
            <Bar 
              name="Awareness" 
              dataKey="awareness" 
              fill={colors.turquoise}
              barSize={30} 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
            <Bar 
              name="Consideration" 
              dataKey="consideration" 
              fill={colors.teal}
              barSize={30} 
              radius={[4, 4, 0, 0]}
              animationDuration={1500}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AwarenessCombined;