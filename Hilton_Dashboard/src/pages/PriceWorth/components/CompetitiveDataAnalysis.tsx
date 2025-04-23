import React from 'react';
import { colors } from '../../../utils/colors';

const CompetitiveDataAnalysis: React.FC = () => {
  return (
    <div className="mt-4 p-4 bg-white rounded shadow-sm" style={{ borderLeft: `4px solid ${colors.hiltonBlue}` }}>
      <h3 className="mb-2 text-lg font-medium" style={{ color: colors.hiltonBlue }}>Competitive data analysis</h3>
      <p className="text-sm">
        Millennials show a 31% worth perception for Hilton compared to 27.6% for Marriott, a 3.4 percentage point difference.
        The value-to-price ratio for Hilton increased from 31.9% in Q1 2023 to 40.6% in Q4 2023, surpassing Marriott's 38.5% in the same period.
        Hilton's price perception (60.7%) remains higher than Marriott's (55%), with a corresponding higher worth perception.
        The data indicates a steady improvement in Hilton's value metrics relative to competitors in the luxury hotel segment.
      </p>
    </div>
  );
};

export default CompetitiveDataAnalysis;