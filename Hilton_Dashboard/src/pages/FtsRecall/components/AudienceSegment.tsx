import React, { useMemo } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts';
import { FtsRecallData } from '../../../types/data';
import { colors } from '../../../utils/colors';
import CustomTooltip from '../../../components/ui/CustomTooltip';

interface AudienceSegmentProps {
  data: FtsRecallData[];
}

const AudienceSegment: React.FC<AudienceSegmentProps> = ({ data }) => {
  // Procesar los datos recibidos del CSV para el último trimestre
  const audienceData = useMemo(() => {
    if (!data || data.length === 0) {
      console.log("No FTS data available for AudienceSegment chart");
      return [];
    }

    // Filtrar datos para el último trimestre (ej. Q4 2023) y excluir 'Total'
    const latestQuarter = 'Q4 2023'; // O determinar dinámicamente el último trimestre si es necesario
    const latestData = data.filter(item => 
      item.quarter === latestQuarter && 
      item.audience !== 'Total' // Excluir la audiencia 'Total'
    );

    // Mapear al formato requerido por la gráfica
    return latestData.map(item => ({
      name: item.audience, // Usar el nombre de la audiencia del CSV
      ftsAssociation: item.value, // Usar el valor de FTS Association del CSV
      commRecall: item.communicationRecall // Usar el valor de Communication Recall del CSV
    }));

  }, [data]);

  // Calcular el valor máximo dinámicamente para el eje Y
  const maxValue = useMemo(() => {
    if (!audienceData || audienceData.length === 0) return 70; // Valor por defecto

    let max = 0;
    audienceData.forEach(item => {
      if (item.ftsAssociation > max) max = item.ftsAssociation;
      if (item.commRecall > max) max = item.commRecall;
    });
    
    // Añadir un pequeño margen superior, redondeado a los siguientes 10
    return Math.ceil(max / 10) * 10 + 5; 
  }, [audienceData]);

  if (audienceData.length === 0) {
    return (
      <div className="p-4 bg-white rounded shadow-sm">
        <div className="mb-3">
          <h3 className="text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
            FTS Association & Communication Recall
          </h3>
          <p className="text-sm text-gray-600 mt-1">Audience Segment (Q4 2023)</p>
        </div>
        <div className="h-64 flex items-center justify-center text-gray-500">
          No data available for Q4 2023 segments.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <div className="mb-3">
        <h3 className="text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
          FTS Association & Communication Recall
      </h3>
        <p className="text-sm text-gray-600 mt-1">Audience Segment (Q4 2023)</p>
      </div>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={audienceData}
            margin={{ top: 5, right: 30, left: 10, bottom: 25 }}
          >
            <XAxis 
              dataKey="name" 
              tick={{ fill: '#6B7280', fontSize: 11 }}
              axisLine={false}
            />
            <YAxis 
              domain={[0, maxValue]}
              tick={{ fill: '#6B7280', fontSize: 11 }}
              axisLine={false}
              tickFormatter={(value) => `${value}%`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              wrapperStyle={{ fontSize: '11px' }}
              iconType="circle"
            />
            <Bar 
              name="FTS Association" 
              dataKey="ftsAssociation"
              fill={colors.hiltonBlue} 
              barSize={20}
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              name="Communication Recall" 
              dataKey="commRecall" 
              fill={colors.turquoise}
              barSize={20}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AudienceSegment;