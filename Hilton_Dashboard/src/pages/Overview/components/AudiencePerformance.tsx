import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ConsiderationData } from '../../../types/data';

interface AudiencePerformanceProps {
  data: ConsiderationData[];
}

const AudiencePerformance: React.FC<AudiencePerformanceProps> = ({ data }) => {
  const processedData = data
    .filter(item => item.quarter === 'Q4 2023' && item.brand === 'Hilton')
    .map(item => ({
      audience: item.audience,
      value: item.value
    }));

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-[400px]">
      <h2 className="text-xl font-normal mb-6 text-[#002F61] font-['Georgia']">
        Audience Performance (Hilton)
      </h2>
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={processedData}
            margin={{ top: 10, right: 30, left: 20, bottom: 20 }}
            barSize={30}
          >
            <XAxis 
              dataKey="audience" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
              dy={8}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#666' }}
              dx={-8}
            />
            <Tooltip
              cursor={false}
              contentStyle={{
                backgroundColor: '#fff',
                border: '1px solid #e5e7eb',
                borderRadius: '4px',
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
              }}
              formatter={(value: number) => [`${value}%`, 'Consideration']}
            />
            <Bar 
              dataKey="value" 
              fill="#002F61"
              radius={[4, 4, 0, 0]}
              name="Consideration"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AudiencePerformance;