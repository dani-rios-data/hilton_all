import React, { useMemo } from 'react';
import { AwarenessData } from '../../../types/data';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { colors } from '../../../utils/colors';

interface AudiencePerformanceProps {
  data: AwarenessData[];
}

// Sample data structure for reference
const sampleData = [
  { name: 'Business Travelers', value: 76 },
  { name: 'Leisure Travelers', value: 79 },
  { name: 'Luxury Travelers', value: 82 },
  { name: 'Millennials', value: 72 }
];

const AudiencePerformance: React.FC<AudiencePerformanceProps> = ({ data }) => {
  const chartData = useMemo(() => {
    if (!data || data.length === 0) {
      return sampleData;
    }

    // Filter out the most recent quarter data for Hilton
    // Find the most recent quarter and year in data
    const hiltonData = data.filter(item => item.brand === 'Hilton');
    if (hiltonData.length === 0) return sampleData;

    // Ensure we have valid year values before calculating max
    const years = hiltonData.map(item => item.year).filter((year): year is number => 
      year !== undefined && !isNaN(year)
    );
    
    if (years.length === 0) return sampleData;
    
    const latestYear = Math.max(...years);
    
    // Filter items for the latest year that have a valid quarter value
    const itemsWithQuarter = hiltonData
      .filter(item => item.year === latestYear && item.quarter)
      .map(item => ({
        ...item,
        quarterNum: item.quarter ? parseInt(item.quarter.replace('Q', '')) : 0
      }));
    
    if (itemsWithQuarter.length === 0) return sampleData;
    
    const latestQuarter = Math.max(...itemsWithQuarter.map(item => item.quarterNum));
    
    // Filter data for the latest quarter and year
    const latestData = hiltonData.filter(
      item => item.year === latestYear && 
      item.quarter === `Q${latestQuarter}` &&
      item.category === 'Unaided Awareness'
    );

    if (latestData.length === 0) return sampleData;

    // Group the data by audience
    const audiences = [...new Set(latestData.map(item => item.audience).filter(Boolean))];
    return audiences.map(audience => {
      const audienceData = latestData.filter(item => item.audience === audience);
      const total = audienceData.reduce((sum, item) => sum + (item.value || 0), 0);
      const average = Math.round(total / audienceData.length);
      
      return {
        name: audience,
        value: average
      };
    });
  }, [data]);

  // Calculate max value for domain
  const maxValue = useMemo(() => {
    if (!chartData || chartData.length === 0) return 100;
    
    const max = Math.max(...chartData.map(item => item.value));
    return Math.min(100, Math.ceil(max) + 5);
  }, [chartData]);

  return (
    <div className="card">
      <h3 className="card-title">Audience Performance (Hilton)</h3>
      
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          <XAxis 
            dataKey="name" 
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
          <Bar 
            dataKey="value" 
            fill={colors.primary} 
            name="Awareness" 
            radius={[4, 4, 0, 0]}
            animationDuration={1500}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AudiencePerformance;