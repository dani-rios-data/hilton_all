import { 
    BrandSpendData, 
    ConsiderationData,
    AwarenessData,
    FtsRecallData,
    PriceWorthData,
    ProofOfPointData 
  } from '../types/data';
  
  // Process brand spend data for charts
  export const processBrandSpendData = (data: BrandSpendData[]) => {
    return data.map(item => ({
      ...item,
      spend: typeof item.spend === 'string' ? parseFloat(item.spend) : item.spend
    }));
  };
  
  // Process consideration data by hotel
  export const processConsiderationByHotel = (data: ConsiderationData[]) => {
    const hotels = [...new Set(data.map(item => item.Hotel))];
    
    return hotels.map(hotel => {
      const hotelData = data.filter(item => item.Hotel === hotel);
      const avgValue = hotelData.reduce((sum, item) => sum + item.Value, 0) / hotelData.length;
      
      return {
        name: hotel,
        value: Math.round(avgValue)
      };
    });
  };
  
  // Process awareness data for trend charts
  export const processAwarenessTrend = (data: AwarenessData[]) => {
    const quarters = [...new Set(data.map(item => item.Quarter))].sort();
    const hotels = [...new Set(data.map(item => item.Hotel))];
    
    return quarters.map(quarter => {
      const result: { name: string; [key: string]: string | number } = { name: quarter };
      
      hotels.forEach(hotel => {
        const hotelData = data.filter(item => item.Hotel === hotel && item.Quarter === quarter);
        const avgValue = hotelData.reduce((sum, item) => sum + parseFloat(item.Value), 0) / hotelData.length;
        result[hotel.toLowerCase()] = Math.round(avgValue);
      });
      
      return result;
    });
  };
  
  // Función para procesar datos de awareness
  export const processAwarenessData = (data: AwarenessData[]) => {
    return data.map(item => ({
      ...item,
      value: typeof item.value === 'string' ? parseFloat(item.value) : item.value,
      quarter: item.quarter || 'N/A'
    }));
  };
  
  // Función para procesar datos de consideration
  export const processConsiderationData = (data: ConsiderationData[]) => {
    return data.map(item => ({
      ...item,
      value: typeof item.value === 'string' ? parseFloat(item.value) : item.value,
      quarter: item.quarter || 'N/A'
    }));
  };
  
  // Función para procesar datos de recall
  export const processFtsRecallData = (data: FtsRecallData[]) => {
    return data.map(item => ({
      ...item,
      value: typeof item.value === 'string' ? parseFloat(item.value) : item.value
    }));
  };
  
  // Función para procesar datos de precio-valor
  export const processPriceWorthData = (data: PriceWorthData[]) => {
    return data.map(item => ({
      ...item,
      value: typeof item.value === 'string' ? parseFloat(item.value) : item.value
    }));
  };
  
  // Función para procesar datos de prueba de punto
  export const processProofOfPointData = (data: ProofOfPointData[]) => {
    return data.map(item => ({
      ...item,
      value: typeof item.value === 'string' ? parseFloat(item.value) : item.value
    }));
  };
  
  // Función utilitaria para agrupar datos por categoría
  export const groupDataByCategory = <T extends {category?: string}>(data: T[], categoryField: keyof T = 'category' as keyof T) => {
    return data.reduce((acc, curr) => {
      const category = curr[categoryField] as string || 'Unknown';
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(curr);
      return acc;
    }, {} as Record<string, T[]>);
  };
  
  // Función para calcular promedios por grupo
  export const calculateAverageByGroup = <T extends {[key: string]: any}>(
    data: T[], 
    groupField: keyof T, 
    valueField: keyof T
  ) => {
    const groups = data.reduce((acc, curr) => {
      const group = String(curr[groupField]);
      if (!acc[group]) {
        acc[group] = { sum: 0, count: 0 };
      }
      
      const value = typeof curr[valueField] === 'string' 
        ? parseFloat(curr[valueField] as string) 
        : (curr[valueField] as number);
        
      if (!isNaN(value)) {
        acc[group].sum += value;
        acc[group].count += 1;
      }
      
      return acc;
    }, {} as Record<string, { sum: number, count: number }>);
    
    return Object.entries(groups).map(([group, {sum, count}]) => ({
      group,
      average: count > 0 ? sum / count : 0
    }));
  };