import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { colors } from '../../../utils/colors';
import { AwarenessData, ConsiderationData, FtsRecallData } from '../../../types/data';

interface KeyTrendsSummaryProps {
  awarenessData: AwarenessData[];
  considerationData: ConsiderationData[];
  ftsRecallData: FtsRecallData[];
}

const KeyTrendsSummary: React.FC<KeyTrendsSummaryProps> = ({ 
  awarenessData, 
  considerationData,
  ftsRecallData 
}) => {
  
  // Procesamos los datos para generar la visualización integrada
  const trendData = useMemo(() => {
    const quarters = ['Q1 2023', 'Q2 2023', 'Q3 2023', 'Q4 2023'];
    
    return quarters.map(quarter => {
      // Obtener datos de awareness para Hilton (Unaided)
      const awarenessValue = awarenessData
        .filter(item => 
          item.quarter === quarter && 
          item.brand === 'Hilton' && 
          item.category === 'Unaided Awareness' &&
          item.audience === 'Total'
        )
        .reduce((acc, curr) => acc + (typeof curr.value === 'number' ? curr.value : 0), 0) / 
        (awarenessData.filter(item => 
          item.quarter === quarter && 
          item.brand === 'Hilton' && 
          item.category === 'Unaided Awareness' &&
          item.audience === 'Total'
        ).length || 1);
      
      // Obtener datos de consideración para Hilton
      const considerationValue = considerationData
        .filter(item => 
          item.quarter === quarter && 
          item.brand === 'Hilton' && 
          item.audience === 'Total'
        )
        .reduce((acc, curr) => acc + (typeof curr.value === 'number' ? curr.value : 0), 0) / 
        (considerationData.filter(item => 
          item.quarter === quarter && 
          item.brand === 'Hilton' && 
          item.audience === 'Total'
        ).length || 1);
      
      // Obtener datos de FTS para Hilton
      const ftsValue = ftsRecallData
        .filter(item => 
          item.quarter === quarter && 
          item.audience === 'Total'
        )
        .reduce((acc, curr) => acc + (typeof curr.value === 'number' ? curr.value : 0), 0) / 
        (ftsRecallData.filter(item => 
          item.quarter === quarter && 
          item.audience === 'Total'
        ).length || 1);
      
      return {
        quarter,
        awareness: Math.round(awarenessValue),
        consideration: Math.round(considerationValue),
        fts: Math.round(ftsValue)
      };
    });
  }, [awarenessData, considerationData, ftsRecallData]);
  
  // Personalizar el tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 shadow-sm rounded-md">
          <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p 
              key={`item-${index}`} 
              className="text-xs" 
              style={{ color: entry.color }}
            >
              <span className="font-medium">{entry.name}: </span>
              {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm h-[400px]">
      <h2 className="text-xl font-normal mb-6 text-[#002F61] font-['Georgia']">
        Tendencias clave de rendimiento (2023)
      </h2>
      <div className="h-[320px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={trendData}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
          >
            <defs>
              <linearGradient id="colorAwareness" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={colors.hiltonBlue || "#002F61"} stopOpacity={0.8}/>
                <stop offset="95%" stopColor={colors.hiltonBlue || "#002F61"} stopOpacity={0.2}/>
              </linearGradient>
              <linearGradient id="colorConsideration" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0284c7" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#0284c7" stopOpacity={0.2}/>
              </linearGradient>
              <linearGradient id="colorFts" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#7c3aed" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#7c3aed" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="quarter" 
              tick={{ fontSize: 12, fill: '#6B7280' }}
              axisLine={{ stroke: '#E5E7EB' }}
              tickLine={false}
            />
            <YAxis 
              tickFormatter={(value) => `${value}%`}
              tick={{ fontSize: 11, fill: '#6B7280' }}
              axisLine={false}
              tickLine={false}
            />
            <CartesianGrid 
              stroke="#EDF2F7" 
              vertical={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle" 
              iconSize={8}
              wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }}
            />
            <Area 
              type="monotone" 
              dataKey="awareness" 
              name="Notoriedad" 
              stroke={colors.hiltonBlue || "#002F61"} 
              fillOpacity={1} 
              fill="url(#colorAwareness)" 
              activeDot={{ r: 6 }}
            />
            <Area 
              type="monotone" 
              dataKey="consideration" 
              name="Consideración" 
              stroke="#0284c7" 
              fillOpacity={1} 
              fill="url(#colorConsideration)" 
              activeDot={{ r: 6 }}
            />
            <Area 
              type="monotone" 
              dataKey="fts" 
              name="First-to-mind" 
              stroke="#7c3aed" 
              fillOpacity={1} 
              fill="url(#colorFts)" 
              activeDot={{ r: 6 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default KeyTrendsSummary; 