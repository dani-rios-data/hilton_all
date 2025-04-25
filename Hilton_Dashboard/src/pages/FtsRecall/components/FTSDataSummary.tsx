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
        avgFts: 0,
        avgRecall: 0,
        totalFts: 0,
        totalRecall: 0,
        latestQuarter: 'Q4 2023',
        quarterlyGrowth: 0,
        previousQuarter: 'Q3 2023'
      };
    }

    // Obtener trimestres únicos
    const quarters = [...new Set(data.map(item => item.quarter))].sort();
    const latestQuarter = quarters[quarters.length - 1];
    const previousQuarter = quarters[quarters.length - 2] || '';

    // Filtrar datos para obtener solo 'Total' por trimestre
    const totalData = data.filter(item => item.audience === 'Total');
    
    // Calcular promedios
    const avgFts = totalData.reduce((sum, item) => sum + (item.value || 0), 0) / totalData.length;
    const avgRecall = totalData.reduce((sum, item) => sum + (item.communicationRecall || 0), 0) / totalData.length;
    
    // Obtener valores del último trimestre
    const latestData = totalData.find(item => item.quarter === latestQuarter);
    const previousData = totalData.find(item => item.quarter === previousQuarter);
    
    // Calcular crecimiento
    const currentFts = latestData?.value || 0;
    const previousFts = previousData?.value || 0;
    const quarterlyGrowth = previousFts > 0 ? ((currentFts - previousFts) / previousFts) * 100 : 0;

    return {
      avgFts,
      avgRecall,
      totalFts: latestData?.value || 0,
      totalRecall: latestData?.communicationRecall || 0,
      latestQuarter,
      quarterlyGrowth,
      previousQuarter
    };
  }, [data]);

  if (!data || data.length === 0) {
    return (
      <div className="p-4 bg-white rounded shadow-sm">
        <h3 className="mb-3 text-lg text-center" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
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
      <h3 className="text-lg mb-5 text-center" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        FTS Association & Communication Recall Summary
      </h3>
      
      <div className="space-y-4">
        <div className="text-center">
          <h4 className="font-semibold text-gray-700 mb-3">Average Metrics (All Quarters)</h4>
          <div className="flex justify-center space-x-12">
            <div className="text-center">
              <p className="text-sm text-gray-600">FTS Association:</p>
              <p className="text-2xl font-semibold" style={{ color: colors.hiltonBlue }}>{summaryData.avgFts.toFixed(1)}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Communication Recall:</p>
              <p className="text-2xl font-semibold" style={{ color: colors.turquoise }}>{summaryData.avgRecall.toFixed(1)}%</p>
            </div>
          </div>
        </div>
        
        <div className="text-center border-t border-gray-200 pt-4">
          <h4 className="font-semibold text-gray-700 mb-3">Latest Quarter ({summaryData.latestQuarter})</h4>
          <div className="flex justify-center space-x-12">
            <div className="text-center">
              <p className="text-sm text-gray-600">FTS Association:</p>
              <p className="text-xl font-semibold" style={{ color: colors.hiltonBlue }}>{summaryData.totalFts}%</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-gray-600">Communication Recall:</p>
              <p className="text-xl font-semibold" style={{ color: colors.turquoise }}>{summaryData.totalRecall}%</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-600 mt-3">
            <span className="font-semibold">Quarterly Growth:</span> 
            <span className={summaryData.quarterlyGrowth >= 0 ? "text-green-600" : "text-red-600"}>
              {" "}{summaryData.quarterlyGrowth > 0 ? "+" : ""}{summaryData.quarterlyGrowth.toFixed(1)}%
            </span> 
            {summaryData.previousQuarter && ` from ${summaryData.previousQuarter}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FTSDataSummary; 