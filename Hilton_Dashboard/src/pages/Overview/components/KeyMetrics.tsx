import React, { useMemo } from 'react';
import { colors } from '../../../utils/colors';
import { AwarenessData, ConsiderationData, FtsRecallData, PriceWorthData } from '../../../types/data';

interface KeyMetricsProps {
  awarenessData: AwarenessData[];
  considerationData: ConsiderationData[];
  ftsRecallData: FtsRecallData[];
  priceWorthData: PriceWorthData[];
}

const parseValue = (value: string | number): number => {
  if (typeof value === 'string') {
    return parseFloat(value.toString().replace(/%/g, ''));
  }
  return value;
};

const calculateAverage = (values: (string | number)[]): number => {
  if (!values.length) return 0;
  const numericValues = values
    .map(parseValue)
    .filter((val): val is number => typeof val === 'number' && !isNaN(val));
  if (!numericValues.length) return 0;
  return Math.round(numericValues.reduce((sum, val) => sum + val, 0) / numericValues.length);
};

const KeyMetrics: React.FC<KeyMetricsProps> = ({ 
  awarenessData, 
  considerationData, 
  ftsRecallData, 
  priceWorthData 
}) => {
  const metrics = useMemo(() => {
    // Calculate average awareness (filtering by Q4 2023)
    const awarenessQ4Data = awarenessData.filter(
      item => item.quarter === 'Q4 2023' && item.category === 'Unaided Awareness'
    );
    
    const hiltonAwareness = awarenessQ4Data
      .filter(item => item.brand === 'Hilton')
      .map(item => item.value);
    
    const marriottAwareness = awarenessQ4Data
      .filter(item => item.brand === 'Marriott')
      .map(item => item.value);
    
    const awarenessAvg = calculateAverage(hiltonAwareness);
    const competitorAvg = calculateAverage(marriottAwareness);
    const awarenessDiff = Math.round(awarenessAvg - competitorAvg);
    
    // Calculate average consideration
    const considerationQ4Data = considerationData.filter(
      item => item.quarter === 'Q4 2023'
    );
    
    const hiltonConsideration = considerationQ4Data
      .filter(item => item.brand === 'Hilton')
      .map(item => item.value);
    
    const marriottConsideration = considerationQ4Data
      .filter(item => item.brand === 'Marriott')
      .map(item => item.value);
    
    const considerationAvg = calculateAverage(hiltonConsideration);
    const competitorConsiderationAvg = calculateAverage(marriottConsideration);
    const considerationDiff = Math.round(considerationAvg - competitorConsiderationAvg);
    
    // FTS Recall
    const ftsRecallQ4Current = ftsRecallData.find(
      item => item.quarter === 'Q4 2023' && item.audience === 'Total'
    );
    const ftsRecallQ4Previous = ftsRecallData.find(
      item => item.quarter === 'Q4 2022' && item.audience === 'Total'
    );

    const ftsRecallValue = ftsRecallQ4Current ? ftsRecallQ4Current.value : 0;
    const ftsRecallPrevValue = ftsRecallQ4Previous ? ftsRecallQ4Previous.value : 0;
    const ftsRecallDiff = Math.round(ftsRecallValue - ftsRecallPrevValue);
    
    // Average Price Worth
    const priceWorthQ4Current = priceWorthData
      .filter(item => item.quarter === 'Q4 2023')
      .map(item => item.value);
    
    const priceWorthQ4Previous = priceWorthData
      .filter(item => item.quarter === 'Q4 2022')
      .map(item => item.value);

    const priceWorthAvg = calculateAverage(priceWorthQ4Current) / 20; // Convertir a escala 0-5
    const priceWorthPrevAvg = calculateAverage(priceWorthQ4Previous) / 20;
    const rawDiff = priceWorthAvg - priceWorthPrevAvg;
    const priceWorthDiff = rawDiff.toFixed(1);
    
    return [
      {
        title: 'Awareness',
        value: `${awarenessAvg}%`,
        change: `+${awarenessDiff}% vs Marriott`,
        positive: true
      },
      {
        title: 'Consideration',
        value: `${considerationAvg}%`,
        change: `+${considerationDiff}% vs Marriott`,
        positive: true
      },
      {
        title: 'FTS Recall',
        value: `${ftsRecallValue}%`,
        change: `+${ftsRecallDiff}% vs Q4'22`,
        positive: ftsRecallDiff > 0
      },
      {
        title: 'Price Worth',
        value: `${priceWorthAvg.toFixed(1)}/5`,
        change: `${rawDiff > 0 ? '+' : ''}${priceWorthDiff} vs Q4'22`,
        positive: rawDiff > 0
      }
    ];
  }, [awarenessData, considerationData, ftsRecallData, priceWorthData]);

  return (
    <div>
      <h2 className="text-xl font-normal mb-6 text-[#002F61] font-['Georgia']">Key performance metrics</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => {
          const borderColors = ['#002F61', '#007293', '#06937E', '#799CB6'];
          const valueColors = ['#002F61', '#007293', '#06937E', '#799CB6'];
          
          return (
            <div 
              key={index} 
              className="metric-card p-4 bg-white shadow-sm"
              style={{
                borderTop: `4px solid ${borderColors[index]}`
              }}
            >
              <div className="flex flex-col items-center text-center">
                <h3 className="font-['Helvetica'] text-sm font-normal text-gray-900 mb-4">
                  {metric.title}
                </h3>
                
                <div className="flex flex-col items-center">
                  <span 
                    className="font-['Helvetica'] text-3xl font-bold mb-2"
                    style={{ color: valueColors[index] }}
                  >
                    {metric.value}
                  </span>
                  <span className="font-['Helvetica'] text-xs font-normal text-[#059669]">
                    {metric.change}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default KeyMetrics;
