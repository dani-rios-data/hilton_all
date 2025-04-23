import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { PriceWorthData } from '../../../types/data';
import { colors } from '../../../utils/colors';
import CustomTooltip from '../../../components/ui/CustomTooltip';
import { lineConfig } from '../../../components/ui/ChartComponents';

interface PriceWorthTrendProps {
  data: PriceWorthData[];
}

const PriceWorthTrend: React.FC<PriceWorthTrendProps> = ({ data }) => {
  // Process data - in a real implementation, this would process the PriceWorthData
  // For demo purposes, using static data matching the mockup
  const trendData = [
    { name: 'Q4 2022', hiltonPrice: 63, marriottPrice: 55, hiltonWorth: 22.3, marriottWorth: 21 },
    { name: 'Q1 2023', hiltonPrice: 58.3, marriottPrice: 54.3, hiltonWorth: 19, marriottWorth: 18.7 },
    { name: 'Q2 2023', hiltonPrice: 59, marriottPrice: 54.7, hiltonWorth: 23.3, marriottWorth: 22 },
    { name: 'Q3 2023', hiltonPrice: 61, marriottPrice: 56.3, hiltonWorth: 23.7, marriottWorth: 22 },
    { name: 'Q4 2023', hiltonPrice: 61.3, marriottPrice: 54.3, hiltonWorth: 25, marriottWorth: 20.7 }
  ];

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Price/Worth trend by quarter
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trendData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6B7280' }}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis 
              domain={[0, 70]} 
              tick={{ fill: '#6B7280' }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={36} />
            <Line 
              name="Hilton Price" 
              type="monotone" 
              dataKey="hiltonPrice" 
              stroke={colors.hiltonBlue} 
              {...lineConfig}
            />
            <Line 
              name="Hilton Worth" 
              type="monotone" 
              dataKey="hiltonWorth" 
              stroke={colors.turquoise} 
              {...lineConfig}
            />
            <Line 
              name="Marriott Price" 
              type="monotone" 
              dataKey="marriottPrice" 
              stroke={colors.blueTint} 
              strokeDasharray="5 5"
              {...lineConfig}
            />
            <Line 
              name="Marriott Worth" 
              type="monotone" 
              dataKey="marriottWorth" 
              stroke={colors.tealTint} 
              strokeDasharray="5 5"
              {...lineConfig}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceWorthTrend;