import React, { useMemo, useState } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { PriceWorthData } from '../../../types/data';
import { colors } from '../../../utils/colors';
import CustomTooltip from '../../../components/ui/CustomTooltip';
import { lineConfig } from '../../../components/ui/ChartComponents';

interface HiltonPriceWorthByGenerationProps {
  data: PriceWorthData[];
}

const GENERATIONS = ['Millennials', 'Gen X', 'Boomers'];

const HiltonPriceWorthByGeneration: React.FC<HiltonPriceWorthByGenerationProps> = ({ data }) => {
  const [selectedMetric, setSelectedMetric] = useState<'price' | 'worth'>('price');

  const trendData = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }

    // Obtener trimestres únicos y ordenarlos cronológicamente
    const quarters = [...new Set(data.map(item => item.quarter))]
      .sort((a, b) => {
        const [yearA, qA] = a.split(' ');
        const [yearB, qB] = b.split(' ');
        return yearA.localeCompare(yearB) || qA.localeCompare(qB);
      });
    
    // Función para procesar valores porcentuales
    const processValue = (value: string | number): number => {
      if (typeof value === 'string') {
        return parseFloat(value.replace('%', ''));
      }
      return value;
    };

    return quarters.map(quarter => {
      const result: { name: string } & { [key: string]: string | number } = { name: quarter };
      
      // Añadir datos por generación
      GENERATIONS.forEach(generation => {
        const generationData = data.find(item => item.quarter === quarter && item.audience === generation);
        if (generationData) {
          result[`${generation}`] = processValue(
            selectedMetric === 'price' ? generationData.hiltonPrice : generationData.hiltonWorth
          );
        }
      });
      
      return result;
    });
  }, [data, selectedMetric]);

  // Calcular los valores mínimos y máximos para el eje Y
  const { minValue, maxValue } = useMemo(() => {
    if (trendData.length === 0) {
      return { minValue: 0, maxValue: 70 };
    }

    let min = Number.MAX_SAFE_INTEGER;
    let max = Number.MIN_SAFE_INTEGER;

    trendData.forEach(item => {
      GENERATIONS.forEach(generation => {
        const value = Number(item[generation]) || 0;
        min = Math.min(min, value);
        max = Math.max(max, value);
      });
    });

    // Ajustar para que estén 5 puntos por debajo/encima
    return {
      minValue: Math.max(0, min - 5), // No permitir valores negativos
      maxValue: max + 5
    };
  }, [trendData]);

  if (trendData.length === 0) {
    return (
      <div className="p-4 bg-white rounded shadow-sm">
        <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
          Hilton {selectedMetric === 'price' ? 'Price' : 'Worth'} Over Time by Generation
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
          Hilton {selectedMetric === 'price' ? 'Price' : 'Worth'} Over Time by Generation
        </h3>
        <div className="flex space-x-2">
          <button
            className={`px-3 py-1 text-sm rounded ${
              selectedMetric === 'price' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setSelectedMetric('price')}
          >
            Price
          </button>
          <button
            className={`px-3 py-1 text-sm rounded ${
              selectedMetric === 'worth' ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-700'
            }`}
            onClick={() => setSelectedMetric('worth')}
          >
            Worth
          </button>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trendData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6B7280', fontSize: 11 }}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis 
              domain={[minValue, maxValue]} 
              tick={{ fill: '#6B7280', fontSize: 11 }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip 
              content={<CustomTooltip />}
              formatter={(value: number) => [`${value}%`]}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '11px' }}
            />
            {GENERATIONS.map((generation, index) => (
              <Line 
                key={generation}
                name={generation} 
                type="monotone" 
                dataKey={generation} 
                stroke={[colors.hiltonBlue, colors.turquoise, colors.teal][index % 3]} 
                {...lineConfig}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default HiltonPriceWorthByGeneration; 