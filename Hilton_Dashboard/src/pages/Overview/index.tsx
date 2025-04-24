import React, { useEffect } from 'react';
import { useCSVData } from '../../hooks/useCSVData';
import KeyMetrics from './components/KeyMetrics';
import AudiencePerformance from './components/AudiencePerformance';
import DataSummary from './components/DataSummary';
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
    <div className="p-8">
      <h1 className="text-3xl font-normal mb-8 text-[#002F61] font-['Georgia']">Overview</h1>
      
      <KeyMetrics 
        awarenessData={awareness}
        considerationData={consideration}
        ftsRecallData={ftsRecall}
        priceWorthData={priceWorth}
      />

      <div className="mt-8 flex gap-8">
        <div className="w-1/3 bg-[#F0E9E6] p-6 rounded-[0.375rem] shadow-sm">
          <h2 className="text-xl font-normal mb-4 text-[#002F61] font-['Georgia']">Executive Summary</h2>
          <div className="space-y-3 font-['Helvetica']">
            <p className="text-sm leading-relaxed">
              Q4 2023 data shows strong performance across key metrics, with Hilton maintaining leadership position versus Marriott in all major categories.
            </p>
            <div className="text-sm leading-relaxed">
              <span className="font-bold">Brand Awareness: </span>
              Hilton leads with <span className="font-bold">29%</span> unaided awareness (vs. Marriott's 20%), showing particular strength among Boomers (<span className="font-bold">36%</span>) and Gen X (<span className="font-bold">30%</span>).
            </div>
            <div className="text-sm leading-relaxed">
              <span className="font-bold">Brand Consideration: </span>
              Overall consideration increased to <span className="font-bold">56%</span> in Q4 2023, with strongest performance among Millennials at <span className="font-bold">62%</span>, outperforming Marriott by 23 percentage points.
            </div>
            <div className="text-sm leading-relaxed">
              <span className="font-bold">Value Perception: </span>
              Price-value relationship improved across generations, with Millennials rating Hilton's worth at <span className="font-bold">31%</span> versus Marriott's 25%, while maintaining premium pricing position.
            </div>
          </div>
        </div>

        <div className="w-2/3">
          <AudiencePerformance data={consideration} />
        </div>
      </div>

      <DataSummary 
        awarenessData={awareness}
        ftsRecallData={ftsRecall}
        proofOfPointData={proofOfPoint}
      />
    </div>
  );
};

export default Overview;