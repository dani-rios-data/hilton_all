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
    <div className="p-5 bg-white rounded shadow-sm">
      <h3 className="text-lg mb-5" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue, borderBottom: `2px solid ${colors.hiltonBlue}`, paddingBottom: '8px' }}>
        FTS Association & Communication Recall Summary
      </h3>
      
      <div className="space-y-5">
        <div>
          <h4 className="font-semibold text-gray-700 mb-3" style={{ borderLeft: `3px solid ${colors.hiltonBlue}`, paddingLeft: '8px' }}>
            Key Metrics ({summaryData.latestQuarter})
          </h4>
          <div className="grid grid-cols-2 gap-6 px-3">
            <div>
              <p className="text-sm text-gray-600 mb-1">Total FTS Association:</p>
              <p className="text-3xl font-bold" style={{ color: colors.hiltonBlue }}>{summaryData.totalFts}%</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">Total Communication Recall:</p>
              <p className="text-3xl font-bold" style={{ color: colors.turquoise }}>{summaryData.totalRecall}%</p>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-4">
          <h4 className="font-semibold text-gray-700 mb-3" style={{ borderLeft: `3px solid ${colors.turquoise}`, paddingLeft: '8px' }}>
            Audience Breakdown
          </h4>
          <div className="grid grid-cols-3 gap-3 px-1">
            <div className="bg-gray-50 p-3 rounded-lg border-l-4" style={{ borderLeftColor: colors.hiltonBlue }}>
              <p className="font-medium text-gray-800 mb-2">Millennials</p>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600">FTS:</span>
                <span className="font-bold text-lg">{summaryData.millennialsFts}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Recall:</span>
                <span className="font-bold text-lg">{summaryData.millennialsRecall}%</span>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border-l-4" style={{ borderLeftColor: colors.turquoise }}>
              <p className="font-medium text-gray-800 mb-2">Gen X</p>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600">FTS:</span>
                <span className="font-bold text-lg">{summaryData.genXFts}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Recall:</span>
                <span className="font-bold text-lg">{summaryData.genXRecall}%</span>
              </div>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg border-l-4" style={{ borderLeftColor: '#60A5FA' }}>
              <p className="font-medium text-gray-800 mb-2">Boomers</p>
              <div className="flex justify-between items-center mb-1">
                <span className="text-gray-600">FTS:</span>
                <span className="font-bold text-lg">{summaryData.boomersFts}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Recall:</span>
                <span className="font-bold text-lg">{summaryData.boomersRecall}%</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-100 pt-4">
          <div className="px-3">
            <p className="text-sm font-medium text-gray-700 mb-2">
              <span className="font-semibold">Quarterly Growth:</span> 
              <span className={`px-2 py-1 ml-2 rounded-full ${summaryData.quarterlyGrowth >= 0 ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}>
                {summaryData.quarterlyGrowth > 0 ? "+" : ""}{summaryData.quarterlyGrowth.toFixed(1)}%
                {summaryData.previousQuarter && ` from ${summaryData.previousQuarter}`}
              </span>
            </p>
            <p className="text-sm text-gray-600 mt-3 bg-gray-50 p-3 rounded">
              <span className="font-medium">Key insight:</span> Millennials show the highest FTS Association at {summaryData.millennialsFts}% and Communication Recall at {summaryData.millennialsRecall}%, 
              while Boomers have the lowest metrics with {summaryData.boomersFts}% and {summaryData.boomersRecall}% respectively.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FTSDataSummary; 