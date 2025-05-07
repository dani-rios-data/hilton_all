import React from 'react';
import { useCSVData } from '../../hooks/useCSVData';
import KeyMetrics from './components/KeyMetrics';
import AudiencePerformance from './components/AudiencePerformance';
import DataSummary from './components/DataSummary';
import { colors } from '../../utils/colors';
import { AwarenessData, ConsiderationData, PriceWorthData } from '../../types/data';

const Overview: React.FC = () => {
  const { 
    consideration, 
    awareness, 
    ftsRecall, 
    priceWorth, 
    proofOfPoint, 
    brandSpend, 
    isLoading, 
    error 
  } = useCSVData();

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
              {renderAwarenessHighlights(awareness)}
            </div>
            <div className="text-sm leading-relaxed">
              <span className="font-bold">Brand Consideration: </span>
              {renderConsiderationHighlights(consideration)}
            </div>
            <div className="text-sm leading-relaxed">
              <span className="font-bold">Value Perception: </span>
              {renderValuePerceptionHighlights(priceWorth)}
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
        brandSpendData={brandSpend}
      />
    </div>
  );
};

// Renderiza un resumen del awareness basado en los datos actuales
const renderAwarenessHighlights = (awarenessData: AwarenessData[]) => {
  // Filtrar datos de Q4 2023
  const q4Data = awarenessData.filter(
    item => item.quarter === 'Q4 2023' && item.category === 'Unaided Awareness'
  );
  
  // Datos de Hilton por audiencia
  const hiltonData = q4Data.filter(item => item.brand === 'Hilton');
  const hiltonByAudience: Record<string, number> = {};
  
  hiltonData.forEach(item => {
    if (item.audience) {
      hiltonByAudience[item.audience] = typeof item.value === 'number' ? item.value : 0;
    }
  });
  
  // Datos de Marriott por audiencia
  const marriottData = q4Data.filter(item => item.brand === 'Marriott');
  const marriottByAudience: Record<string, number> = {};
  
  marriottData.forEach(item => {
    if (item.audience) {
      marriottByAudience[item.audience] = typeof item.value === 'number' ? item.value : 0;
    }
  });
  
  // Calcular promedio
  const hiltonValues = Object.values(hiltonByAudience);
  const hiltonAvg = hiltonValues.length > 0 
    ? Math.round(hiltonValues.reduce((sum, val) => sum + val, 0) / hiltonValues.length) 
    : 0;
  
  const marriottValues = Object.values(marriottByAudience);
  const marriottAvg = marriottValues.length > 0 
    ? Math.round(marriottValues.reduce((sum, val) => sum + val, 0) / marriottValues.length) 
    : 0;
  
  // Encontrar los segmentos con mejor desempeño
  const topSegments = Object.entries(hiltonByAudience)
    .sort((a, b) => b[1] - a[1])
    .map(([audience, value]) => ({ audience, value }));
  
  const topHiltonSegment = topSegments[0] || { audience: 'Boomers', value: 0 };
  const secondHiltonSegment = topSegments[1] || { audience: 'Gen X', value: 0 };
  
  return (
    <>
      Hilton leads with <span className="font-bold">{hiltonAvg}%</span> unaided awareness (vs. Marriott's {marriottAvg}%), 
      showing particular strength among {topHiltonSegment.audience} (<span className="font-bold">{Math.round(topHiltonSegment.value)}%</span>) 
      and {secondHiltonSegment.audience} (<span className="font-bold">{Math.round(secondHiltonSegment.value)}%</span>).
    </>
  );
};

// Renderiza un resumen de consideration basado en los datos actuales
const renderConsiderationHighlights = (considerationData: ConsiderationData[]) => {
  // Filtrar datos de Q4 2023
  const q4Data = considerationData.filter(item => item.quarter === 'Q4 2023');
  
  // Datos de Hilton y Marriott por audiencia
  const hiltonByAudience: Record<string, number> = {};
  const marriottByAudience: Record<string, number> = {};
  
  q4Data.forEach(item => {
    if (item.audience) {
      if (item.brand === 'Hilton') {
        hiltonByAudience[item.audience] = typeof item.value === 'number' ? item.value : 0;
      } else if (item.brand === 'Marriott') {
        marriottByAudience[item.audience] = typeof item.value === 'number' ? item.value : 0;
      }
    }
  });
  
  // Calcular promedio
  const hiltonValues = Object.values(hiltonByAudience);
  const hiltonAvg = hiltonValues.length > 0 
    ? Math.round(hiltonValues.reduce((sum, val) => sum + val, 0) / hiltonValues.length) 
    : 0;
  
  // Encontrar el segmento con mejor desempeño
  const topSegmentEntry = Object.entries(hiltonByAudience)
    .sort((a, b) => b[1] - a[1])[0];
  
  const topSegment = topSegmentEntry ? {
    audience: topSegmentEntry[0],
    value: Math.round(topSegmentEntry[1]),
    marriottValue: Math.round(marriottByAudience[topSegmentEntry[0]] || 0)
  } : { audience: 'Millennials', value: 0, marriottValue: 0 };
  
  const diff = topSegment.value - topSegment.marriottValue;
  
  return (
    <>
      Overall consideration increased to <span className="font-bold">{hiltonAvg}%</span> in Q4 2023, 
      with strongest performance among {topSegment.audience} at <span className="font-bold">{topSegment.value}%</span>, 
      outperforming Marriott by {diff} percentage points.
    </>
  );
};

// Renderiza un resumen de la percepción de valor basado en los datos actuales
const renderValuePerceptionHighlights = (priceWorthData: PriceWorthData[]) => {
  // Filtrar datos de Q4 2023
  const q4Data = priceWorthData.filter(item => item.quarter === 'Q4 2023');
  
  if (q4Data.length === 0) {
    return 'Price-value relationship shows positive trends across all segments.';
  }
  
  // Datos por audiencia
  const millennialsData = q4Data.find(item => item.audience === 'Millennials');
  
  if (!millennialsData) {
    return 'Price-value relationship shows positive trends across all segments.';
  }
  
  const hiltonWorth = typeof millennialsData.hiltonWorth === 'number' ? Math.round(millennialsData.hiltonWorth) : 0;
  const marriottWorth = typeof millennialsData.marriottWorth === 'number' ? Math.round(millennialsData.marriottWorth) : 0;
  
  return (
    <>
      Price-value relationship improved across generations, with Millennials rating Hilton's worth at <span className="font-bold">{hiltonWorth}%</span> versus Marriott's {marriottWorth}%, while maintaining premium pricing position.
    </>
  );
};

export default Overview;