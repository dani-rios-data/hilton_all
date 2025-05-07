import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Tooltip, 
  Cell,
  LabelList
} from 'recharts';
import { ProofOfPointData } from '../../../types/data';
import { colors } from '../../../utils/colors';

interface AudiencePerformanceProps {
  data: ProofOfPointData[];
}

// Componente personalizado para el tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-blue-100 rounded-lg shadow-md min-w-[90px]">
        <p className="text-xs font-medium text-gray-700 mb-1">{payload[0].payload.name}</p>
        <p className="text-lg font-bold" style={{ color: payload[0].payload.fill || colors.hiltonBlue, letterSpacing: '0.5px' }}>
          {(payload[0].value * 100).toFixed(0)}%
        </p>
      </div>
    );
  }
  return null;
};

const AudiencePerformance: React.FC<AudiencePerformanceProps> = ({ data }) => {
  // Procesamos los datos para obtener el rendimiento por audiencia
  const audienceData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Filtrar por categoría "Hilton satisfaction" para obtener solo datos de satisfacción
    const filteredData = data.filter(item => 
      item.category === 'Hilton satisfaction' && 
      item.audience && 
      item.subcategory === 'Is a brand I trust' // Usar un subcategory específico para comparación más clara
    );

    // Agrupamos los datos por audiencia
    const audiences = new Map<string, { total: number, count: number }>();
    
    filteredData.forEach(item => {
      if (item.audience) {
        const audience = item.audience;
        if (!audiences.has(audience)) {
          audiences.set(audience, { total: 0, count: 0 });
        }
        
        const current = audiences.get(audience)!;
        current.total += item.value;
        current.count += 1;
      }
    });

    // Calculamos el promedio para cada audiencia
    const result = Array.from(audiences.entries())
      .map(([name, stats]) => ({
        name: name,
        value: stats.count > 0 ? stats.total / stats.count : 0
      }))
      .sort((a, b) => b.value - a.value); // Ordenar de mayor a menor

    return result;
  }, [data]);

  if (audienceData.length === 0) {
    return (
      <div className="p-4 bg-white rounded shadow-sm">
        <h3 className="mb-3 text-lg font-serif" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
          Trust in Hilton by Audience Segment
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available.
        </div>
      </div>
    );
  }

  // Encontramos el valor máximo para establecer el dominio
  const maxValue = Math.max(...audienceData.map(item => item.value));
  const xDomain = [0, Math.ceil(maxValue * 10) / 10]; // Redondeamos a la décima superior

  // Colores para las barras basados en el valor
  const barColors = [
    colors.hiltonBlue,
    colors.turquoise,
    '#4585D6',
    '#6A9ADB',
    '#8EACE2'
  ];

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg font-serif" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Trust in Hilton by Audience Segment
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={audienceData}
            layout="vertical"
            margin={{ top: 5, right: 50, left: 80, bottom: 5 }}
          >
            <XAxis 
              type="number" 
              domain={xDomain} 
              tickFormatter={value => `${(value * 100).toFixed(0)}%`} 
              tick={{ fill: '#6B7280', fontSize: 11 }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={false}
              stroke="#E5E7EB"
              opacity={0.8}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              width={80} 
              tick={{ fill: '#4B5563', fontSize: 12, fontWeight: 500 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(224, 231, 255, 0.2)' }} />
            <Bar 
              dataKey="value" 
              barSize={20}
              radius={[0, 6, 6, 0]}
              animationDuration={800}
              animationBegin={0}
              background={{ fill: '#F9FAFB' }}
            >
              {audienceData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={barColors[Math.min(index, barColors.length - 1)]}
                  style={{
                    filter: index === 0 ? 'drop-shadow(0px 2px 4px rgba(0, 47, 97, 0.25))' : 'none',
                  }}
                />
              ))}
              <LabelList 
                dataKey="value" 
                position="right" 
                formatter={(value: number) => `${(value * 100).toFixed(0)}%`}
                style={{ fill: '#4B5563', fontSize: '12px', fontWeight: 600 }}
                offset={10}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AudiencePerformance;