import React from 'react';
import { useCSVData } from '../../hooks/useCSVData';
import { colors } from '../../utils/colors';
import AwarenessCombined from './components/AwarenessCombined';
import AwarenessTrend from './components/AwarenessTrend';
import ConsiderationTrend from './components/ConsiderationTrend';
import AudienceAwareness from './components/AudienceAwareness';
import DataSummary from './components/DataSummary';
import DetailedAnalysis from './components/DetailedAnalysis';

const AwarenessConsideration: React.FC = () => {
  const { awareness, consideration, isLoading, error } = useCSVData();

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading data...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <h2 className="mb-4 text-xl font-serif" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Awareness & Consideration Analysis
      </h2>
      
      <div className="grid grid-cols-2 gap-6">
        <AwarenessCombined data={awareness} considerationData={consideration} />
        <AudienceAwareness data={awareness} />
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <AwarenessTrend data={awareness} />
        <ConsiderationTrend data={consideration} />
      </div>
      
      <DataSummary awarenessData={awareness} considerationData={consideration} />
      <DetailedAnalysis awarenessData={awareness} considerationData={consideration} />
    </div>
  );
};

export default AwarenessConsideration;