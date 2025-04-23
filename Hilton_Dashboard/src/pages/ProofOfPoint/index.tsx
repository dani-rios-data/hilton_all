import React from 'react';
import { useCSVData } from '../../hooks/useCSVData';
import { colors } from '../../utils/colors';
import CategoryPerformance from './components/CategoryPerformance';
import AudiencePerformance from './components/AudiencePerformance';
import TopCountries from './components/TopCountries';
import FeatureImportance from './components/FeatureImportance';
import AnalysisObservations from './components/AnalysisObservations';

const ProofOfPoint: React.FC = () => {
  const { proofOfPoint, isLoading, error } = useCSVData();

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading data...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-8">
      <h2 className="mb-4 text-xl font-serif" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Proof of Point Analysis
      </h2>
      
      <div className="grid grid-cols-2 gap-6">
        <CategoryPerformance data={proofOfPoint} />
        <AudiencePerformance data={proofOfPoint} />
      </div>
      
      <TopCountries data={proofOfPoint} />
      
      <FeatureImportance data={proofOfPoint} />
      
      <AnalysisObservations />
    </div>
  );
};

export default ProofOfPoint;