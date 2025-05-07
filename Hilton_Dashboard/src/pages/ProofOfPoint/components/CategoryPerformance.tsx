import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  Tooltip,
  LabelList,
  Cell
} from 'recharts';
import { ProofOfPointData } from '../../../types/data';
import { colors, pieColors } from '../../../utils/colors';

interface CategoryPerformanceProps {
  data: ProofOfPointData[];
}

// Componente personalizado para el tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-blue-100 rounded-lg shadow-md min-w-[90px]">
        <p className="text-xs font-medium text-gray-700 mb-1">{payload[0].payload.name}</p>
        <p className="text-lg font-bold" style={{ color: payload[0].payload.fill, letterSpacing: '0.5px' }}>
          {(payload[0].value * 100).toFixed(0)}%
        </p>
      </div>
    );
  }
  return null;
};

const CategoryPerformance: React.FC<CategoryPerformanceProps> = ({ data }) => {
  // Procesamos los datos del CSV para obtener el rendimiento por categoría
  const categoryData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Agrupamos los datos por categoría y calculamos el promedio
    // Solo consideramos las filas con Category = 'Hilton satisfaction'
    const filteredData = data.filter(item => item.category === 'Hilton satisfaction');
    const subCategories = new Map<string, { total: number, count: number }>();
    
    filteredData.forEach(item => {
      if (item.subcategory) {
        const subcategory = item.subcategory;
        if (!subCategories.has(subcategory)) {
          subCategories.set(subcategory, { total: 0, count: 0 });
        }
        
        const current = subCategories.get(subcategory)!;
        current.total += item.value;
        current.count += 1;
      }
    });

    // Convertimos el mapa a un array para el gráfico y ordenamos por valor
    return Array.from(subCategories.entries())
      .map(([name, stats]) => ({
        name: name,
        value: stats.count > 0 ? stats.total / stats.count : 0
      }))
      .sort((a, b) => b.value - a.value);
  }, [data]);

  if (categoryData.length === 0) {
    return (
      <div className="p-4 bg-white rounded shadow-sm">
        <h3 className="mb-3 text-lg font-serif" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
          Hilton Satisfaction by Feature (Global Average %)
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available.
        </div>
      </div>
    );
  }

  // Encontramos el valor máximo para establecer el dominio
  const maxValue = Math.max(...categoryData.map(item => item.value));
  const xDomain = [0, Math.ceil(maxValue * 10) / 10]; // Redondeamos a la décima superior

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg font-serif" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Hilton Satisfaction by Feature (Global Average %)
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={categoryData}
            layout="vertical"
            margin={{ top: 5, right: 50, left: 170, bottom: 5 }}
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
              width={170} 
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
              {categoryData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={pieColors[index % pieColors.length]} 
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

export default CategoryPerformance;