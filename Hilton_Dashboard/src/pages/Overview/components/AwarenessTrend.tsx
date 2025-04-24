import React, { useMemo } from 'react';
import { AwarenessData } from '../../../types/data';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { colors } from '../../../utils/colors';

interface AwarenessTrendProps {
  data: AwarenessData[];
}

const AwarenessTrend: React.FC<AwarenessTrendProps> = ({ data }) => {
  // Process real data
  const chartData = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }

    // Filter only unaided awareness data
    const awarenessData = data.filter(item => item.category === 'Unaided Awareness');
    
    // Get all available quarters
    const quarters = [...new Set(awarenessData.map(item => item.quarter))].sort();
    
    // Create an object to group data from different brands by quarter
    return quarters.map(quarter => {
      // Filter data by quarter
      const quarterData = awarenessData.filter(item => item.quarter === quarter);
      
      // Group by brand
      const brands = [...new Set(quarterData.map(item => item.brand))];
      const result: {[key: string]: any} = { quarter };
      
      // For each brand, calculate the average awareness
      brands.forEach(brand => {
        const brandData = quarterData.filter(item => item.brand === brand);
        if (brandData.length > 0) {
          const total = brandData.reduce((sum, item) => {
            const value = typeof item.value === 'string' 
              ? parseFloat(item.value.toString().replace(/%/g, '')) 
              : item.value;
            return sum + (typeof value === 'number' ? value : 0);
          }, 0);
          result[brand.toLowerCase()] = Math.round(total / brandData.length);
        }
      });
      
      return result;
    });
  }, [data]);

  // Calculate max value and set domain upper bound
  const maxValue = useMemo(() => {
    if (!chartData || chartData.length === 0) return 100;
    
    let max = 0;
    chartData.forEach(item => {
      Object.keys(item).forEach(key => {
        if (key !== 'quarter' && item[key] > max) {
          max = item[key];
        }
      });
    });
    
    return Math.min(100, Math.ceil(max) + 5); // 5 points higher than max, capped at 100
  }, [chartData]);
  
  if (chartData.length === 0) {
    return <div className="card">
      <h3 className="card-title">Awareness Trend</h3>
      <p>No data available</p>
    </div>;
  }
  
  return (
    <div className="card">
      <h3 className="card-title">Awareness Trend</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          <XAxis 
            dataKey="quarter" 
            tick={{ fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={{ stroke: '#E5E7EB' }}
          />
          <YAxis 
            domain={[0, maxValue]} 
            tick={{ fill: '#6B7280' }}
            axisLine={{ stroke: '#E5E7EB' }}
            tickLine={{ stroke: '#E5E7EB' }}
          />
          <Tooltip 
            formatter={(value: number) => [`${value}%`, 'Awareness']}
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '4px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
            }}
          />
          <Legend 
            wrapperStyle={{ paddingTop: '15px' }}
            iconType="circle"
          />
          <Line 
            type="monotone" 
            dataKey="hilton" 
            name="Hilton" 
            stroke={colors.hiltonBlue} 
            strokeWidth={3}
            dot={{ r: 5, fill: colors.hiltonBlue, strokeWidth: 0 }}
            activeDot={{ r: 7, fill: colors.hiltonBlue }}
            animationDuration={1500}
          />
          <Line 
            type="monotone" 
            dataKey="marriott" 
            name="Marriott" 
            stroke={colors.turquoise} 
            strokeWidth={3}
            dot={{ r: 5, fill: colors.turquoise, strokeWidth: 0 }}
            activeDot={{ r: 7, fill: colors.turquoise }}
            animationDuration={1500}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AwarenessTrend;