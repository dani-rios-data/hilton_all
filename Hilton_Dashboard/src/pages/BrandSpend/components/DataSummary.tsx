import React from 'react';
import { colors } from '../../../utils/colors';
import { useCSVData } from '../../../hooks/useCSVData';

const DataSummary: React.FC = () => {
  const { brandSpend } = useCSVData();

  // Calcular estadísticas clave
  const totalSpend = brandSpend.reduce((sum, item) => sum + item.spend, 0);
  const activeChannels = brandSpend.filter(item => item.spend > 0).length;
  const inactiveChannels = brandSpend.filter(item => item.spend === 0).length;
  
  // Categorizar los canales
  const digitalChannels = ['LF Social', 'UF Social', 'Branded Paid Search', 'Generic Paid Search', 
                         'Sponsored Meta Search', 'Traditional Meta Search', 'Brand Retargeting Display',
                         'NonBrand LF Display', 'NonBrand UF Display', 'Travel Ads', 'Native', 'Affiliate',
                         'Brand UF Display', 'Brand LF Display', 'Enterprise OLV'];
  
  const traditionalChannels = ['Enterprise Linear TV', 'Total OOH', 'Total Audio', 'Cinema', 'Total Radio', 'Brand Linear TV'];
  
  const digitalSpend = brandSpend
    .filter(item => digitalChannels.includes(item.brand))
    .reduce((sum, item) => sum + item.spend, 0);
  
  const traditionalSpend = brandSpend
    .filter(item => traditionalChannels.includes(item.brand))
    .reduce((sum, item) => sum + item.spend, 0);
  
  const digitalPercentage = Math.round((digitalSpend / totalSpend) * 100);
  const traditionalPercentage = Math.round((traditionalSpend / totalSpend) * 100);

  return (
    <div className="mt-8 p-6 bg-white rounded shadow-sm" style={{ borderLeft: `4px solid ${colors.hiltonBlue}` }}>
      <h3 className="mb-4 text-lg font-medium" style={{ color: colors.hiltonBlue }}>Brand Spend Analysis</h3>
      
      <div className="space-y-4 text-sm">
        <p>
          <strong>Channel Distribution:</strong> Hilton's marketing strategy leverages {activeChannels} active channels out of {activeChannels + inactiveChannels} total channels tracked. 
          This diverse approach ensures comprehensive market coverage while maintaining focus on high-performing channels.
        </p>
        
        <p>
          <strong>Digital vs Traditional Balance:</strong> Digital channels represent {digitalPercentage}% of the total budget (${(digitalSpend/1000000).toFixed(1)}M), 
          while traditional media accounts for {traditionalPercentage}% (${(traditionalSpend/1000000).toFixed(1)}M). 
          This distribution demonstrates Hilton's digital-first strategy while maintaining significant traditional media presence.
        </p>
        
        <p>
          <strong>Investment Concentration:</strong> Enterprise Linear TV ($32.7M) and Generic Paid Search ($29.1M) 
          collectively represent {Math.round(((32697175 + 29146995) / totalSpend) * 100)}% of the total marketing investment. 
          This significant allocation indicates these channels are core pillars of Hilton's marketing strategy.
        </p>
        
        <p>
          <strong>Social Media Focus:</strong> With a combined investment of ${((20422096 + 16081402)/1000000).toFixed(1)}M 
          in LF Social ($20.4M) and UF Social ($16.1M), social media represents one of Hilton's primary digital engagement channels, 
          accounting for {Math.round(((20422096 + 16081402) / totalSpend) * 100)}% of the total marketing budget.
        </p>
        
        <p>
          <strong>Search Strategy:</strong> Hilton invests heavily in search marketing with ${((4881832 + 29146995)/1000000).toFixed(1)}M 
          split between Branded ($4.9M) and Generic ($29.1M) paid search, highlighting the importance of both brand protection 
          and new customer acquisition in their digital strategy.
        </p>
      </div>
    </div>
  );
};

export default DataSummary;