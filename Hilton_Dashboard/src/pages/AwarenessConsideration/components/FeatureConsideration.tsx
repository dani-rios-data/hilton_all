import React from 'react';
import { ConsiderationData } from '../../../types/data';
import { colors } from '../../../utils/colors';

interface FeatureConsiderationProps {
  data: ConsiderationData[];
}

const FeatureConsideration: React.FC<FeatureConsiderationProps> = ({ data }) => {
  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Consideration by Feature
      </h3>
      <div className="h-64 flex flex-col items-center justify-center text-gray-700">
        <div className="text-center max-w-md">
          <p className="mb-4">
            <strong>Data Not Available</strong>
          </p>
          <p className="text-sm text-gray-500">
            The dataset does not contain feature-specific consideration metrics. 
            This chart requires detailed attribute-level data for hotel features such as 
            Loyalty, Rooms, Location, Service, and Value.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeatureConsideration;