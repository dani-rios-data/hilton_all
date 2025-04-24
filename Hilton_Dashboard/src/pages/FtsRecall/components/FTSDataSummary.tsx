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
        <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
          FTS Association & Communication Recall Summary
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
        FTS Association & Communication Recall Summary
      </h3>
      
      <div className="space-y-3">
        <div className="border-b border-gray-200 pb-3">
          <h4 className="font-semibold text-gray-700 mb-2">Key Metrics ({summaryData.latestQuarter})</h4>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Total FTS Association:</p>
              <p className="text-xl font-semibold" style={{ color: colors.hiltonBlue }}>{summaryData.totalFts}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Communication Recall:</p>
              <p className="text-xl font-semibold" style={{ color: colors.turquoise }}>{summaryData.totalRecall}%</p>
            </div>
          </div>
        </div>
        
        <div className="border-b border-gray-200 pb-3">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Quarterly Growth:</span> 
            <span className={summaryData.quarterlyGrowth >= 0 ? "text-green-600" : "text-red-600"}>
              {" "}{summaryData.quarterlyGrowth > 0 ? "+" : ""}{summaryData.quarterlyGrowth.toFixed(1)}%
            </span> 
            {summaryData.previousQuarter && ` from ${summaryData.previousQuarter}`}
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-700 text-sm mb-2">Key Insights</h4>
          <ul className="list-disc pl-4 text-sm text-gray-600 space-y-1">
            <li>Recall rate exceeds FTS Association by {(summaryData.totalRecall - summaryData.totalFts).toFixed(0)} percentage points</li>
            <li>Millennials lead both metrics across all measured quarters</li>
            <li>Significant difference between demographic segments</li>
            <li>FTS Association shows positive trend since Q1 2023</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FTSDataSummary; 