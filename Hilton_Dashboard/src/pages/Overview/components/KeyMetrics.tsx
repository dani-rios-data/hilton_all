import React, { useMemo } from 'react';
import { colors } from '../../../utils/colors';
import { AwarenessData, ConsiderationData, FtsRecallData, PriceWorthData } from '../../../types/data';

interface KeyMetricsProps {
  awarenessData: AwarenessData[];
  considerationData: ConsiderationData[];
  ftsRecallData: FtsRecallData[];
  priceWorthData: PriceWorthData[];
}

const KeyMetrics: React.FC<KeyMetricsProps> = ({ 
  awarenessData, 
  considerationData, 
  ftsRecallData, 
  priceWorthData 
}) => {
  // Process data to get metric values
  const metrics = useMemo(() => {
    // Calculate average awareness (filtering by Q4 2023)
    const awarenessQ4Data = awarenessData.filter(
      item => item.quarter === 'Q4 2023' && item.brand === 'Hilton' && item.category === 'Unaided Awareness'
    );
    const awarenessTotal = awarenessQ4Data.reduce((sum, item) => sum + item.value, 0);
    const awarenessAvg = awarenessQ4Data.length > 0 ? Math.round(awarenessTotal / awarenessQ4Data.length) : 0;
    
    // Calculate average consideration
    const considerationQ4Data = considerationData.filter(
      item => item.quarter === 'Q4 2023' && item.brand === 'Hilton'
    );
    const considerationTotal = considerationQ4Data.reduce((sum, item) => sum + item.value, 0);
    const considerationAvg = considerationQ4Data.length > 0 ? Math.round(considerationTotal / considerationQ4Data.length) : 0;
    
    // FTS Recall
    const ftsRecallData2023 = ftsRecallData.filter(
      item => item.brand === 'Hilton' && item.attribute === 'For The Stay'
    );
    const ftsRecallTotal = ftsRecallData2023.reduce((sum, item) => sum + item.value, 0);
    const ftsRecallAvg = ftsRecallData2023.length > 0 ? Math.round(ftsRecallTotal / ftsRecallData2023.length) : 0;
    
    // Average Price Worth
    const priceWorthTotal = priceWorthData.filter(item => item.brand === 'Hilton')
      .reduce((sum, item) => sum + item.value, 0);
    const priceWorthCount = priceWorthData.filter(item => item.brand === 'Hilton').length;
    // Convert to a 5-point scale
    const priceWorthAvg = priceWorthCount > 0 ? ((priceWorthTotal / priceWorthCount) * 5 / 100).toFixed(1) : 0;
    
    return [
      {
        title: 'Awareness',
        value: `${awarenessAvg}%`,
        change: '+4%',
        positive: true,
        description: 'Unaided brand awareness'
      },
      {
        title: 'Consideration',
        value: `${considerationAvg}%`,
        change: '+3%',
        positive: true,
        description: 'Brand consideration among target audience'
      },
      {
        title: 'FTS Recall',
        value: `${ftsRecallAvg}%`,
        change: '+7%',
        positive: true,
        description: 'For The Stay campaign recall'
      },
      {
        title: 'Price Worth',
        value: `${priceWorthAvg}/5`,
        change: '+0.3',
        positive: true,
        description: 'Value perception rating'
      }
    ];
  }, [awarenessData, considerationData, ftsRecallData, priceWorthData]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((metric, index) => (
        <div key={index} className="metric-card">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-gray-600 font-medium text-lg">{metric.title}</h3>
            <span 
              className={`metric-change ${
                metric.positive ? 'metric-change-positive' : 'metric-change-negative'
              }`}
            >
              {metric.change}
            </span>
          </div>
          
          <div className="mb-3">
            <span className="metric-value">
              {metric.value}
            </span>
          </div>
          
          <p className="metric-description">{metric.description}</p>
        </div>
      ))}
    </div>
  );
};

export default KeyMetrics;
