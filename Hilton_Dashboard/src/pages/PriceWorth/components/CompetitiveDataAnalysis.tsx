import React, { useMemo } from 'react';
import { colors } from '../../../utils/colors';
import { PriceWorthData } from '../../../types/data';

interface CompetitiveDataAnalysisProps {
  data: PriceWorthData[];
}

const CompetitiveDataAnalysis: React.FC<CompetitiveDataAnalysisProps> = ({ data }) => {
  const analysisText = useMemo(() => {
    if (!data || data.length === 0) {
      return "No data available for analysis.";
    }

    // Procesar los valores
    const processValue = (value: string | number): number => {
      if (typeof value === 'string') {
        return parseFloat(value.replace('%', ''));
      }
      return value;
    };

    // Obtener los datos más recientes de millennials
    const millennialsLatestData = data.find(item => 
      item.audience === 'Millennials' && item.quarter === 'Q4 2023'
    );

    // Obtener datos de Q1 2023 para millennials
    const millennialsQ1Data = data.find(item => 
      item.audience === 'Millennials' && item.quarter === 'Q1 2023'
    );

    // Si no hay datos, retornar mensaje
    if (!millennialsLatestData || !millennialsQ1Data) {
      return "Insufficient data for complete analysis.";
    }

    // Extraer y procesar valores
    const hiltonWorth = processValue(millennialsLatestData.hiltonWorth);
    const marriottWorth = processValue(millennialsLatestData.marriottWorth);
    const worthDifference = (hiltonWorth - marriottWorth).toFixed(1);

    const hiltonPriceLatest = processValue(millennialsLatestData.hiltonPrice);
    const hiltonWorthLatest = processValue(millennialsLatestData.hiltonWorth);
    const marriottPriceLatest = processValue(millennialsLatestData.marriottPrice);
    const marriottWorthLatest = processValue(millennialsLatestData.marriottWorth);

    // Calcular ratios de valor-precio
    const hiltonRatioLatest = (hiltonWorthLatest / hiltonPriceLatest * 100).toFixed(1);
    const marriottRatioLatest = (marriottWorthLatest / marriottPriceLatest * 100).toFixed(1);

    const hiltonPriceQ1 = processValue(millennialsQ1Data.hiltonPrice);
    const hiltonWorthQ1 = processValue(millennialsQ1Data.hiltonWorth);
    const hiltonRatioQ1 = (hiltonWorthQ1 / hiltonPriceQ1 * 100).toFixed(1);
    
    // Determinar tendencias
    const trendDescription = parseFloat(hiltonRatioLatest) > parseFloat(hiltonRatioQ1) 
      ? "increased" 
      : "decreased";

    // Analizar percepción de precio general
    let priceComparisonText = "";
    if (hiltonPriceLatest > marriottPriceLatest) {
      priceComparisonText = `Hilton's price perception (${hiltonPriceLatest}%) remains higher than Marriott's (${marriottPriceLatest}%)`;
    } else if (hiltonPriceLatest < marriottPriceLatest) {
      priceComparisonText = `Hilton's price perception (${hiltonPriceLatest}%) is lower than Marriott's (${marriottPriceLatest}%)`;
    } else {
      priceComparisonText = `Hilton and Marriott have equal price perception (${hiltonPriceLatest}%)`;
    }

    // Generar texto de análisis competitivo
    return `
      Millennials show a ${hiltonWorth}% worth perception for Hilton compared to ${marriottWorth}% for Marriott, a ${worthDifference} percentage point difference. 
      The value-to-price ratio for Hilton ${trendDescription} from ${hiltonRatioQ1}% in Q1 2023 to ${hiltonRatioLatest}% in Q4 2023, ${parseFloat(hiltonRatioLatest) > parseFloat(marriottRatioLatest) ? "surpassing" : "trailing"} Marriott's ${marriottRatioLatest}% in the same period. 
      ${priceComparisonText}, with a corresponding ${hiltonWorthLatest > marriottWorthLatest ? "higher" : "lower"} worth perception. 
      The data indicates a ${parseFloat(hiltonRatioLatest) > parseFloat(hiltonRatioQ1) ? "steady improvement" : "decline"} in Hilton's value metrics relative to competitors in the luxury hotel segment.
    `.trim().replace(/\s+/g, ' ');
  }, [data]);

  return (
    <div className="mt-4 p-4 bg-white rounded shadow-sm" style={{ borderLeft: `4px solid ${colors.hiltonBlue}` }}>
      <h3 className="mb-2 text-lg font-medium" style={{ color: colors.hiltonBlue }}>Competitive data analysis</h3>
      <p className="text-sm">
        {analysisText}
      </p>
    </div>
  );
};

export default CompetitiveDataAnalysis;