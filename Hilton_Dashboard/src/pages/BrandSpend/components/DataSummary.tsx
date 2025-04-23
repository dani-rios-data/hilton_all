import React from 'react';
import { colors } from '../../../utils/colors';

const DataSummary: React.FC = () => {
  return (
    <div className="mt-4 p-4 bg-white rounded shadow-sm" style={{ borderLeft: `4px solid ${colors.hiltonBlue}` }}>
      <h3 className="mb-2 text-lg font-medium" style={{ color: colors.hiltonBlue }}>Data summary</h3>
      <p className="text-sm">
        Enterprise Linear TV ($32.7M) and Generic Paid Search ($29.1M) account for the highest marketing spend. 
        Digital channels including Social Media (LF Social: $20.4M, UF Social: $16.1M) and Meta Search ($32.1M combined) 
        represent significant portions of the total budget. These top marketing categories comprise 
        approximately 60% of the total marketing expenditure. Notable differences exist between 
        traditional and digital marketing allocations, with a balanced approach across various audience targeting methods.
      </p>
    </div>
  );
};

export default DataSummary;