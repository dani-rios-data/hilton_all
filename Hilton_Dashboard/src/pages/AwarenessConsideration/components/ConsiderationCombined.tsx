import { YAxis } from 'recharts';

const maxValue = 100; // O calcular dinámicamente según los datos

            <YAxis 
              domain={[0, maxValue]} 
              tick={{ fill: '#6B7280', fontSize: 12 }}
              axisLine={{ stroke: '#E5E7EB', strokeWidth: 1 }}
              tickLine={{ stroke: '#E5E7EB' }}
              tickCount={6}
              tickFormatter={(value: number) => `${value}%`}
            /> 