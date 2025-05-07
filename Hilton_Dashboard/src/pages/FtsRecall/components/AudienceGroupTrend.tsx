import React, { useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { FtsRecallData } from '../../../types/data';
import { colors } from '../../../utils/colors';
import CustomTooltip from '../../../components/ui/CustomTooltip';
import { lineConfig } from '../../../components/ui/ChartComponents';

interface AudienceGroupTrendProps {
  data: FtsRecallData[];
}

// Interfaz para los datos procesados
interface ProcessedTrendData {
  quarter: string;
  Millennials?: number;
  "Gen X"?: number;
  Boomers?: number;
  Total?: number;
}

// Helper para ordenar trimestres
const quarterOrder = { 'Q1': 1, 'Q2': 2, 'Q3': 3, 'Q4': 4 };
const sortQuarters = (a: string, b: string) => {
  const [yearA, qA] = a.split(' ');
  const [yearB, qB] = b.split(' ');
  if (yearA !== yearB) return parseInt(yearA) - parseInt(yearB);
  return quarterOrder[qA as keyof typeof quarterOrder] - quarterOrder[qB as keyof typeof quarterOrder];
};

const AudienceGroupTrend: React.FC<AudienceGroupTrendProps> = ({ data }) => {
  const trendData = useMemo((): ProcessedTrendData[] => {
    if (!data || data.length === 0) return [];

    const audienceGroups = ['Millennials', 'Gen X', 'Boomers', 'Total']; 
    const filteredData = data.filter(item => audienceGroups.includes(item.audience));

    // Agrupar por trimestre, asegurando que los valores sean números
    const groupedByQuarter: { [quarter: string]: { [audience: string]: number } } = {};
    filteredData.forEach(item => {
      if (!groupedByQuarter[item.quarter]) {
        groupedByQuarter[item.quarter] = {};
      }
      // Convertir a número, con 0 como fallback si no es válido
      const valueAsNumber = Number(item.value);
      groupedByQuarter[item.quarter][item.audience] = isNaN(valueAsNumber) ? 0 : valueAsNumber;
    });

    // Mapear a la interfaz ProcessedTrendData
    const result: ProcessedTrendData[] = Object.entries(groupedByQuarter).map(([quarter, values]) => ({
      quarter: quarter,
      Millennials: values.Millennials,
      "Gen X": values["Gen X"],
      Boomers: values.Boomers,
      Total: values.Total
    }));

    return result.sort((a, b) => sortQuarters(a.quarter, b.quarter));

  }, [data]);
  
  // Calcular dominio Y dinámico
  const yDomain = useMemo(() => {
      if (!trendData || trendData.length === 0) return [0, 70]; // Dominio por defecto
      
      let min = Infinity;
      let max = 0;

      trendData.forEach(item => {
          // Revisar todos los grupos de audiencia
          if (item.Millennials !== undefined) {
            if (item.Millennials < min) min = item.Millennials;
            if (item.Millennials > max) max = item.Millennials;
          }
          if (item["Gen X"] !== undefined) {
            if (item["Gen X"] < min) min = item["Gen X"];
            if (item["Gen X"] > max) max = item["Gen X"];
          }
          if (item.Boomers !== undefined) {
            if (item.Boomers < min) min = item.Boomers;
            if (item.Boomers > max) max = item.Boomers;
          }
          if (item.Total !== undefined) {
            if (item.Total < min) min = item.Total;
            if (item.Total > max) max = item.Total;
          }
      });
      
      // Si no se encontraron datos válidos, min seguirá siendo Infinity
      if (min === Infinity) min = 0;

      const minValue = Math.max(0, Math.floor(min) - 5); // -5 del mínimo, sin bajar de 0
      const maxValue = Math.ceil(max / 10) * 10 + 5; // +5 sobre el máximo redondeado

      return [minValue, maxValue]; // Devolver [min, max]
  }, [trendData]);

  if (trendData.length === 0) {
      return (
        <div className="p-4 bg-white rounded shadow-sm">
            <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
                Quarterly trend by audience group
            </h3>
            <div className="h-64 flex items-center justify-center text-gray-500">
                No trend data available.
            </div>
        </div>
      );
  }

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        FTS Association: Quarterly trend by audience group
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trendData} // Usar datos procesados
            margin={{ top: 5, right: 30, left: 20, bottom: 25 }}
          >
            {/* <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" /> */}
            <XAxis 
              dataKey="quarter" 
              type="category" 
              tick={{ fill: '#6B7280', fontSize: 11 }} // Reducir fuente
              padding={{ left: 20, right: 20 }}
            />
            <YAxis 
              tick={{ fill: '#6B7280', fontSize: 11 }}
              domain={yDomain}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '11px' }} iconType="circle" /> {/* Ajustar leyenda */}
            
            {/* Total data */}
            <Line 
              name="Total"
              type="monotone" 
              dataKey="Total" 
              stroke="#333333" 
              strokeDasharray="5 5"
              {...lineConfig}
            />
            
            {/* Millennials data */}
            <Line 
              name="Millennials"
              type="monotone" 
              dataKey="Millennials" 
              stroke={colors.hiltonBlue} 
              {...lineConfig}
            />
            
            {/* Gen X data */}
            <Line 
              name="Gen X"
              type="monotone" 
              dataKey="Gen X" 
              stroke={colors.turquoise} 
              {...lineConfig}
            />
            
            {/* Boomers data */}
            <Line 
              name="Boomers"
              type="monotone" 
              dataKey="Boomers" 
              stroke="#AA5E30" 
              {...lineConfig}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AudienceGroupTrend;