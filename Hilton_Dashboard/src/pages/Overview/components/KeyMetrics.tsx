import React from 'react';
import { colors } from '../../../utils/colors';

const KeyMetrics: React.FC = () => {
  const metrics = [
    {
      title: 'Awareness',
      value: '86%',
      change: '+4%',
      positive: true,
      description: 'Unaided brand awareness'
    },
    {
      title: 'Consideration',
      value: '72%',
      change: '+3%',
      positive: true,
      description: 'Brand consideration among target audience'
    },
    {
      title: 'FTS Recall',
      value: '65%',
      change: '+7%',
      positive: true,
      description: 'For The Stay campaign recall'
    },
    {
      title: 'Price Worth',
      value: '4.2/5',
      change: '+0.3',
      positive: true,
      description: 'Value perception rating'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {metrics.map((metric, index) => (
        <div key={index} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-gray-500 font-medium">{metric.title}</h3>
            <span 
              className={`text-sm font-medium px-2 py-1 rounded-full ${
                metric.positive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}
            >
              {metric.change}
            </span>
          </div>
          
          <div className="flex items-end space-x-2 mb-2">
            <span className="text-2xl font-bold" style={{ color: colors.primary }}>
              {metric.value}
            </span>
          </div>
          
          <p className="text-sm text-gray-600">{metric.description}</p>
        </div>
      ))}
    </div>
  );
};

export default KeyMetrics;
