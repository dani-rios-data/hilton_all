import React from 'react';
import { useCSVData } from '../../hooks/useCSVData';
import { colors } from '../../utils/colors';
import FTSAssociationSummary from './components/FTSAssociationSummary';
import AudienceGroupTrend from '../../pages/FtsRecall/components/AudienceGroupTrend';
import AudienceGroupCommRecallTrend from '../../pages/FtsRecall/components/AudienceGroupCommRecallTrend';

const FTSAssociation: React.FC = () => {
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
        FTS Association & Communication Recall
      </h2>
      <FTSAssociationSummary data={ftsRecall} />
      <div className="grid grid-cols-2 gap-6">
        <AudienceGroupTrend data={ftsRecall} />
        <AudienceGroupCommRecallTrend data={ftsRecall} />
      </div>
    </div>
  );
};

export default FTSAssociation; 