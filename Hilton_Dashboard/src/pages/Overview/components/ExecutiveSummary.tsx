import React from 'react';
import { colors } from '../../../utils/colors';

const ExecutiveSummary: React.FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow col-span-2">
      <h3 className="text-lg font-medium mb-4">Executive Summary</h3>
      
      <div className="prose">
        <p className="mb-3">
          Analysis of Hilton brand data shows a significant increase in brand awareness
          and consideration across all key audience segments.
        </p>
        
        <p className="mb-3">
          The "For The Stay" campaign has driven a <span className="font-semibold">7% increase</span> in brand 
          recognition, especially among Millennials and Generation Z.
        </p>
        
        <p className="mb-3">
          Value perception has improved by <span className="font-semibold">0.3 points</span>, primarily due to
          improvements in digital experience and renovation of key properties.
        </p>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-md border-l-4" style={{ borderColor: colors.primary }}>
          <h4 className="font-medium text-base mb-2">Key Findings:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Brand awareness exceeds competitors by 4 percentage points</li>
            <li>Business travelers show the highest consideration rate (76%)</li>
            <li>Association with "superior service" grew by 9% across all segments</li>
            <li>Digital marketing investment produced a 3.2x ROI</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveSummary;