import React from 'react';

interface CustomTooltipProps {
  active?: boolean;
  payload?: any[];
  label?: string;
}

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-white border border-gray-200 shadow-sm" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
        <p className="text-sm font-bold">{label}</p>
        {payload.map((entry, index) => (
          <p key={`tooltip-${index}`} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}${entry.name.includes('Worth') || entry.name.includes('Price') || entry.name === 'hilton' || entry.name === 'marriott' || entry.name.includes('Association') || entry.name.includes('Recall') || entry.name.includes('awareness') || entry.name.includes('consideration') ? '%' : ''}`}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default CustomTooltip;