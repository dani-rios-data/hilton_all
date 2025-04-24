import React, { useMemo } from 'react';
import { 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  Tooltip, 
  Legend
} from 'recharts';
import { FtsRecallData } from '../../../types/data';
import { colors } from '../../../utils/colors';
import CustomTooltip from '../../../components/ui/CustomTooltip';

interface DemographicsSegmentationProps {
  data: FtsRecallData[];
}

// Definir una paleta de colores para los segmentos
const PIE_COLORS = [colors.hiltonBlue, colors.turquoise, '#60A5FA', '#818CF8', '#A78BFA', '#F472B6'];

const DemographicsSegmentation: React.FC<DemographicsSegmentationProps> = ({ data }) => {

  const chartData = useMemo(() => {
    if (!data || data.length === 0) {
      return { ftsData: [], recallData: [], maxValue: 0 };
    }

    const latestQuarter = 'Q4 2023';
    const latestData = data.filter(item => 
      item.quarter === latestQuarter && 
      item.audience !== 'Total'
    );

    const ftsData = latestData.map(item => ({
      name: item.audience,
      value: item.value || 0 // Asegurar que value sea numérico
    }));

    const recallData = latestData.map(item => ({
      name: item.audience,
      value: item.communicationRecall || 0 // Asegurar que value sea numérico
    }));
    
    // Calcular max value para posible uso futuro (aunque no para Pie)
    let max = 0;
    [...ftsData, ...recallData].forEach(item => {
        if(item.value > max) max = item.value;
    });

    return { ftsData, recallData, maxValue: max };

  }, [data]);

  // Función para renderizar etiquetas personalizadas en el PieChart (la eliminaremos o modificaremos para no mostrar texto)
  const RADIAN = Math.PI / 180;
  /* const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, payload }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // No mostrar etiqueta si el porcentaje es muy pequeño
    if (percent < 0.03) return null; 

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central" fontSize={10}>
        {`${payload.name} (${(percent * 100).toFixed(0)}%)`}
      </text>
    );
  }; */
  
  if (chartData.ftsData.length === 0 && chartData.recallData.length === 0) {
     return (
      <div className="p-4 bg-white rounded shadow-sm">
        <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
          Demographics segmentation (Q4 2023)
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available for Q4 2023 segments.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Demographics segmentation (Q4 2023)
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4"> 
        
        {/* FTS Association Donut */}
        <div className="flex flex-col items-center">
            <h4 className="text-sm mb-1 font-semibold text-gray-700">FTS Association</h4>
            <ResponsiveContainer width="100%" height={210}>
              <PieChart>
                  <Pie
                  data={chartData.ftsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={70}
                  innerRadius={50}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  >
                  {chartData.ftsData.map((entry, index) => (
                      <Cell key={`cell-fts-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
        </div>

        {/* Communication Recall Donut */}
        <div className="flex flex-col items-center">
            <h4 className="text-sm mb-1 font-semibold text-gray-700">Communication Recall</h4>
            <ResponsiveContainer width="100%" height={210}>
              <PieChart>
                  <Pie
                  data={chartData.recallData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={70}
                  innerRadius={50}
                  fill="#82ca9d"
                  dataKey="value"
                  nameKey="name"
                  >
                  {chartData.recallData.map((entry, index) => (
                      <Cell key={`cell-recall-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
        </div>
      </div>

      {/* Leyenda compartida centrada debajo de ambos gráficos */}
      <div className="flex justify-center mt-2 mb-4">
        <div className="flex items-center justify-center space-x-4"> 
          {chartData.ftsData.map((entry, index) => (
            <div key={entry.name} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-1" 
                style={{ backgroundColor: PIE_COLORS[index % PIE_COLORS.length] }}
              ></div>
              <span className="text-xs text-gray-700">{entry.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DemographicsSegmentation;