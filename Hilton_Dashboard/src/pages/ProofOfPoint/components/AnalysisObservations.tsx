import React from 'react';
import { colors } from '../../../utils/colors';

const AnalysisObservations: React.FC = () => {
  return (
    <div className="mt-4 p-4 bg-white rounded shadow-sm" style={{ borderLeft: `4px solid ${colors.hiltonBlue}` }}>
      <h3 className="mb-2 text-lg font-medium" style={{ color: colors.hiltonBlue }}>Analysis observations</h3>
      <p className="text-sm">
        The data reveals that Middle Eastern markets report the highest satisfaction scores, with Saudi Arabia at 41%. 
        "Relax & Recharge" scores 62%, making it the most important feature across all measured audience segments.
        The Zillennials segment shows a satisfaction rate of 30%, which is 1 percentage point higher than the global average (29%). 
        This indicates a slight variation in satisfaction metrics between demographic segments.
      </p>
    </div>
  );
};

export default AnalysisObservations;