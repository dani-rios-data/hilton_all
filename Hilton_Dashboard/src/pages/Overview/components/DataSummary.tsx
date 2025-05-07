import React, { useMemo } from 'react';
import { AwarenessData, FtsRecallData, ProofOfPointData, BrandSpendData } from '../../../types/data';

interface DataSummaryProps {
  awarenessData: AwarenessData[];
  ftsRecallData: FtsRecallData[];
  proofOfPointData: ProofOfPointData[];
  brandSpendData?: BrandSpendData[];
}

const DataSummary: React.FC<DataSummaryProps> = ({ 
  awarenessData, 
  ftsRecallData, 
  proofOfPointData,
  brandSpendData = [] 
}) => {
  const summaryData = useMemo(() => {
    // Obtener datos FTS para Q4 2023
    const q4FtsData = ftsRecallData.find(item => 
      item.quarter === 'Q4 2023' && item.audience === 'Total'
    );
    
    // Datos para Millennials
    const q4MillennialsFts = ftsRecallData.find(item => 
      item.quarter === 'Q4 2023' && item.audience === 'Millennials'
    );

    // Análisis de satisfacción para "Is a brand I trust"
    const trustScores = proofOfPointData.filter(item => 
      item.category === 'Hilton satisfaction' && 
      item.subcategory === 'Is a brand I trust'
    );
    
    const maxTrustScore = Math.max(...trustScores.map(score => score.value || 0));
    const maxTrustMarket = trustScores.find(score => score.value === maxTrustScore);

    // Análisis para "Helps me relax and recharge"
    const relaxScores = proofOfPointData.filter(item => 
      item.category === 'Hilton satisfaction' && 
      item.subcategory === 'Helps me relax and recharge'
    );
    
    const maxRelaxScore = Math.max(...relaxScores.map(score => score.value || 0));
    const maxRelaxMarket = relaxScores.find(score => score.value === maxRelaxScore);

    // Ordenar datos de gasto por monto para encontrar los principales canales
    const sortedSpendData = [...brandSpendData].sort((a, b) => b.spend - a.spend);
    const topChannels = sortedSpendData.slice(0, 3).map(channel => ({
      name: channel.brand,
      spend: channel.spend
    }));

    return {
      ftsValue: q4FtsData ? Math.round(q4FtsData.value) : 0,
      millennialsFtsValue: q4MillennialsFts ? Math.round(q4MillennialsFts.value) : 0,
      millennialsCommRecall: q4MillennialsFts ? Math.round(q4MillennialsFts.communicationRecall) : 0,
      maxTrustScore: maxTrustScore * 100,
      maxTrustMarket: maxTrustMarket?.country || "global markets",
      maxRelaxScore: maxRelaxScore * 100,
      maxRelaxMarket: maxRelaxMarket?.country || "global markets",
      topChannels
    };
  }, [ftsRecallData, proofOfPointData, brandSpendData]);

  return (
    <div className="mt-4 p-4 bg-white rounded shadow-sm" style={{ borderLeft: '4px solid #002F61' }}>
      <h2 className="text-lg font-medium mb-2 text-[#002F61] font-['Georgia']">
        Performance Overview Q4 2023
      </h2>
      <p className="text-sm leading-relaxed font-['Helvetica']">
        {summaryData.topChannels.length > 0 ? (
          <>
            Marketing investment is primarily focused on {summaryData.topChannels[0]?.name || "Enterprise Linear TV"} 
            (${(summaryData.topChannels[0]?.spend / 1000000).toFixed(1)}M) 
            and {summaryData.topChannels[1]?.name || "Generic Paid Search"} 
            (${(summaryData.topChannels[1]?.spend / 1000000).toFixed(1)}M), 
            with significant digital presence through {summaryData.topChannels[2]?.name || "Social Media channels"} 
            (${(summaryData.topChannels[2]?.spend / 1000000).toFixed(1)}M).
          </>
        ) : (
          "Marketing investment is distributed across multiple channels with focus on digital and traditional media."
        )} 
        FTS Association reached {summaryData.ftsValue}% overall in Q4 2023, 
        with Millennials leading at {summaryData.millennialsFtsValue}% and showing {summaryData.millennialsCommRecall}% communication recall. 
        Global satisfaction metrics demonstrate strength in trust (up to {summaryData.maxTrustScore.toFixed(0)}% in {summaryData.maxTrustMarket}) 
        and relaxation experience ({summaryData.maxRelaxScore.toFixed(0)}% satisfaction rate in {summaryData.maxRelaxMarket}). 
        The data shows consistent performance across key markets with notable regional variations in brand perception and engagement metrics.
      </p>
    </div>
  );
};

export default DataSummary;