import React from 'react';
import { colors, pieColors } from '../../utils/colors';

// Common config for line charts (no dots on lines)
export const lineConfig = {
  strokeWidth: 2.5, 
  activeDot: { r: 6 },
  dot: false
};

// Customized label renderer for pie charts
export const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
  const RADIAN = Math.PI / 180;
  const radius = outerRadius * 1.15;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  
  const displayName = name.length > 12 ? name.substring(0, 10) + '...' : name;
  
  return (
    <text 
      x={x} 
      y={y} 
      fill={pieColors[index % pieColors.length]}
      textAnchor={x > cx ? 'start' : 'end'} 
      dominantBaseline="central"
      fontSize={11}
      fontWeight="500"
    >
      {`${displayName}: ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};