import React, { useMemo } from 'react';
import { FtsRecallData } from '../../../types/data';
import { colors } from '../../../utils/colors';

interface DataOverviewProps {
  data: FtsRecallData[];
}

const DataOverview: React.FC<DataOverviewProps> = ({ data }) => {
  const stats = useMemo(() => {
    if (!data || data.length === 0) {
      return {
        totalAudiences: 0,
        latestQuarter: '',
        avgFtsAssociation: 0,
        avgCommRecall: 0,
        millennialsFts: 0,
        millennialsRecall: 0,
        genXFts: 0,
        genXRecall: 0,
        boomersFts: 0,
        boomersRecall: 0,
        quarterlyTrend: []
      };
    }

    // Obtener el último trimestre
    const quarters = [...new Set(data.map(item => item.quarter))].sort();
    const latestQuarter = quarters[quarters.length - 1];

    // Filtrar datos para el último trimestre
    const latestData = data.filter(item => item.quarter === latestQuarter);
    
    // Obtener datos de audiencia 'Total'
    const totalData = latestData.find(item => item.audience === 'Total');
    
    // Calcular valores para cada segmento demográfico en el último trimestre
    const millennialsData = latestData.find(item => item.audience === 'Millennials');
    const genXData = latestData.find(item => item.audience === 'Gen X');
    const boomersData = latestData.find(item => item.audience === 'Boomers');
    
    // Obtener datos trimestrales de Total para mostrar tendencia
    const totalTrend = data
      .filter(item => item.audience === 'Total')
      .sort((a, b) => {
        const [yearA, qA] = a.quarter.split(' ');
        const [yearB, qB] = b.quarter.split(' ');
        
        if (yearA !== yearB) {
          return parseInt(yearA) - parseInt(yearB);
        }
        const qNumA = parseInt(qA.replace('Q', ''));
        const qNumB = parseInt(qB.replace('Q', ''));
        return qNumA - qNumB;
      });
    
    return {
      totalAudiences: latestData.filter(item => item.audience !== 'Total').length,
      latestQuarter,
      avgFtsAssociation: totalData ? totalData.value : 0,
      avgCommRecall: totalData ? totalData.communicationRecall : 0,
      millennialsFts: millennialsData ? millennialsData.value : 0,
      millennialsRecall: millennialsData ? millennialsData.communicationRecall : 0,
      genXFts: genXData ? genXData.value : 0,
      genXRecall: genXData ? genXData.communicationRecall : 0,
      boomersFts: boomersData ? boomersData.value : 0,
      boomersRecall: boomersData ? boomersData.communicationRecall : 0,
      quarterlyTrend: totalTrend
    };
  }, [data]);

  if (!stats.latestQuarter) {
    return (
      <div className="p-4 bg-white rounded shadow-sm">
        <h3 className="mb-3 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
          Brand Association Overview
        </h3>
        <div className="h-72 flex items-center justify-center text-gray-500">
          No data available.
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded shadow-sm">
      <h3 className="mb-4 text-lg" style={{ fontFamily: 'Georgia, serif', color: colors.hiltonBlue }}>
        Brand Association Overview
      </h3>
      
      <div className="h-72 overflow-y-auto">
        <div className="space-y-6">
          {/* Datos generales */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Latest Data: {stats.latestQuarter}</h4>
            <p className="text-sm text-gray-700 mb-1">
              Overall "For The Stay" brand association across all audience segments is currently at <span className="font-medium">{stats.avgFtsAssociation}%</span>, 
              while the communication recall rate is <span className="font-medium">{stats.avgCommRecall}%</span>.
            </p>
          </div>
          
          {/* Datos por segmento */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Demographic Breakdown</h4>
            <ul className="space-y-3">
              <li className="text-sm text-gray-700">
                <span className="font-medium">Millennials:</span> FTS Association {stats.millennialsFts}% | Communication Recall {stats.millennialsRecall}%
              </li>
              <li className="text-sm text-gray-700">
                <span className="font-medium">Gen X:</span> FTS Association {stats.genXFts}% | Communication Recall {stats.genXRecall}%
              </li>
              <li className="text-sm text-gray-700">
                <span className="font-medium">Boomers:</span> FTS Association {stats.boomersFts}% | Communication Recall {stats.boomersRecall}%
              </li>
            </ul>
          </div>
          
          {/* Tendencia trimestral */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Quarterly Trend Analysis</h4>
            <p className="text-sm text-gray-700 mb-1">
              {stats.quarterlyTrend.length > 1 ? (
                <>
                  FTS Association has {
                    stats.quarterlyTrend[stats.quarterlyTrend.length - 1].value > stats.quarterlyTrend[0].value ? 
                    'increased' : 'decreased'
                  } from {stats.quarterlyTrend[0].value}% in {stats.quarterlyTrend[0].quarter} to {stats.quarterlyTrend[stats.quarterlyTrend.length - 1].value}% in {stats.quarterlyTrend[stats.quarterlyTrend.length - 1].quarter}.
                </>
              ) : 'Not enough historical data available to analyze trends.'}
            </p>
            <p className="text-sm text-gray-700">
              {stats.quarterlyTrend.length > 1 ? (
                <>
                  Communication Recall has {
                    stats.quarterlyTrend[stats.quarterlyTrend.length - 1].communicationRecall > stats.quarterlyTrend[0].communicationRecall ? 
                    'increased' : 'decreased'
                  } from {stats.quarterlyTrend[0].communicationRecall}% in {stats.quarterlyTrend[0].quarter} to {stats.quarterlyTrend[stats.quarterlyTrend.length - 1].communicationRecall}% in {stats.quarterlyTrend[stats.quarterlyTrend.length - 1].quarter}.
                </>
              ) : ''}
            </p>
          </div>
          
          {/* Highest performer */}
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Key Insights</h4>
            <p className="text-sm text-gray-700">
              {stats.millennialsFts > stats.genXFts && stats.millennialsFts > stats.boomersFts ? 
                'Millennials show the highest "For The Stay" brand association.' :
                stats.genXFts > stats.millennialsFts && stats.genXFts > stats.boomersFts ?
                'Gen X shows the highest "For The Stay" brand association.' :
                'Boomers show the highest "For The Stay" brand association.'
              }
            </p>
            <p className="text-sm text-gray-700 mt-1">
              {stats.millennialsRecall > stats.genXRecall && stats.millennialsRecall > stats.boomersRecall ? 
                'Millennials demonstrate the strongest communication recall.' :
                stats.genXRecall > stats.millennialsRecall && stats.genXRecall > stats.boomersRecall ?
                'Gen X demonstrates the strongest communication recall.' :
                'Boomers demonstrate the strongest communication recall.'
              }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataOverview; 