import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { ProofOfPointData } from '../../../types/data';
import { colors } from '../../../utils/colors';

interface TopCountriesProps {
  data: ProofOfPointData[];
}

const TopCountries: React.FC<TopCountriesProps> = ({ data }) => {
  // Process data - in a real implementation, this would process the ProofOfPointData
  // For demo purposes, using static data matching the mockup
  const countryData = [
    { name: 'Saudi Arabia', value: 0.41 },
    { name: 'India', value: 0.34 },
    { name: 'United States', value: 0.33 },
    { name: 'UAE', value: 0.33 },
    { name: 'UK', value: 0.26 }
  ];

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Top performing countries
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={countryData}
            margin={{ top: 5, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="name" tick={{ fill: '#6B7280' }} />
            <YAxis 
              domain={[0, 0.5]} 
              tickFormatter={value => `${(value * 100).toFixed(0)}%`} 
              tick={{ fill: '#6B7280' }} 
            />
            <Tooltip formatter={(value: number) => `${(value * 100).toFixed(1)}%`} />
            <Bar 
              dataKey="value" 
              fill={colors.hiltonBlue} 
              barSize={30}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TopCountries;