import React, { useMemo } from 'react';
import { FtsRecallData } from '../../../types/data';
import { colors } from '../../../utils/colors';

interface FtsRecallStatsProps {
  data: FtsRecallData[];
}

const FtsRecallStats: React.FC<FtsRecallStatsProps> = ({ data }) => {
  // Procesar los datos y calcular estadísticas relevantes
  const stats = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        latestQuarter: 'N/A',
        totalFts: 'N/A',
        totalRecall: 'N/A',
        bestAudience: 'N/A',
        bestAudienceValue: 'N/A',
        growthFromPrevious: 'N/A',
        millennialsVsGenX: 'N/A'
      };
    }

    // Obtener el último trimestre (asumiendo que los datos están ordenados cronológicamente)
    const quarters = [...new Set(data.map(item => item.quarter))];
    quarters.sort(); // Ordenar cronológicamente
    const latestQuarter = quarters[quarters.length - 1];
    const previousQuarter = quarters[quarters.length - 2] || null;

    // Filtrar datos del último trimestre
    const latestData = data.filter(item => item.quarter === latestQuarter);
    
    // Obtener datos de 'Total' para el último trimestre
    const totalData = latestData.find(item => item.audience === 'Total');
    const totalFts = totalData ? totalData.value : 'N/A';
    const totalRecall = totalData ? totalData.communicationRecall : 'N/A';
    
    // Encontrar la audiencia con mejor desempeño en FTS (excluyendo 'Total')
    const audienceData = latestData.filter(item => item.audience !== 'Total');
    let bestAudience = { name: 'N/A', value: 0 };
    
    audienceData.forEach(item => {
      if (Number(item.value) > Number(bestAudience.value)) {
        bestAudience = { name: item.audience, value: item.value };
      }
    });

    // Calcular el crecimiento desde el trimestre anterior (si está disponible)
    let growthFromPrevious = 'N/A';
    if (previousQuarter) {
      const previousTotal = data.find(
        item => item.quarter === previousQuarter && item.audience === 'Total'
      );
      
      if (previousTotal && totalData) {
        const previousValue = Number(previousTotal.value);
        const currentValue = Number(totalData.value);
        const growth = currentValue - previousValue;
        growthFromPrevious = growth >= 0 ? `+${growth}%` : `${growth}%`;
      }
    }

    // Comparar Millennials vs Gen X en el último trimestre
    const millennials = audienceData.find(item => item.audience === 'Millennials');
    const genX = audienceData.find(item => item.audience === 'Gen X');
    let millennialsVsGenX = 'N/A';
    
    if (millennials && genX) {
      const millValue = Number(millennials.value);
      const genXValue = Number(genX.value);
      const diff = millValue - genXValue;
      millennialsVsGenX = diff >= 0 ? 
        `Millennials supera a Gen X por ${diff}%` : 
        `Gen X supera a Millennials por ${Math.abs(diff)}%`;
    }

    return {
      latestQuarter,
      totalFts,
      totalRecall,
      bestAudience: bestAudience.name,
      bestAudienceValue: bestAudience.value,
      growthFromPrevious,
      millennialsVsGenX
    };
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="p-4 bg-white rounded shadow-sm">
        <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
          FTS Brand Association: Key Insights
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available for analysis.
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded shadow-sm h-full">
      <h3 className="mb-5 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        FTS Brand Association: Key Insights
      </h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-1">Datos del {stats.latestQuarter}</h4>
          <div className="grid grid-cols-2 gap-2 mt-3">
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-xs text-gray-500">FTS Association Total</p>
              <p className="text-xl font-bold" style={{ color: colors.hiltonBlue }}>{stats.totalFts}%</p>
            </div>
            <div className="bg-gray-50 p-3 rounded">
              <p className="text-xs text-gray-500">Communication Recall</p>
              <p className="text-xl font-bold" style={{ color: colors.turquoise }}>{stats.totalRecall}%</p>
            </div>
          </div>
        </div>
        
        <div className="pt-2">
          <h4 className="text-sm font-semibold text-gray-700 mb-2">Insights clave</h4>
          <ul className="space-y-2 text-sm text-gray-600">
            <li className="flex items-start">
              <span className="text-xs bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5" style={{ color: colors.hiltonBlue }}>•</span>
              <span>El segmento <strong>{stats.bestAudience}</strong> tiene la mayor asociación de marca con <strong>{stats.bestAudienceValue}%</strong></span>
            </li>
            <li className="flex items-start">
              <span className="text-xs bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5" style={{ color: colors.hiltonBlue }}>•</span>
              <span>FTS Association ha cambiado <strong>{stats.growthFromPrevious}</strong> desde el trimestre anterior</span>
            </li>
            <li className="flex items-start">
              <span className="text-xs bg-gray-100 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5" style={{ color: colors.hiltonBlue }}>•</span>
              <span><strong>{stats.millennialsVsGenX}</strong> en asociación de marca</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FtsRecallStats; 