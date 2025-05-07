import React, { useMemo, useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  LabelList,
  Cell,
  ReferenceLine
} from 'recharts';
import { ProofOfPointData } from '../../../types/data';
import { colors } from '../../../utils/colors';

interface FeatureImportanceProps {
  data: ProofOfPointData[];
}

// Componente personalizado para renderizar etiquetas condicionales
const renderCustomizedLabel = (props: any) => {
  const { x, y, width, height, value, index, viewBox } = props;
  
  const isNegative = value < 0;
  const absValue = Math.abs(value * 100).toFixed(1);
  const formattedValue = `${absValue}%`;
  
  // Para valores negativos, colocar las etiquetas a la derecha de las barras
  // Para valores positivos, también a la derecha de las barras
  // De esta forma todas las etiquetas están alineadas a la derecha
  const xPosition = x + width + 10;
  
  return (
    <text 
      x={xPosition} 
      y={y + height / 2} 
      fill="#4B5563" 
      textAnchor="start"
      dominantBaseline="middle"
      fontSize="12"
      fontWeight="600"
    >
      {formattedValue}
    </text>
  );
};

// Componente personalizado para tooltip que muestra valores absolutos y signo
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    const isNegative = value < 0;
    const absValue = Math.abs(value * 100).toFixed(1);
    
    return (
      <div className="bg-white p-2 border border-blue-100 rounded-lg shadow-md min-w-[120px]">
        <p className="text-xs font-medium text-gray-700 mb-1">{label}</p>
        <div className="flex items-center">
          {isNegative && <span className="text-red-600 mr-1">-</span>}
          <p className={`text-lg font-bold ${isNegative ? 'text-red-600' : 'text-blue-800'}`}>
            {absValue}%
          </p>
        </div>
      </div>
    );
  }
  return null;
};

