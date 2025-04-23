import React from 'react';
import { colors } from '../../../utils/colors';

const AwarenessMetrics: React.FC = () => {
  return (
    <div className="mt-4 p-4 bg-white rounded shadow-sm" style={{ borderLeft: `4px solid ${colors.hiltonBlue}` }}>
      <h3 className="mb-2 text-lg font-medium" style={{ color: colors.hiltonBlue }}>Awareness and consideration metrics</h3>
      <p className="text-sm">
        Hilton's awareness (85%) and consideration (72%) metrics show a 13-point gap between these two measures.
        The conversion rate from awareness to consideration is 84.7% for Hilton and 81.9% for Marriott, a 2.8 percentage point difference.
        Frequent Travelers report the highest awareness (90%) and consideration (78%) scores for Hilton among all audience segments.
        Location (78%) and Service (76%) are the highest-scoring feature consideration drivers for Hilton, while Value (68%) scores lowest
        among the measured features. This correlates with observed price-to-worth perception metrics in the competitive analysis.
      </p>
    </div>
  );
};

export default AwarenessMetrics;