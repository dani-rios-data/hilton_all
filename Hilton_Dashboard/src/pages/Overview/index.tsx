import React from 'react';
import { useCSVData } from '../../hooks/useCSVData';
import KeyMetrics from './components/KeyMetrics';
import ExecutiveSummary from './components/ExecutiveSummary';
import CompetitivePositioning from './components/CompetitivePositioning';
import AudiencePerformance from './components/AudiencePerformance';
import AwarenessTrend from './components/AwarenessTrend';
import KeyFacts from './components/KeyFacts';
import { colors } from '../../utils/colors';

const Overview: React.FC = () => {
  const { consideration, awareness, isLoading, error } = useCSVData();

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading data...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-8">
      {/* KPI Section */}
      <KeyMetrics />
      
      {/* Executive Summary and Competitive Positioning */}
      <div className="grid grid-cols-3 gap-6">
        <ExecutiveSummary />
        <CompetitivePositioning data={awareness} />
      </div>
      
      {/* Performance by audience and Awareness trend */}
      <div className="grid grid-cols-2 gap-6">
        <AudiencePerformance data={consideration} />
        <AwarenessTrend data={awareness} />
      </div>
      
      {/* Key Facts */}
      <KeyFacts />
    </div>
  );
};

export default Overview;