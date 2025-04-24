import React, { useMemo } from 'react';
import { colors } from '../../../utils/colors';
import { AwarenessData, ConsiderationData } from '../../../types/data';

interface DataSummaryProps {
  awarenessData: AwarenessData[];
  considerationData: ConsiderationData[];
}

const DataSummary: React.FC<DataSummaryProps> = ({ awarenessData, considerationData }) => {
  const metrics = useMemo(() => {
    if (!awarenessData || !considerationData || awarenessData.length === 0 || considerationData.length === 0) {
      return {
        hiltonAwareness: 0,
        hiltonConsideration: 0,
        difference: 0,
        highestAudienceValue: 0,
        highestAudienceName: '',
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
            ? parseFloat(item.value.replace('%', '')) 
            : item.value;
          return sum + value;
        }, 0) / hiltonAwarenessData.length)
      : 0;

    // Calcular consideration promedio de Hilton
    const hiltonConsiderationData = considerationData.filter(
      item => item.quarter === latestQuarter && 
      item.brand === 'Hilton' &&
      item.category === 'Consideration'
    );
    
    const hiltonConsideration = hiltonConsiderationData.length > 0
      ? Math.round(hiltonConsiderationData.reduce((sum, item) => sum + item.value, 0) / hiltonConsiderationData.length)
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
        ? parseFloat(item.value.replace('%', '')) 
        : item.value;
      if (value > highestAudienceValue && item.audience) {
        highestAudienceValue = value;
        highestAudienceName = item.audience;
      }
    });

    const difference = hiltonConsideration - hiltonAwareness;

    return {
      hiltonAwareness,
      hiltonConsideration,
      difference,
      highestAudienceValue,
      highestAudienceName,
    };
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
            <div className="text-3xl font-bold mr-3" style={{ color: colors.hiltonBlue }}>{Math.abs(metrics.difference)}%</div>
            <div className="text-sm text-gray-700">
              Consideration ({metrics.hiltonConsideration}%) exceeds unaided awareness ({metrics.hiltonAwareness}%) by {Math.abs(metrics.difference)} percentage points
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