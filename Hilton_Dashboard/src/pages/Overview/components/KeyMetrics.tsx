import React, { useMemo } from 'react';
import { colors } from '../../../utils/colors';
import { AwarenessData, ConsiderationData, FtsRecallData, PriceWorthData } from '../../../types/data';

interface KeyMetricsProps {
  awarenessData: AwarenessData[];
  considerationData: ConsiderationData[];
  ftsRecallData: FtsRecallData[];
  priceWorthData: PriceWorthData[];
}

// Función auxiliar para calcular promedios más robusta
const calculateAverage = (values: number[]): number => {
  if (!values || values.length === 0) return 0;
  const validValues = values.filter(val => typeof val === 'number' && !isNaN(val));
  if (validValues.length === 0) return 0;
  return validValues.reduce((sum, val) => sum + val, 0) / validValues.length;
};

const KeyMetrics: React.FC<KeyMetricsProps> = ({ 
  awarenessData, 
  considerationData, 
  ftsRecallData, 
  priceWorthData 
}) => {
  const metrics = useMemo(() => {
    // Calcular awareness promedio (Q4 2023)
    const awarenessQ4Data = awarenessData.filter(
      item => item.quarter === 'Q4 2023' && item.category === 'Unaided Awareness'
    );
    
    const hiltonAwareness = awarenessQ4Data
      .filter(item => item.brand === 'Hilton')
      .map(item => typeof item.value === 'number' ? item.value : 0);
    
    const marriottAwareness = awarenessQ4Data
      .filter(item => item.brand === 'Marriott')
      .map(item => typeof item.value === 'number' ? item.value : 0);
    
    const awarenessAvg = Math.round(calculateAverage(hiltonAwareness));
    const competitorAvg = Math.round(calculateAverage(marriottAwareness));
    const awarenessDiff = awarenessAvg - competitorAvg;
    
    // Calcular consideration promedio
    const considerationQ4Data = considerationData.filter(
      item => item.quarter === 'Q4 2023'
    );
    
    const hiltonConsideration = considerationQ4Data
      .filter(item => item.brand === 'Hilton')
      .map(item => typeof item.value === 'number' ? item.value : 0);
    
    const marriottConsideration = considerationQ4Data
      .filter(item => item.brand === 'Marriott')
      .map(item => typeof item.value === 'number' ? item.value : 0);
    
    const considerationAvg = Math.round(calculateAverage(hiltonConsideration));
    const competitorConsiderationAvg = Math.round(calculateAverage(marriottConsideration));
    const considerationDiff = considerationAvg - competitorConsiderationAvg;
    
    // FTS Recall y Communication Recall
    const ftsRecallQ4Current = ftsRecallData.find(
      item => item.quarter === 'Q4 2023' && item.audience === 'Total'
    );
    const ftsRecallQ4Previous = ftsRecallData.find(
      item => item.quarter === 'Q4 2022' && item.audience === 'Total'
    );

    const ftsRecallValue = ftsRecallQ4Current ? Math.round(ftsRecallQ4Current.value) : 0;
    const ftsRecallPrevValue = ftsRecallQ4Previous ? Math.round(ftsRecallQ4Previous.value) : 0;
    const ftsRecallDiff = ftsRecallValue - ftsRecallPrevValue;
    
    // Calcular price worth (relación precio-valor)
    const priceWorthQ4Data = priceWorthData.filter(
      item => item.quarter === 'Q4 2023'
    );
    
    const hiltonWorthValues = priceWorthQ4Data.map(item => 
      typeof item.hiltonWorth === 'number' ? item.hiltonWorth : 0
    );
    const marriottWorthValues = priceWorthQ4Data.map(item => 
      typeof item.marriottWorth === 'number' ? item.marriottWorth : 0
    );
    
    // Q4 año anterior para comparación
    const priceWorthQ4PrevData = priceWorthData.filter(
      item => item.quarter === 'Q4 2022'
    );
    
    const hiltonWorthPrevValues = priceWorthQ4PrevData.map(item => 
      typeof item.hiltonWorth === 'number' ? item.hiltonWorth : 0
    );
    
    const hiltonWorthAvg = calculateAverage(hiltonWorthValues);
    const marriottWorthAvg = calculateAverage(marriottWorthValues);
    const hiltonWorthPrevAvg = calculateAverage(hiltonWorthPrevValues);
    
    // Convertir a escala de 5 puntos para presentación
    const priceWorthAvg = hiltonWorthAvg / 20;
    const priceWorthPrevAvg = hiltonWorthPrevAvg / 20;
    const priceWorthDiff = priceWorthAvg - priceWorthPrevAvg;
    
    const worthDiffVsCompetitor = hiltonWorthAvg - marriottWorthAvg;
    
    // Crear los objetos de métricas para la visualización
    return [
      {
        title: 'Awareness',
        value: `${awarenessAvg}%`,
        change: `${awarenessDiff >= 0 ? '+' : ''}${awarenessDiff}% vs Marriott`,
        positive: awarenessDiff >= 0
      },
      {
        title: 'Consideration',
        value: `${considerationAvg}%`,
        change: `${considerationDiff >= 0 ? '+' : ''}${considerationDiff}% vs Marriott`,
        positive: considerationDiff >= 0
      },
      {
        title: 'FTS Recall',
        value: `${ftsRecallValue}%`,
        change: `${ftsRecallDiff >= 0 ? '+' : ''}${ftsRecallDiff}% vs Q4'22`,
        positive: ftsRecallDiff >= 0
      },
      {
        title: 'Price Worth',
        value: `${priceWorthAvg.toFixed(1)}/5`,
        change: `${worthDiffVsCompetitor >= 0 ? '+' : ''}${worthDiffVsCompetitor.toFixed(0)}% vs Marriott`,
        positive: worthDiffVsCompetitor >= 0
      }
    ];
  }, [awarenessData, considerationData, ftsRecallData, priceWorthData]);

  return (
    <div>
      <h2 className="text-xl font-normal mb-6 text-[#002F61] font-['Georgia']">Hilton Brand Performance: Q4 2023 Core Metrics</h2>
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
                  <span 
                    className={`font-['Helvetica'] text-xs font-normal ${metric.positive ? 'text-[#059669]' : 'text-[#DC2626]'}`}
                  >
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
