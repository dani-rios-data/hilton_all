import React from 'react';
import { AwarenessData, FtsRecallData, ProofOfPointData } from '../../../types/data';

interface DataSummaryProps {
  awarenessData: AwarenessData[];
  ftsRecallData: FtsRecallData[];
  proofOfPointData: ProofOfPointData[];
}

const DataSummary: React.FC<DataSummaryProps> = ({ awarenessData, ftsRecallData, proofOfPointData }) => {
  // Filtrar datos para Q4 2023
  const q4FtsData = ftsRecallData.find(item => item.quarter === 'Q4 2023' && item.audience === 'Total');
  const q4MillennialsFts = ftsRecallData.find(item => item.quarter === 'Q4 2023' && item.audience === 'Millennials');

  // Encontrar datos de satisfacción global para mercados clave
  const trustScores = proofOfPointData
    .filter(item => 
      item.category === 'Hilton satisfaction' && 
      item.brand === 'Hilton'
    );
  
  const maxTrustScore = Math.max(...trustScores.map(score => score.value));
  const maxTrustMarket = trustScores.find(score => score.value === maxTrustScore);

  const relaxScores = proofOfPointData
    .filter(item => 
      item.category === 'Hilton satisfaction' && 
      item.brand === 'Hilton'
    );
  
  const maxRelaxScore = Math.max(...relaxScores.map(score => score.value));

  return (
    <div className="mt-4 p-4 bg-white rounded shadow-sm" style={{ borderLeft: '4px solid #002F61' }}>
      <h2 className="text-lg font-medium mb-2 text-[#002F61] font-['Georgia']">
        Performance Overview Q4 2023
      </h2>
      <p className="text-sm leading-relaxed font-['Helvetica']">
        Marketing investment is primarily focused on Enterprise Linear TV ($32.7M) and Generic Paid Search ($29.1M), with significant digital presence through Social Media channels (LF Social: $20.4M, UF Social: $16.1M). FTS Association reached {q4FtsData?.value}% overall in Q4 2023, with Millennials leading at {q4MillennialsFts?.value}% and showing {q4MillennialsFts?.communicationRecall}% communication recall. Global satisfaction metrics demonstrate strength in trust (up to {(maxTrustScore * 100).toFixed(0)}% in {maxTrustMarket?.country}) and relaxation experience ({(maxRelaxScore * 100).toFixed(0)}% satisfaction rate). The data shows consistent performance across key markets with notable regional variations in brand perception and engagement metrics.
      </p>
    </div>
  );
};

export default DataSummary;