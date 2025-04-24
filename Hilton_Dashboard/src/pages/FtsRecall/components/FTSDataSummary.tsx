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
      <h3 className="text-lg mb-4" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        FTS Association & Communication Recall Summary
      </h3>
      
      <div className="space-y-4">
        <div className="border-b border-gray-200 pb-2">
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
        
        <div className="pb-2">
          <h4 className="font-semibold text-gray-700 mb-2">Audience Breakdown</h4>
          <div className="grid grid-cols-3 gap-2 text-sm">
            <div className="bg-gray-50 p-2 rounded">
              <p className="font-medium">Millennials</p>
              <div className="flex justify-between">
                <span className="text-gray-600">FTS:</span>
                <span className="font-semibold">{summaryData.millennialsFts}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Recall:</span>
                <span className="font-semibold">{summaryData.millennialsRecall}%</span>
              </div>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <p className="font-medium">Gen X</p>
              <div className="flex justify-between">
                <span className="text-gray-600">FTS:</span>
                <span className="font-semibold">{summaryData.genXFts}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Recall:</span>
                <span className="font-semibold">{summaryData.genXRecall}%</span>
              </div>
            </div>
            <div className="bg-gray-50 p-2 rounded">
              <p className="font-medium">Boomers</p>
              <div className="flex justify-between">
                <span className="text-gray-600">FTS:</span>
                <span className="font-semibold">{summaryData.boomersFts}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Recall:</span>
                <span className="font-semibold">{summaryData.boomersRecall}%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Quarterly Growth:</span> 
            <span className={summaryData.quarterlyGrowth >= 0 ? "text-green-600" : "text-red-600"}>
              {" "}{summaryData.quarterlyGrowth > 0 ? "+" : ""}{summaryData.quarterlyGrowth.toFixed(1)}%
            </span> 
            {summaryData.previousQuarter && ` from ${summaryData.previousQuarter}`}
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Millennials show the highest FTS Association at {summaryData.millennialsFts}% and Communication Recall at {summaryData.millennialsRecall}%, 
            while Boomers have the lowest metrics with {summaryData.boomersFts}% and {summaryData.boomersRecall}% respectively.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FTSDataSummary; 