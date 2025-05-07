import React, { useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
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
  const trendData = useMemo(() => {
    if (!data || data.length === 0) {
      return [];
    }

    // Obtener trimestres únicos y ordenarlos cronológicamente
    const quarters = [...new Set(data.map(item => item.quarter))]
      .sort((a, b) => {
        const [yearA, qA] = a.split(' ');
        const [yearB, qB] = b.split(' ');
        return yearA.localeCompare(yearB) || qA.localeCompare(qB);
      });
    
    // Función para procesar valores porcentuales
    const processValue = (value: string | number): number => {
      if (typeof value === 'string') {
        return parseFloat(value.replace('%', ''));
      }
      return value;
    };

    return quarters.map(quarter => {
      // Tomar el primer registro de cada trimestre (ya que los valores son los mismos para todas las audiencias)
      const quarterData = data.find(item => item.quarter === quarter);
      
      if (!quarterData) return null;

      return {
        name: quarter,
        hiltonPrice: processValue(quarterData.hiltonPrice),
        hiltonWorth: processValue(quarterData.hiltonWorth),
        marriottPrice: processValue(quarterData.marriottPrice),
        marriottWorth: processValue(quarterData.marriottWorth)
      };
    }).filter((item): item is NonNullable<typeof item> => item !== null);
  }, [data]);

  if (trendData.length === 0) {
    return (
      <div className="p-4 bg-white rounded shadow-sm">
        <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
          Price/Worth Over Time
        </h3>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Price/Worth Over Time
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trendData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6B7280', fontSize: 11 }}
              padding={{ left: 20, right: 20 }}
            />
            <YAxis 
              domain={[0, 70]} 
              tick={{ fill: '#6B7280', fontSize: 11 }}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              iconSize={8}
              wrapperStyle={{ fontSize: '11px' }}
            />
            <Line 
              name="Hilton Price" 
              type="monotone" 
              dataKey="hiltonPrice" 
              stroke={colors.priceWorth.hiltonPrice} 
              {...lineConfig}
            />
            <Line 
              name="Hilton Worth" 
              type="monotone" 
              dataKey="hiltonWorth" 
              stroke={colors.priceWorth.hiltonWorth} 
              {...lineConfig}
            />
            <Line 
              name="Marriott Price" 
              type="monotone" 
              dataKey="marriottPrice" 
              stroke={colors.priceWorth.marriottPrice} 
              {...lineConfig}
            />
            <Line 
              name="Marriott Worth" 
              type="monotone" 
              dataKey="marriottWorth" 
              stroke={colors.priceWorth.marriottWorth} 
              {...lineConfig}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default PriceWorthTrend;