import React from 'react';
import { colors } from '../../../utils/colors';

const BrandAssociationData: React.FC = () => {
  return (
    <div className="mt-4 p-4 bg-white rounded shadow-sm" style={{ borderLeft: `4px solid ${colors.hiltonBlue}` }}>
      <h3 className="mb-2 text-lg font-medium" style={{ color: colors.hiltonBlue }}>Brand association data points</h3>
      <p className="text-sm">
        The "For The Stay" campaign brand association increased from 32% in Q1 2023 to 58% in Q1 2024, representing a 26 percentage point increase.
        Frequent Travelers show the highest level of brand association at 62%, followed by Business Travelers at 58%.
        Communication recall metrics track closely with association rates across all measured segments, with a consistent 3-5 point gap.
        The data shows a correlation between FTS association and satisfaction metrics across all audience segments, with similar growth patterns
        observed throughout 2023 and into early 2024.
      </p>
    </div>
  );
};

export default BrandAssociationData;