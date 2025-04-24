import React from 'react';
import { colors } from '../../utils/colors';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white border border-border-color shadow-sm rounded" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
        {label && <p className="text-sm font-medium mb-1">{label}</p>}
        {payload.map((entry, index) => (
          <p key={`tooltip-${index}`} className="text-sm" style={{ color: entry.payload?.fill || entry.color }}>
            {`${entry.name}: ${entry.value} (${entry.value}%)`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default CustomTooltip;