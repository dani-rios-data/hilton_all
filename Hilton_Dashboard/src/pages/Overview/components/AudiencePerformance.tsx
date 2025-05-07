import React, { useMemo } from 'react';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { ConsiderationData } from '../../../types/data';
import { colors } from '../../../utils/colors';

interface AudiencePerformanceProps {
  data: ConsiderationData[];
}

const AudiencePerformance: React.FC<AudiencePerformanceProps> = ({ data }) => {
  const processedData = useMemo(() => {
    // Filtrar los datos para obtener solo Q4 2023
    const q4Data = data.filter(item => item.quarter === 'Q4 2023');
    
    // Obtener las distintas audiencias
    const audiences = Array.from(new Set(q4Data.map(item => item.audience)))
      .filter(Boolean) as string[];
      
    // Preparar los datos por audiencia
    return audiences.map(audience => {
      // Obtener datos de Hilton para esta audiencia
      const hiltonItem = q4Data.find(item => item.audience === audience && item.brand === 'Hilton');
      
      // Obtener datos de Marriott para esta audiencia
      const marriottItem = q4Data.find(item => item.audience === audience && item.brand === 'Marriott');
      
      // Convertir valores a números para el cálculo
      const hiltonValue = typeof hiltonItem?.value === 'number' ? hiltonItem.value : 0;
      const marriottValue = typeof marriottItem?.value === 'number' ? marriottItem.value : 0;
      
      return {
        audience,
        hilton: hiltonValue,
        marriott: marriottValue,
        difference: hiltonValue - marriottValue
      };
    });
  }, [data]);

  // Personalizar las etiquetas del tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md text-sm">
          <p className="font-medium text-gray-700">{data.audience}</p>
          <p className="text-[#002F61]">Hilton: {data.hilton}%</p>
          <p className="text-[#6B7280]">Marriott: {data.marriott}%</p>
          <p className={data.difference > 0 ? "text-green-600 font-medium" : "text-red-600 font-medium"}>
            Difference: {data.difference > 0 ? '+' : ''}{data.difference}%
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-[400px]">
      <h2 className="text-xl font-normal mb-6 text-[#002F61] font-['Georgia']">
        Consideration by Audience Segment: Hilton vs Marriott (Q4 2023)
      </h2>
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={processedData}>
            <PolarGrid stroke="#e0e0e0" />
            <PolarAngleAxis 
              dataKey="audience" 
              tick={{ fill: '#666', fontSize: 12 }} 
            />
            <PolarRadiusAxis 
              angle={30} 
              domain={[0, 'auto']} 
              tickFormatter={(value) => `${value}%`}
              tick={{ fontSize: 10 }}
            />
            <Radar 
              name="Hilton" 
              dataKey="hilton" 
              stroke={colors.hiltonBlue || "#002F61"} 
              fill={colors.hiltonBlue || "#002F61"} 
              fillOpacity={0.5} 
            />
            <Radar 
              name="Marriott" 
              dataKey="marriott" 
              stroke="#777777" 
              fill="#777777" 
              fillOpacity={0.3} 
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              iconType="circle" 
              align="center"
              verticalAlign="bottom"
              wrapperStyle={{ paddingTop: 20 }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AudiencePerformance;