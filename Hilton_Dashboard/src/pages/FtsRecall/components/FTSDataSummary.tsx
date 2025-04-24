import React, { useMemo } from 'react';
import { FtsRecallData } from '../../../types/data';
import { colors } from '../../../utils/colors';

interface FTSDataSummaryProps {
  data: FtsRecallData[];
}

const FTSDataSummary: React.FC<FTSDataSummaryProps> = ({ data }) => {
  const summaryData = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        latestQuarter: 'Q4 2023',
        totalFts: 0,
        totalRecall: 0,
        millennialsFts: 0,
        millennialsRecall: 0,
        genXFts: 0,
        genXRecall: 0,
        boomersFts: 0,
        boomersRecall: 0,
        quarterlyGrowth: 0,
        previousQuarter: 'Q3 2023'
      };
    }

    // Determinar último trimestre dinámicamente
    const quarters = [...new Set(data.map(item => item.quarter))].sort();
    const latestQuarter = quarters[quarters.length - 1];
    const previousQuarter = quarters[quarters.length - 2] || '';

    // Filtrar datos para el último y penúltimo trimestre
    const latestData = data.filter(item => item.quarter === latestQuarter);
    const previousData = data.filter(item => item.quarter === previousQuarter);

    // Obtener datos del total para el último trimestre
    const totalLatest = latestData.find(item => item.audience === 'Total');
    const totalPrevious = previousData.find(item => item.audience === 'Total');

    // Obtener datos por segmento demográfico
    const millennials = latestData.find(item => item.audience === 'Millennials');
    const genX = latestData.find(item => item.audience === 'Gen X');
    const boomers = latestData.find(item => item.audience === 'Boomers');

    // Calcular crecimiento del FTS Association (si hay datos del trimestre anterior)
    const currentFts = totalLatest?.value || 0;
    const previousFts = totalPrevious?.value || 0;
    const quarterlyGrowth = previousFts > 0 ? ((currentFts - previousFts) / previousFts) * 100 : 0;

    return {
      latestQuarter,
      totalFts: totalLatest?.value || 0,
      totalRecall: totalLatest?.communicationRecall || 0,
      millennialsFts: millennials?.value || 0,
      millennialsRecall: millennials?.communicationRecall || 0,
      genXFts: genX?.value || 0,
      genXRecall: genX?.communicationRecall || 0,
      boomersFts: boomers?.value || 0,
      boomersRecall: boomers?.communicationRecall || 0,
      quarterlyGrowth,
      previousQuarter
    };
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="p-4 bg-white rounded shadow-sm">
        <h3 className="text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
          FTS Association & Communication Recall
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="text-lg mb-3" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        FTS Association & Communication Recall
      </h3>
      
      <div className="space-y-5">
        {/* Key Metrics */}
        <div className="flex justify-between items-center">
          <div className="text-center">
            <p className="text-sm text-gray-600">FTS Association</p>
            <p className="text-3xl font-semibold" style={{ color: colors.hiltonBlue }}>
              {summaryData.totalFts}%
            </p>
          </div>
          <div className="h-12 border-r border-gray-200"></div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Communication Recall</p>
            <p className="text-3xl font-semibold" style={{ color: colors.turquoise }}>
              {summaryData.totalRecall}%
            </p>
          </div>
        </div>
        
        {/* Audience Breakdown - Simplificado */}
        <div className="bg-gray-50 p-3 rounded">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="font-medium">Millennials</p>
              <p className="font-semibold">{summaryData.millennialsFts}%</p>
            </div>
            <div>
              <p className="font-medium">Gen X</p>
              <p className="font-semibold">{summaryData.genXFts}%</p>
            </div>
            <div>
              <p className="font-medium">Boomers</p>
              <p className="font-semibold">{summaryData.boomersFts}%</p>
            </div>
          </div>
        </div>
        
        {/* Growth - Simplificado */}
        <div className="text-center text-sm">
          <span className="text-gray-600">Quarterly growth: </span>
          <span className={summaryData.quarterlyGrowth >= 0 ? "text-green-600 font-semibold" : "text-red-600 font-semibold"}>
            {summaryData.quarterlyGrowth > 0 ? "+" : ""}{summaryData.quarterlyGrowth.toFixed(1)}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default FTSDataSummary; 