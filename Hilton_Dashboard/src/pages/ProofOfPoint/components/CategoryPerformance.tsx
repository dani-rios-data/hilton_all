import React from 'react';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  Tooltip 
} from 'recharts';
import { ProofOfPointData } from '../../../types/data';
import { colors, pieColors } from '../../../utils/colors';
import { renderCustomizedLabel } from '../../../components/ui/ChartComponents';

interface CategoryPerformanceProps {
  data: ProofOfPointData[];
}

const CategoryPerformance: React.FC<CategoryPerformanceProps> = ({ data }) => {
  // Process data - in a real implementation, this would process the ProofOfPointData
  // For demo purposes, using static data matching the mockup
  const categoryData = [
    { name: 'Hotel Features', value: 0.43 },
    { name: 'Satisfaction', value: 0.44 },
    { name: 'Importance', value: 0.13 }
  ];

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Performance by category
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              outerRadius={85}
              innerRadius={55}
              dataKey="value"
              labelLine={false}
              label={renderCustomizedLabel}
              paddingAngle={3}
            >
              {categoryData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={pieColors[index % pieColors.length]} 
                  strokeWidth={1}
                  stroke={colors.white}
                />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => `${(value * 100).toFixed(1)}%`} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default CategoryPerformance;