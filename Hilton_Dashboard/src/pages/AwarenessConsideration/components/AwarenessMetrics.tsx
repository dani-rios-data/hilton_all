import React, { useEffect, useState } from 'react';
import { colors } from '../../../utils/colors';
import { AwarenessData, ConsiderationData } from '../../../types/data';

interface AwarenessMetricsProps {
  awarenessData: AwarenessData[];
  considerationData: ConsiderationData[];
}

const AwarenessMetrics: React.FC<AwarenessMetricsProps> = ({ awarenessData, considerationData }) => {
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
      // Process the most recent data (Q4 2023)
      const latestQuarter = 'Q4 2023';
      
      // Awareness data
      const awarenessFiltered = awarenessData.filter(item => 
        item.quarter === latestQuarter && 
        item.category === 'Unaided Awareness'
      );
      
      // Consideration data
      const considerationFiltered = considerationData.filter(item => 
        item.quarter === latestQuarter
      );
      
      // Calculate metrics for Hilton
      const hiltonAwareness = awarenessFiltered
        .filter(item => item.brand === 'Hilton')
        .map(item => {
          // Ensure value is a number
          let numValue = typeof item.value === 'number' ? item.value : 0;
          
          // If it's a string, try to convert it
          if (typeof item.value === 'string') {
            const str = item.value as string;
            numValue = parseFloat(str.replace('%', ''));
          }
          
          return numValue;
        });
      
      const hiltonConsideration = considerationFiltered
        .filter(item => item.brand === 'Hilton')
        .map(item => item.value);
      
      const avgHiltonAwareness = hiltonAwareness.length > 0 
        ? Math.round(hiltonAwareness.reduce((sum, val) => sum + val, 0) / hiltonAwareness.length) 
        : 0;
      
      const avgHiltonConsideration = hiltonConsideration.length > 0 
        ? Math.round(hiltonConsideration.reduce((sum, val) => sum + val, 0) / hiltonConsideration.length) 
        : 0;
      
      // Calculate metrics for Marriott
      const marriottAwareness = awarenessFiltered
        .filter(item => item.brand === 'Marriott')
        .map(item => {
          // Ensure value is a number
          let numValue = typeof item.value === 'number' ? item.value : 0;
          
          // If it's a string, try to convert it
          if (typeof item.value === 'string') {
            const str = item.value as string;
            numValue = parseFloat(str.replace('%', ''));
          }
          
          return numValue;
        });
      
      const marriottConsideration = considerationFiltered
        .filter(item => item.brand === 'Marriott')
        .map(item => item.value);
      
      const avgMarriottAwareness = marriottAwareness.length > 0 
        ? Math.round(marriottAwareness.reduce((sum, val) => sum + val, 0) / marriottAwareness.length) 
        : 0;
      
      const avgMarriottConsideration = marriottConsideration.length > 0 
        ? Math.round(marriottConsideration.reduce((sum, val) => sum + val, 0) / marriottConsideration.length) 
        : 0;
      
      // Calculate conversion (consideration as % of awareness)
      const conversionHilton = avgHiltonAwareness > 0 ? (avgHiltonConsideration / avgHiltonAwareness) * 100 : 0;
      const conversionMarriott = avgMarriottAwareness > 0 ? (avgMarriottConsideration / avgMarriottAwareness) * 100 : 0;
      
      // Find audience with highest awareness for Hilton
      const audienceAwareness = awarenessFiltered.filter(item => 
        item.brand === 'Hilton' && item.audience
      );
      
      let highestAudienceValue = 0;
      let highestAudienceName = '';
      
      audienceAwareness.forEach(item => {
        // Ensure value is a number
        let numValue = typeof item.value === 'number' ? item.value : 0;
        
        // If it's a string, try to convert it
        if (typeof item.value === 'string') {
          const str = item.value as string;
          numValue = parseFloat(str.replace('%', ''));
        }
        
        if (numValue > highestAudienceValue && item.audience) {
          highestAudienceValue = numValue;
          highestAudienceName = item.audience;
        }
      });
      
      // Save calculated metrics
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
    <div className="mt-6 p-6 bg-white rounded-lg shadow-sm" style={{ borderLeft: `4px solid ${colors.hiltonBlue}` }}>
      <h3 className="mb-4 text-xl font-medium" style={{ color: colors.hiltonBlue, fontFamily: 'Georgia, serif' }}>
        Data Summary
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-4">
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
          <h4 className="text-gray-600 text-sm font-semibold mb-2">Awareness-to-Consideration Conversion</h4>
          <div className="flex items-center">
            <div className="text-3xl font-bold mr-3" style={{ color: colors.hiltonBlue }}>{metrics.conversionHilton}%</div>
            <div className="text-sm text-gray-700">
              vs {metrics.conversionMarriott}% for Marriott 
              {metrics.difference > 0 ? (
                <span className="font-medium ml-1 text-green-600">({Math.abs(metrics.difference)}% higher)</span>
              ) : (
                <span className="font-medium ml-1 text-red-600">({Math.abs(metrics.difference)}% lower)</span>
              )}
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
      
      <div className="bg-blue-50 p-4 rounded-lg border-l-4" style={{ borderColor: colors.hiltonBlue }}>
        <h4 className="text-lg mb-2 font-medium" style={{ color: colors.hiltonBlue }}>Detailed Analysis</h4>
        <p className="text-gray-700 leading-relaxed mb-2">
          <span className="font-medium">Brand performance metrics (Q4 2023):</span> Hilton achieves {metrics.hiltonAwareness}% average unaided awareness and {metrics.hiltonConsideration}% consideration across all audience segments. This represents a {Math.abs(metrics.gap)}-point positive difference, with consideration exceeding awareness by {((metrics.hiltonConsideration/metrics.hiltonAwareness)*100-100).toFixed(0)}%.
        </p>
        <p className="text-gray-700 leading-relaxed mb-2">
          <span className="font-medium">Competitive comparison:</span> Hilton's awareness-to-consideration conversion rate is {metrics.conversionHilton}%, while Marriott's is {metrics.conversionMarriott}%. 
          {metrics.difference > 0 
            ? ` Marriott's conversion rate exceeds Hilton's by ${metrics.difference} percentage points.` 
            : ` Hilton's conversion rate exceeds Marriott's by ${-metrics.difference} percentage points.`}
        </p>
        {metrics.highestAudienceName && (
          <p className="text-gray-700 leading-relaxed">
            <span className="font-medium">Demographic insights:</span> Among all audience segments, <span className="font-medium">{metrics.highestAudienceName}</span> demonstrates the highest unaided awareness of Hilton at {metrics.highestAudienceValue}%, based on Q4 2023 survey data.
          </p>
        )}
      </div>
    </div>
  );
};

export default AwarenessMetrics;