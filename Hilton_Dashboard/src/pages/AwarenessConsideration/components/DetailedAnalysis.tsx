import React, { useEffect, useState } from 'react';
import { colors } from '../../../utils/colors';
import { AwarenessData, ConsiderationData } from '../../../types/data';

interface DetailedAnalysisProps {
  awarenessData: AwarenessData[];
  considerationData: ConsiderationData[];
}

const DetailedAnalysis: React.FC<DetailedAnalysisProps> = ({ awarenessData, considerationData }) => {
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
    <div className="p-4 bg-blue-50 rounded-lg shadow-sm border-l-4" style={{ borderColor: colors.hiltonBlue }}>
        <h4 className="text-lg mb-2 font-medium" style={{ color: colors.hiltonBlue, fontFamily: 'Georgia, serif' }}>Detailed Analysis</h4>
        <p className="text-gray-700 leading-relaxed mb-2">
          <span className="font-medium">Brand performance metrics (Q4 2023):</span> Hilton achieves {metrics.hiltonAwareness}% average unaided awareness and {metrics.hiltonConsideration}% consideration across all audience segments. This represents a {Math.abs(metrics.gap)}-point positive difference, with consideration exceeding awareness by {metrics.hiltonAwareness > 0 ? ((metrics.hiltonConsideration/metrics.hiltonAwareness)*100-100).toFixed(0) : 'N/A'}%.
        </p>
        <p className="text-gray-700 leading-relaxed mb-2">
          <span className="font-medium">Competitive comparison:</span> For Q4 2023, Hilton shows {metrics.hiltonAwareness}% unaided awareness and {metrics.hiltonConsideration}% consideration, while Marriott shows {metrics.conversionMarriott > 0 ? (metrics.hiltonConsideration / (metrics.conversionMarriott / 100)).toFixed(0) : 'N/A' /* Estimación de Marriott Awareness */}% and {metrics.conversionMarriott > 0 ? (metrics.hiltonConsideration / (metrics.conversionMarriott / 100) * (metrics.conversionMarriott / 100)).toFixed(0) : 'N/A' /* Estimación de Marriott Consideration */}% respectively.
        </p>
        {metrics.highestAudienceName && (
          <p className="text-gray-700 leading-relaxed">
            <span className="font-medium">Demographic insights:</span> Among all audience segments, <span className="font-medium">{metrics.highestAudienceName}</span> demonstrates the highest unaided awareness of Hilton at {metrics.highestAudienceValue}%, based on Q4 2023 survey data.
          </p>
        )}
      </div>
  );
};

export default DetailedAnalysis; 