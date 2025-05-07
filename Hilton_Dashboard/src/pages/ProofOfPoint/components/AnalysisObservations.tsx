import React from 'react';
import { colors } from '../../../utils/colors';
import { useCSVData } from '../../../hooks/useCSVData';

const AnalysisObservations: React.FC = () => {
  const { proofOfPoint } = useCSVData();

  // Helper para obtener promedios por grupo
  const getAverage = (arr: number[]): number => arr.reduce((acc: number, v: number) => acc + v, 0) / (arr.length || 1);

  // Generar insights descriptivos y factuales
  const generateInsights = () => {
    if (!proofOfPoint || proofOfPoint.length === 0) {
      return "No data available to generate insights.";
    }

    // 1. Característica mejor y peor valorada (Hilton satisfaction)
    const satisfaction = proofOfPoint.filter(item => item.category === 'Hilton satisfaction');
    const byFeature: Record<string, number[]> = {};
    satisfaction.forEach(item => {
      if (item.subcategory) {
        if (!byFeature[item.subcategory]) byFeature[item.subcategory] = [];
        byFeature[item.subcategory].push(item.value);
      }
    });
    const featureAverages = Object.entries(byFeature).map(([name, values]) => ({ name, avg: getAverage(values) }));
    featureAverages.sort((a, b) => b.avg - a.avg);
    const topFeature = featureAverages[0];
    const bottomFeature = featureAverages[featureAverages.length - 1];

    // 2. País con mayor y menor satisfacción promedio
    const byCountry: Record<string, number[]> = {};
    satisfaction.forEach(item => {
      if (item.country) {
        if (!byCountry[item.country]) byCountry[item.country] = [];
        byCountry[item.country].push(item.value);
      }
    });
    const countryAverages = Object.entries(byCountry).map(([name, values]) => ({ name, avg: getAverage(values) }));
    countryAverages.sort((a, b) => b.avg - a.avg);
    const topCountry = countryAverages[0];
    const bottomCountry = countryAverages[countryAverages.length - 1];

    // 3. Diferencia entre audiencias (Zillennials vs Global)
    const zillennials = satisfaction.filter(i => i.audience === 'Zillennials').map(i => i.value);
    const global = satisfaction.filter(i => i.audience === 'Global').map(i => i.value);
    const zillennialsAvg = getAverage(zillennials);
    const globalAvg = getAverage(global);
    const diffZillennials = zillennialsAvg - globalAvg;

    // 4. Variación entre categorías principales
    const byCategory: Record<string, number[]> = {};
    proofOfPoint.forEach(item => {
      if (item.category) {
        if (!byCategory[item.category]) byCategory[item.category] = [];
        byCategory[item.category].push(item.value);
      }
    });
    const categoryAverages = Object.entries(byCategory).map(([name, values]) => ({ name, avg: getAverage(values) }));
    categoryAverages.sort((a, b) => b.avg - a.avg);
    const topCategory = categoryAverages[0];
    const bottomCategory = categoryAverages[categoryAverages.length - 1];

    // 5. Rango de satisfacción general
    const allValues = satisfaction.map(i => i.value);
    const maxSatisfaction = Math.max(...allValues);
    const minSatisfaction = Math.min(...allValues);

    return (
      <ul className="list-disc pl-5 space-y-2">
        <li>
          <b>"{topFeature.name}"</b> is the highest-rated feature for Hilton satisfaction, averaging {(topFeature.avg * 100).toFixed(0)}%. The lowest-rated feature is <b>"{bottomFeature.name}"</b> at {(bottomFeature.avg * 100).toFixed(0)}%.
        </li>
        <li>
          The country with the highest average satisfaction is <b>{topCountry.name}</b> ({(topCountry.avg * 100).toFixed(0)}%), while the lowest is <b>{bottomCountry.name}</b> ({(bottomCountry.avg * 100).toFixed(0)}%).
        </li>
        <li>
          Zillennials report an average satisfaction of {(zillennialsAvg * 100).toFixed(0)}%, which is {diffZillennials >= 0 ? '+' : ''}{(diffZillennials * 100).toFixed(1)} percentage points {diffZillennials >= 0 ? 'higher' : 'lower'} than the global average ({(globalAvg * 100).toFixed(0)}%).
        </li>
        <li>
          The category with the highest overall average is <b>{topCategory.name}</b> ({(topCategory.avg * 100).toFixed(0)}%), while the lowest is <b>{bottomCategory.name}</b> ({(bottomCategory.avg * 100).toFixed(0)}%).
        </li>
        <li>
          Satisfaction scores across all Hilton satisfaction features range from {(minSatisfaction * 100).toFixed(0)}% to {(maxSatisfaction * 100).toFixed(0)}%.
        </li>
      </ul>
    );
  };

  return (
    <div className="mt-4 p-4 bg-white rounded shadow-sm" style={{ borderLeft: `4px solid ${colors.hiltonBlue}` }}>
      <h3 className="mb-2 text-lg font-medium" style={{ color: colors.hiltonBlue }}>Analysis observations</h3>
      <div className="text-sm">
        {generateInsights()}
      </div>
    </div>
  );
};

export default AnalysisObservations;