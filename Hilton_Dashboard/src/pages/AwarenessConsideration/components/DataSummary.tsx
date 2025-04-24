import React, { useEffect, useState } from 'react';
import { colors } from '../../../utils/colors';
import { AwarenessData, ConsiderationData } from '../../../types/data';

interface DataSummaryProps {
  awarenessData: AwarenessData[];
  considerationData: ConsiderationData[];
}

const DataSummary: React.FC<DataSummaryProps> = ({ awarenessData, considerationData }) => {
  const [metrics, setMetrics] = useState({
    hiltonAwareness: 0,
    hiltonConsideration: 0,
    gap: 0,
    conversionHilton: 0,
    conversionMarriott: 0,
    difference: 0,
    highestAudienceValue: 0,
    highestAudienceName: '',
  });

  useEffect(() => {
    if (awarenessData && awarenessData.length > 0 && considerationData && considerationData.length > 0) {
      const latestQuarter = 'Q4 2023';
      const awarenessFiltered = awarenessData.filter(item => 
        item.quarter === latestQuarter && 
        item.category === 'Unaided Awareness'
      );
      const considerationFiltered = considerationData.filter(item => 
        item.quarter === latestQuarter
      );
      
      const hiltonAwareness = awarenessFiltered
        .filter(item => item.brand === 'Hilton')
        .map(item => typeof item.value === 'string' ? parseFloat(String(item.value).replace('%', '')) : item.value || 0);
      
      const hiltonConsideration = considerationFiltered
        .filter(item => item.brand === 'Hilton')
        .map(item => item.value);
      
      const avgHiltonAwareness = hiltonAwareness.length > 0 
        ? Math.round(hiltonAwareness.reduce((sum, val) => sum + val, 0) / hiltonAwareness.length) 
        : 0;
      
      const avgHiltonConsideration = hiltonConsideration.length > 0 
        ? Math.round(hiltonConsideration.reduce((sum, val) => sum + val, 0) / hiltonConsideration.length) 
        : 0;
      
      const marriottAwareness = awarenessFiltered
        .filter(item => item.brand === 'Marriott')
        .map(item => typeof item.value === 'string' ? parseFloat(String(item.value).replace('%', '')) : item.value || 0);
      
      const marriottConsideration = considerationFiltered
        .filter(item => item.brand === 'Marriott')
        .map(item => item.value);
      
      const avgMarriottAwareness = marriottAwareness.length > 0 
        ? Math.round(marriottAwareness.reduce((sum, val) => sum + val, 0) / marriottAwareness.length) 
        : 0;
      
      const avgMarriottConsideration = marriottConsideration.length > 0 
        ? Math.round(marriottConsideration.reduce((sum, val) => sum + val, 0) / marriottConsideration.length) 
        : 0;
      
      const conversionHilton = avgHiltonAwareness > 0 ? (avgHiltonConsideration / avgHiltonAwareness) * 100 : 0;
      const conversionMarriott = avgMarriottAwareness > 0 ? (avgMarriottConsideration / avgMarriottAwareness) * 100 : 0;
      
      const audienceAwareness = awarenessFiltered.filter(item => 
        item.brand === 'Hilton' && item.audience
      );
      
      let highestAudienceValue = 0;
      let highestAudienceName = '';
      
      audienceAwareness.forEach(item => {
        let numValue = typeof item.value === 'string' ? parseFloat(String(item.value).replace('%', '')) : item.value || 0;
        if (numValue > highestAudienceValue && item.audience) {
          highestAudienceValue = numValue;
          highestAudienceName = item.audience;
        }
      });
      
      setMetrics({
        hiltonAwareness: avgHiltonAwareness,
        hiltonConsideration: avgHiltonConsideration,
        gap: avgHiltonConsideration - avgHiltonAwareness,
        conversionHilton: parseFloat(conversionHilton.toFixed(1)),
        conversionMarriott: parseFloat(conversionMarriott.toFixed(1)),
        difference: parseFloat((conversionMarriott - conversionHilton).toFixed(1)),
        highestAudienceValue: Math.round(highestAudienceValue),
        highestAudienceName: highestAudienceName || '',
      });
    }
  }, [awarenessData, considerationData]);

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-4 text-xl font-medium" style={{ color: colors.hiltonBlue, fontFamily: 'Georgia, serif' }}>
        Data Summary
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
          <h4 className="text-gray-600 text-sm font-semibold mb-2">Awareness to Consideration Difference</h4>
          <div className="flex items-center">
            <div className="text-3xl font-bold mr-3" style={{ color: colors.hiltonBlue }}>+{Math.abs(metrics.gap)}%</div>
            <div className="text-sm text-gray-700">
              Consideration ({metrics.hiltonConsideration}%) exceeds unaided awareness ({metrics.hiltonAwareness}%) by {Math.abs(metrics.gap)} percentage points
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
          <h4 className="text-gray-600 text-sm font-semibold mb-2">Hilton Performance (Q4 2023)</h4>
          <div className="flex items-baseline justify-around">
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: colors.hiltonBlue }}>{metrics.hiltonAwareness}%</div>
              <div className="text-xs text-gray-600">Unaided Awareness</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold" style={{ color: colors.turquoise }}>{metrics.hiltonConsideration}%</div>
              <div className="text-xs text-gray-600">Consideration</div>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-gray-50 rounded-lg shadow-inner">
          <h4 className="text-gray-600 text-sm font-semibold mb-2">Audience with Highest Awareness</h4>
          <div className="flex items-center">
            <div className="text-3xl font-bold mr-3" style={{ color: colors.hiltonBlue }}>{metrics.highestAudienceValue}%</div>
            <div className="text-sm text-gray-700">
              <span className="font-medium">{metrics.highestAudienceName}</span> demographic shows strongest unaided brand awareness (Q4 2023)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataSummary; 