const FeatureImportance: React.FC<FeatureImportanceProps> = ({ data }) => {
  // States for the filters
  const [selectedCategory, setSelectedCategory] = useState<string>('General hotel feature importance');
  const [selectedCountry, setSelectedCountry] = useState<string>('All Countries');

  // Extract unique categories and countries for the filters
  const categories = useMemo(() => {
    if (!data || data.length === 0) return [];
    const uniqueCategories = Array.from(new Set(data.map(item => item.category).filter(Boolean) as string[]));
    return uniqueCategories;
  }, [data]);

  const countries = useMemo(() => {
    if (!data || data.length === 0) return [];
    const uniqueCountries = Array.from(new Set(data.map(item => item.country).filter(Boolean) as string[]));
    return ['All Countries', ...uniqueCountries];
  }, [data]);

  // Process data based on selected filters
  const featureData = useMemo(() => {
    if (!data || data.length === 0) return [];

    // Filter data based on selected category and country
    let filteredData = data.filter(item => item.category === selectedCategory);
    
    if (selectedCountry !== 'All Countries') {
      filteredData = filteredData.filter(item => item.country === selectedCountry);
    }

    // Group by subcategory
    const features = new Map<string, { total: number, count: number }>();
    
    filteredData.forEach(item => {
      if (item.subcategory) {
        const subcategory = item.subcategory;
        if (!features.has(subcategory)) {
          features.set(subcategory, { total: 0, count: 0 });
        }
        
        const current = features.get(subcategory)!;
        current.total += item.value;
        current.count += 1;
      }
    });

    // Calculate averages and format for chart
    const result = Array.from(features.entries())
      .map(([name, stats]) => ({
        name: name,
        value: stats.count > 0 ? stats.total / stats.count : 0
      }))
      .sort((a, b) => b.value - a.value);

    return result;
  }, [data, selectedCategory, selectedCountry]);

  // Key metrics to display
  const keyMetrics = useMemo(() => {
    if (featureData.length === 0) return null;
    
    const topFeature = featureData[0];
    const avgValue = featureData.reduce((sum, item) => sum + item.value, 0) / featureData.length;
    const difference = featureData.length > 1 ? topFeature.value - featureData[1].value : 0;
    
    return {
      topFeature: topFeature.name,
      topValue: topFeature.value,
      averageValue: avgValue,
      differenceToSecond: difference
    };
  }, [featureData]);

  if (!data || data.length === 0) {
    return (
      <div className="p-5 bg-white rounded-lg shadow-sm">
        <h3 className="mb-3 text-xl font-serif tracking-tight" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
          Feature Importance
        </h3>
        <div className="h-48 flex items-center justify-center text-gray-500">
          No data available.
        </div>
      </div>
    );
  }

  // Calculate min and max values for chart domain
  const maxValue = Math.max(...featureData.map(item => item.value));
  const minValue = Math.min(...featureData.map(item => item.value));
  
  // Configurar el dominio para que sea simétrico alrededor de cero si hay valores negativos
  const maxAbsValue = Math.max(Math.abs(minValue), maxValue);
  const chartDomain = minValue < 0 
    ? [-maxAbsValue * 1.2, maxAbsValue * 1.2] // Dominio simétrico con 20% extra
    : [0, Math.ceil(maxValue * 10) / 10 * 1.1]; // Solo positivos

  return (
    <div className="p-5 bg-white rounded-lg shadow-sm">
      <h3 className="mb-4 text-xl font-serif tracking-tight" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Perceived Importance of Hotel Features (by Category & Country)
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left Side: Filters and Chart */}
        <div className="bg-white rounded-lg">
          {/* Filters */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <div className="relative">
                <select 
                  className="block w-full pl-3 pr-10 py-2 text-xs text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs transition-all appearance-none"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  {categories.map(category => (
                    <option key={category} value={category} className="text-xs">
                      {category}
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
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <div className="relative">
                <select 
                  className="block w-full pl-3 pr-10 py-2 text-xs text-gray-700 bg-white border border-gray-200 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-xs transition-all appearance-none"
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                >
                  {countries.map(country => (
                    <option key={country} value={country} className="text-xs">
                      {country}
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
          </div>
          
          {/* Chart */}
          <div className="h-[22rem]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={featureData}
                layout="vertical"
                margin={{ top: 5, right: 120, left: 220, bottom: 5 }}
                barSize={18}
              >
                <XAxis 
                  type="number" 
                  domain={chartDomain}
                  tickFormatter={(value) => `${Math.abs(value * 100).toFixed(0)}%`}
                  tick={{ fill: '#6B7280', fontSize: 12 }}
                  axisLine={{ stroke: '#E5E7EB' }}
                  tickLine={{ stroke: '#E5E7EB' }}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  tick={{ fill: '#4B5563', fontSize: 12, fontWeight: 500 }}
                  width={220}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(224, 231, 255, 0.2)' }} />
                <ReferenceLine x={0} stroke="#E5E7EB" strokeWidth={2} />
                <Bar 
                  dataKey="value" 
                  radius={[0, 6, 6, 0]}
                  animationDuration={800}
                  animationBegin={0}
                >
                  {featureData.map((entry, index) => {
                    // Usar colores diferentes para valores positivos y negativos
                    const isNegative = entry.value < 0;
                    
                    // Paletas de colores
                    const positiveColors = [
                      '#003D7C', // Hilton dark blue for top item
                      '#0C57A6',
                      '#2171D0',
                      '#4585D6',
                      '#6A9ADB',
                      '#8EACE2'
                    ];
                    
                    const negativeColors = [
                      '#C82333', // Rojo oscuro para valores negativos
                      '#E63946',
                      '#FF4D6D'
                    ];
                    
                    const barColor = isNegative
                      ? negativeColors[Math.min(index, negativeColors.length - 1)]
                      : positiveColors[Math.min(index, positiveColors.length - 1)];
                    
                    return (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={barColor}
                        style={{ filter: index === 0 ? 'drop-shadow(0 0 3px rgba(0, 61, 124, 0.3))' : 'none' }}
                      />
                    );
                  })}
                  <LabelList 
                    dataKey="value" 
                    content={renderCustomizedLabel}
                  />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        
        {/* Right Side: Key Insights */}
        {keyMetrics && (
          <div className="h-full bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-100 shadow-sm flex flex-col justify-center p-6">
            <h4 className="text-lg font-serif text-gray-700 mb-5">Key Insights</h4>
            
            <div className="flex-grow flex flex-col justify-center space-y-6">
              <div className="space-y-1">
                <h5 className="text-sm font-medium text-gray-500">Top Feature</h5>
                <p className="text-lg font-bold text-blue-900">
                  {keyMetrics.topFeature}
                </p>
                <p className="text-3xl font-bold" style={{ color: '#003D7C' }}>
                  {(keyMetrics.topValue * 100).toFixed(1)}%
                </p>
              </div>
              
              <div className="space-y-1 pt-4 border-t border-gray-100">
                <h5 className="text-sm font-medium text-gray-500">Category Average</h5>
                <p className="text-2xl font-semibold" style={{ color: colors.turquoise }}>
                  {(keyMetrics.averageValue * 100).toFixed(1)}%
                </p>
              </div>
              
              <div className="space-y-1 pt-4 border-t border-gray-100">
                <h5 className="text-sm font-medium text-gray-500">Lead over 2nd Place</h5>
                <p className={`text-2xl font-semibold ${keyMetrics.differenceToSecond > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {keyMetrics.differenceToSecond > 0 ? '+' : ''}{(keyMetrics.differenceToSecond * 100).toFixed(1)}%
                </p>
              </div>
            </div>
            
            {selectedCountry !== 'All Countries' && (
              <div className="mt-4 pt-4 border-t border-gray-100 text-sm text-gray-600">
                <p>Filtered data for:</p>
                <p className="font-semibold text-gray-800">{selectedCountry}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureImportance;