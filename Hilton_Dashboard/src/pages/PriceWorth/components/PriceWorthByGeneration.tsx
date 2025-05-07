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
import { PriceWorthData } from '../../../types/data';
import { colors } from '../../../utils/colors';
import CustomTooltip from '../../../components/ui/CustomTooltip';

interface PriceWorthByGenerationProps {
  data: PriceWorthData[];
}

const PriceWorthByGeneration: React.FC<PriceWorthByGenerationProps> = ({ data }) => {
  const generationData = useMemo(() => {
    if (!data || data.length === 0) {
      console.log("No data available");
      return [];
    }

    // Filtrar solo los datos del último trimestre (Q4 2023)
    const latestData = data.filter(item => item.quarter === 'Q4 2023');
    console.log("Latest data:", latestData);
    
    // Agrupar por audiencia (generación)
    const generations = [...new Set(latestData.map(item => item.audience))];
    
    return generations.map(generation => {
      const generationData = latestData.filter(item => item.audience === generation);
      
      // Función para procesar valores porcentuales
      const processValue = (value: string | number): number => {
        if (typeof value === 'string') {
          // Remover el símbolo de porcentaje y convertir a número
          return parseFloat(value.replace('%', ''));
        }
        return value;
      };

      // Tomar el primer registro para cada generación (ya que solo debe haber uno por Q4 2023)
      const record = generationData[0];
      if (!record) return null;

      return {
        name: generation,
        hiltonPrice: processValue(record.hiltonPrice),
        hiltonWorth: processValue(record.hiltonWorth)
      };
    }).filter((item): item is { name: string; hiltonPrice: number; hiltonWorth: number } => item !== null);
  }, [data]);

  if (generationData.length === 0) {
    return (
      <div className="p-4 bg-white rounded shadow-sm">
        <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
          Price/Worth by generation (Q4 2023)
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  console.log("Generation data for chart:", generationData);

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Price/Worth by generation (Q4 2023)
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={generationData}
            margin={{ top: 20, right: 30, left: 20, bottom: 30 }}
          >
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6B7280', fontSize: 11 }} 
              axisLine={false}
              tickLine={false}
            />
            <YAxis 
              domain={[0, 70]} 
              tick={{ fill: '#6B7280', fontSize: 11 }} 
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '11px' }}
            />
            <Bar 
              name="Hilton Price" 
              dataKey="hiltonPrice" 
              fill={colors.priceWorth.hiltonPrice} 
              barSize={24}
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              name="Hilton Worth" 
              dataKey="hiltonWorth" 
              fill={colors.priceWorth.hiltonWorth} 
              barSize={24}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceWorthByGeneration;