import React from 'react';
import { useCSVData } from '../../hooks/useCSVData';
import { colors } from '../../utils/colors';
import FTSAssociationSummary from '../FTSAssociation/components/FTSAssociationSummary';
import AudienceGroupTrend from './components/AudienceGroupTrend';
import AudienceGroupCommRecallTrend from './components/AudienceGroupCommRecallTrend';

const DataAnalysis = ({ data }: { data: any[] }) => {
  return (
    <div className="p-6 bg-white rounded shadow-sm mt-8 border-l-4" style={{ borderLeftColor: colors.hiltonBlue }}>
      <h3 className="mb-4 text-xl font-serif" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Data Analysis Insights
      </h3>
      <div className="text-sm text-gray-800 space-y-3">
        <p>
          <strong>Millennials consistently lead in both FTS Association and Communication Recall:</strong> Millennials maintain the highest metrics across all quarters, with FTS Association rates averaging 22.6% and Communication Recall rates averaging 52.8%, significantly higher than other demographic groups.
        </p>
        <p>
          <strong>Significant age-based performance gap exists:</strong> Boomers consistently show the lowest metrics with FTS Association rates (11.6% average) being less than half that of Millennials and Communication Recall averaging only 28.4%. This represents a 11-percentage point gap in Association and a 24.4-percentage point gap in Recall compared to Millennials.
        </p>
        <p>
          <strong>Communication Recall consistently outperforms FTS Association:</strong> Across all audience segments and time periods, Communication Recall rates are substantially higher than FTS Association rates, with an average difference of 24.8 percentage points. This gap is most pronounced among Millennials (30.2 points) and smallest among Boomers (16.8 points).
        </p>
        <p>
          <strong>FTS Association shows positive growth trend:</strong> Overall FTS Association has increased from 15% in Q4 2022 to 19% in Q4 2023, representing a 26.7% growth. All demographic groups except Millennials demonstrated strongest performance in Q2-Q3 2023 before slight declines in Q4 2023.
        </p>
        <p>
          <strong>Q3 2023 was peak period for Communication Recall:</strong> Communication Recall reached its highest point (47%) in Q3 2023 for the Total audience, with similar peaks observed for Gen X (53%) and Millennials (55%) during the same quarter, suggesting a particularly effective communication strategy during this period.
        </p>
      </div>
    </div>
  );
};

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
        FTS Association & Communication Recall
      </h2>
      <FTSAssociationSummary data={ftsRecall} />
      <div className="grid grid-cols-2 gap-6">
        <AudienceGroupTrend data={ftsRecall} />
        <AudienceGroupCommRecallTrend data={ftsRecall} />
      </div>
      <DataAnalysis data={ftsRecall} />
    </div>
  );
};

export default FtsRecall;