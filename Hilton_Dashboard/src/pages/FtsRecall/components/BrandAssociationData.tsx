import React, { useMemo } from 'react';
import { colors } from '../../../utils/colors';
import { FtsRecallData } from '../../../types/data';

interface BrandAssociationDataProps {
  data: FtsRecallData[];
}

const BrandAssociationData: React.FC<BrandAssociationDataProps> = ({ data }) => {

  const calculatedMetrics = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        latestQuarter: 'N/A',
        overallIncrease: 0,
        highestSegment: 'N/A',
        highestValue: 0,
        secondHighestSegment: 'N/A',
        secondHighestValue: 0,
        avgGap: 0
      };
    }

    const latestQuarterStr = 'Q4 2023';
    const previousQuarterStr = 'Q4 2022';

    const totalDataLatest = data.find(item => item.quarter === latestQuarterStr && item.audience === 'Total');
    const totalDataPrevious = data.find(item => item.quarter === previousQuarterStr && item.audience === 'Total');

    const overallIncrease = totalDataLatest && totalDataPrevious ? totalDataLatest.value - totalDataPrevious.value : 0;

    const segmentDataLatest = data.filter(item => item.quarter === latestQuarterStr && item.audience !== 'Total');
    segmentDataLatest.sort((a, b) => (b.value || 0) - (a.value || 0));

    const highestSegment = segmentDataLatest[0]?.audience || 'N/A';
    const highestValue = Math.round(segmentDataLatest[0]?.value || 0);
    const secondHighestSegment = segmentDataLatest[1]?.audience || 'N/A';
    const secondHighestValue = Math.round(segmentDataLatest[1]?.value || 0);

    let totalGap = 0;
    let validSegments = 0;
    segmentDataLatest.forEach(item => {
        const gap = Math.abs((item.value || 0) - (item.communicationRecall || 0));
        totalGap += gap;
        validSegments++;
    });
    const avgGap = validSegments > 0 ? Math.round(totalGap / validSegments) : 0;

    return {
      latestQuarter: latestQuarterStr,
      previousQuarter: previousQuarterStr,
      overallFTSLatest: Math.round(totalDataLatest?.value || 0),
      overallFTSPrevious: Math.round(totalDataPrevious?.value || 0),
      overallIncrease: Math.round(overallIncrease),
      highestSegment,
      highestValue,
      secondHighestSegment,
      secondHighestValue,
      avgGap
    };

  }, [data]);

  return (
    <div className="mt-4 p-4 bg-white rounded shadow-sm" style={{ borderLeft: `4px solid ${colors.hiltonBlue}` }}>
      <h3 className="mb-2 text-lg font-medium" style={{ color: colors.hiltonBlue }}>Key Insights from FTS Data</h3>
      <p className="text-sm leading-relaxed">
        Brand association for the Total audience {calculatedMetrics.overallIncrease >= 0 ? 'increased' : 'decreased'} 
        {' '}from {calculatedMetrics.overallFTSPrevious}% in {calculatedMetrics.previousQuarter} to {calculatedMetrics.overallFTSLatest}% in {calculatedMetrics.latestQuarter}, 
        representing a {Math.abs(calculatedMetrics.overallIncrease)} percentage point {calculatedMetrics.overallIncrease >= 0 ? 'increase' : 'decrease'}. 
        In {calculatedMetrics.latestQuarter}, <span className="font-medium">{calculatedMetrics.highestSegment}</span> show the highest level of brand association at {calculatedMetrics.highestValue}%, 
        followed by <span className="font-medium">{calculatedMetrics.secondHighestSegment}</span> at {calculatedMetrics.secondHighestValue}%. 
        Communication recall metrics generally track association rates across segments, with an average gap of approximately {calculatedMetrics.avgGap} points observed in {calculatedMetrics.latestQuarter}.
      </p>
    </div>
  );
};

export default BrandAssociationData;