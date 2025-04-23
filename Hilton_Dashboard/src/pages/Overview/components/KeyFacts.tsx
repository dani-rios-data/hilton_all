import React from 'react';
import { colors } from '../../../utils/colors';

const KeyFacts: React.FC = () => {
  const facts = [
    {
      title: 'Highest Brand Awareness Among Millennials',
      value: '88%',
      description: 'Millennials show the highest brand recognition among all demographic segments'
    },
    {
      title: 'Digital Marketing ROI',
      value: '3.2x',
      description: 'Average return on investment in digital campaigns during the last quarter'
    },
    {
      title: 'Customer Satisfaction in Renovated Properties',
      value: '92%',
      description: 'Satisfaction level reported in hotels that completed renovations in 2023'
    }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-medium mb-4">Key Facts</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {facts.map((fact, index) => (
          <div key={index} className="border p-4 rounded-md">
            <h4 className="text-base font-medium mb-2">{fact.title}</h4>
            <div className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>
              {fact.value}
            </div>
            <p className="text-sm text-gray-600">{fact.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyFacts;