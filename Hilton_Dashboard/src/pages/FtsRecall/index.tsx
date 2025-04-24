import React from 'react';
import { useCSVData } from '../../hooks/useCSVData';
import { colors } from '../../utils/colors';
import QuarterlyTrend from './components/QuarterlyTrend';
import AudienceSegment from './components/AudienceSegment';
import DemographicsSegmentation from './components/DemographicsSegmentation';
import AudienceGroupTrend from './components/AudienceGroupTrend';
import AudienceGroupCommRecallTrend from './components/AudienceGroupCommRecallTrend';
import BrandAssociationData from './components/BrandAssociationData';

const FtsRecall: React.FC = () => {
  const { ftsRecall, isLoading, error } = useCSVData();

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading data...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <h2 className="mb-4 text-xl font-serif" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        "For The Stay" Brand Association Analysis
      </h2>
      
      <div className="grid grid-cols-2 gap-6">
        <DemographicsSegmentation data={ftsRecall} />
        <AudienceSegment data={ftsRecall} />
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <QuarterlyTrend data={ftsRecall} />
      </div>
      
      <AudienceGroupCommRecallTrend data={ftsRecall} />
      <AudienceGroupTrend data={ftsRecall} />
      
      <BrandAssociationData data={ftsRecall} />
    </div>
  );
};

export default FtsRecall;