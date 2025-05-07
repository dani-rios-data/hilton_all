import React, { useMemo, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  LabelList
} from 'recharts';
import { ProofOfPointData } from '../../../types/data';
import { colors } from '../../../utils/colors';

interface TopCountriesProps {
  data: ProofOfPointData[];
}

// Componente personalizado para el tooltip
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border border-blue-100 rounded-lg shadow-md min-w-[90px]">
        <p className="text-xs font-medium text-gray-700 mb-1">{payload[0].payload.name}</p>
        <div className="flex items-center space-x-1">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: colors.hiltonBlue }}></div>
          <p className="text-lg font-bold" style={{ color: colors.hiltonBlue, letterSpacing: '0.5px' }}>
            {(payload[0].value * 100).toFixed(0)}%
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const TopCountries: React.FC<TopCountriesProps> = ({ data }) => {
  // Estado para el subcategory seleccionado
  const [selectedMetric, setSelectedMetric] = useState<string>('Is a brand I trust');
  
  // Obtener métricas disponibles
  const metrics = useMemo(() => {
    if (!data || data.length === 0) return [];
    const uniqueMetrics = Array.from(new Set(
      data
        .filter(item => item.category === 'Hilton satisfaction')
        .map(item => item.subcategory)
        .filter(Boolean) as string[]
    ));
    return uniqueMetrics;
  }, [data]);

  // Procesamos los datos para obtener el rendimiento por país
  const countryData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Filtramos por Hilton satisfaction y el subcategory seleccionado
    const filteredData = data.filter(item => 
      item.category === 'Hilton satisfaction' && 
      item.subcategory === selectedMetric
    );

    // Agrupamos los datos por país
    const countries = new Map<string, { total: number, count: number, countryName: string }>();
    
    filteredData.forEach(item => {
      if (item.country) {
        const country = item.country;
        if (!countries.has(country)) {
          countries.set(country, { 
            total: 0, 
            count: 0, 
            countryName: item["country"] || item.country
          });
        }
        
        const current = countries.get(country)!;
        current.total += item.value;
        current.count += 1;
      }
    });

    // Calculamos el promedio para cada país
    const averages = Array.from(countries.entries()).map(([code, stats]) => ({
      code: code,
      name: stats.countryName || code,
      value: stats.count > 0 ? stats.total / stats.count : 0
    }));

    // Ordenamos por valor descendente
    return averages.sort((a, b) => b.value - a.value);
  }, [data, selectedMetric]);

  if (countryData.length === 0) {
    return (
      <div className="p-4 bg-white rounded shadow-sm">
        <h3 className="mb-3 text-lg font-serif" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
          Hilton Satisfaction by Country and Feature
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available.
        </div>
      </div>
    );
  }

  // Encontramos el valor máximo para establecer el dominio
  const maxValue = Math.max(...countryData.map(item => item.value));
  const yDomain = [0, Math.ceil(maxValue * 10) / 10]; // Redondeamos a la décima superior

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-serif" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
          Hilton Satisfaction by Country and Feature
        </h3>
        <div className="relative">
          <select 
            className="block w-64 pl-3 pr-10 py-2 text-xs text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all appearance-none"
            value={selectedMetric}
            onChange={(e) => setSelectedMetric(e.target.value)}
          >
            {metrics.map(metric => (
              <option key={metric} value={metric} className="text-xs">
                {metric}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-600">
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
            </svg>
          </div>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={countryData}
            margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
            barSize={35}
          >
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#4B5563', fontSize: 12, fontWeight: 500 }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={false}
              height={40}
              padding={{ left: 10, right: 10 }}
            />
            <YAxis 
              domain={yDomain} 
              tickFormatter={value => `${(value * 100).toFixed(0)}%`} 
              tick={{ fill: '#6B7280', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(224, 231, 255, 0.2)' }} />
            <Bar 
              dataKey="value" 
              fill={colors.hiltonBlue} 
              radius={[4, 4, 0, 0]}
              animationDuration={800}
            >
              <LabelList 
                dataKey="value" 
                position="top" 
                formatter={(value: number) => `${(value * 100).toFixed(0)}%`}
                style={{ fill: '#4B5563', fontSize: '12px', fontWeight: 600 }}
                offset={5}
              />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopCountries;