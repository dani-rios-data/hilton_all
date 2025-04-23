import React from 'react';
import { useCSVData } from '../../hooks/useCSVData';
import { colors } from '../../utils/colors';
import QuarterlyTrend from './components/QuarterlyTrend';
import AudienceSegment from './components/AudienceSegment';
import DemographicsSegmentation from './components/DemographicsSegmentation';
import AudienceGroupTrend from './components/AudienceGroupTrend';
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
      
      <div className="grid grid-cols-1 gap-6">
        <QuarterlyTrend data={ftsRecall} />
      </div>
      
      <div className="grid grid-cols-2 gap-6">
        <AudienceSegment data={ftsRecall} />
        <DemographicsSegmentation data={ftsRecall} />
      </div>
      
      <AudienceGroupTrend data={ftsRecall} />
      
      <BrandAssociationData />
    </div>
  );
};

export default FtsRecall;