import React, { useMemo } from 'react';
import { colors } from '../../../utils/colors';
import { AwarenessData, ConsiderationData } from '../../../types/data';

interface DetailedAnalysisProps {
  awarenessData: AwarenessData[];
  considerationData: ConsiderationData[];
}

const DetailedAnalysis: React.FC<DetailedAnalysisProps> = ({ awarenessData, considerationData }) => {
  const metrics = useMemo(() => {
    if (!awarenessData || !considerationData || awarenessData.length === 0 || considerationData.length === 0) {
      return {
        hiltonAwareness: 0,
        hiltonConsideration: 0,
        marriottAwareness: 0,
        marriottConsideration: 0,
        highestAudienceValue: 0,
        highestAudienceName: '',
        percentageIncrease: 0
      };
    }

    const latestQuarter = 'Q4 2023';

    // Calcular awareness promedio de Hilton
    const hiltonAwarenessData = awarenessData.filter(
      item => item.quarter === latestQuarter && 
      item.brand === 'Hilton' &&
      item.category === 'Unaided Awareness'
    );
    
    const hiltonAwareness = hiltonAwarenessData.length > 0
      ? Math.round(hiltonAwarenessData.reduce((sum, item) => {
          const value = typeof item.value === 'string' 
            ? parseFloat(item.value.toString().replace(/%/g, '')) 
            : item.value;
          return sum + (typeof value === 'number' ? value : 0);
        }, 0) / hiltonAwarenessData.length)
      : 0;

    // Calcular consideration promedio de Hilton
    const hiltonConsiderationData = considerationData.filter(
      item => item.quarter === latestQuarter && 
      item.brand === 'Hilton' &&
      item.category === 'Consideration'
    );
    
    const hiltonConsideration = hiltonConsiderationData.length > 0
      ? Math.round(hiltonConsiderationData.reduce((sum, item) => {
          const value = typeof item.value === 'string' 
            ? parseFloat(item.value.toString().replace(/%/g, '')) 
            : item.value;
          return sum + (typeof value === 'number' ? value : 0);
        }, 0) / hiltonConsiderationData.length)
      : 0;

    // Calcular awareness promedio de Marriott
    const marriottAwarenessData = awarenessData.filter(
      item => item.quarter === latestQuarter && 
      item.brand === 'Marriott' &&
      item.category === 'Unaided Awareness'
    );
    
    const marriottAwareness = marriottAwarenessData.length > 0
      ? Math.round(marriottAwarenessData.reduce((sum, item) => {
          const value = typeof item.value === 'string' 
            ? parseFloat(item.value.toString().replace(/%/g, '')) 
            : item.value;
          return sum + (typeof value === 'number' ? value : 0);
        }, 0) / marriottAwarenessData.length)
      : 0;

    // Calcular consideration promedio de Marriott
    const marriottConsiderationData = considerationData.filter(
      item => item.quarter === latestQuarter && 
      item.brand === 'Marriott' &&
      item.category === 'Consideration'
    );
    
    const marriottConsideration = marriottConsiderationData.length > 0
      ? Math.round(marriottConsiderationData.reduce((sum, item) => {
          const value = typeof item.value === 'string' 
            ? parseFloat(item.value.toString().replace(/%/g, '')) 
            : item.value;
          return sum + (typeof value === 'number' ? value : 0);
        }, 0) / marriottConsiderationData.length)
      : 0;

    // Encontrar el segmento de audiencia con el mayor awareness para Hilton
    const audienceAwarenessData = awarenessData.filter(
      item => item.quarter === latestQuarter && 
      item.brand === 'Hilton' &&
      item.category === 'Unaided Awareness' &&
      item.audience
    );

    let highestAudienceValue = 0;
    let highestAudienceName = '';

    audienceAwarenessData.forEach(item => {
      const value = typeof item.value === 'string' 
        ? parseFloat(item.value.toString().replace(/%/g, '')) 
        : item.value;
      if (typeof value === 'number' && value > highestAudienceValue && item.audience) {
        highestAudienceValue = value;
        highestAudienceName = item.audience;
      }
    });

    // Calcular el porcentaje de incremento entre awareness y consideration
    const percentageIncrease = hiltonAwareness > 0 
      ? Math.round((hiltonConsideration / hiltonAwareness - 1) * 100)
      : 0;

    return {
      hiltonAwareness,
      hiltonConsideration,
      marriottAwareness,
      marriottConsideration,
      highestAudienceValue,
      highestAudienceName,
      percentageIncrease
    };
  }, [awarenessData, considerationData]);

  return (
    <div className="p-4 bg-blue-50 rounded-lg shadow-sm border-l-4" style={{ borderColor: colors.hiltonBlue }}>
      <h4 className="text-lg mb-2 font-medium" style={{ color: colors.hiltonBlue, fontFamily: 'Georgia, serif' }}>
        Detailed Analysis
      </h4>
      <p className="text-gray-700 leading-relaxed mb-2">
        Brand performance metrics (Q4 2023): Hilton achieves {metrics.hiltonAwareness}% average unaided awareness and {metrics.hiltonConsideration}% consideration across all audience segments. This represents a {Math.abs(metrics.hiltonConsideration - metrics.hiltonAwareness)}-point positive difference, with consideration exceeding awareness by {metrics.percentageIncrease}%.
      </p>
      <p className="text-gray-700 leading-relaxed mb-2">
        Competitive comparison: For Q4 2023, Hilton shows {metrics.hiltonAwareness}% unaided awareness and {metrics.hiltonConsideration}% consideration, while Marriott shows {metrics.marriottAwareness}% and {metrics.marriottConsideration}% respectively.
      </p>
      <p className="text-gray-700 leading-relaxed">
        Demographic insights: Among all audience segments, {metrics.highestAudienceName} demonstrates the highest unaided awareness of Hilton at {metrics.highestAudienceValue}%, based on Q4 2023 survey data.
      </p>
    </div>
  );
};

export default DetailedAnalysis; 