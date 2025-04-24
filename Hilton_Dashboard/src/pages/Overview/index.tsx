import React, { useEffect } from 'react';
import { useCSVData } from '../../hooks/useCSVData';
import KeyMetrics from './components/KeyMetrics';
import ExecutiveSummary from './components/ExecutiveSummary';
import CompetitivePositioning from './components/CompetitivePositioning';
import AudiencePerformance from './components/AudiencePerformance';
import AwarenessTrend from './components/AwarenessTrend';
import KeyFacts from './components/KeyFacts';
import { colors } from '../../utils/colors';

const Overview: React.FC = () => {
  const { consideration, awareness, ftsRecall, priceWorth, proofOfPoint, isLoading, error } = useCSVData();

  useEffect(() => {
    if (consideration && consideration.length > 0) {
      console.log("Consideration data in Overview:", consideration);
      console.log("Q4 2023 Hilton:", consideration.filter(item => 
        item.quarter === 'Q4 2023' && item.brand === 'Hilton'));
    }
  }, [consideration]);

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading data...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-6">
      {/* KPI Section */}
      <KeyMetrics 
        awarenessData={awareness} 
        considerationData={consideration} 
        ftsRecallData={ftsRecall} 
        priceWorthData={priceWorth} 
      />
      
      {/* Executive Summary and Competitive Positioning */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ExecutiveSummary />
        <CompetitivePositioning data={awareness} />
      </div>
      
      {/* Performance by audience and Awareness trend */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AudiencePerformance data={consideration} />
        <AwarenessTrend data={awareness} />
      </div>
      
      {/* Key Facts */}
      <KeyFacts 
        awarenessData={awareness}
        ftsRecallData={ftsRecall}
        proofOfPointData={proofOfPoint}
      />
    </div>
  );
};

export default Overview;