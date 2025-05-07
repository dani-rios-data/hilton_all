import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import { 
  BrandSpendData, 
  ConsiderationData, 
  AwarenessData, 
  FtsRecallData, 
  PriceWorthData, 
  ProofOfPointData 
} from '../types/data';

interface CSVDataState {
  brandSpend: BrandSpendData[];
  consideration: ConsiderationData[];
  awareness: AwarenessData[];
  ftsRecall: FtsRecallData[];
  priceWorth: PriceWorthData[];
  proofOfPoint: ProofOfPointData[];
  isLoading: boolean;
  error: string | null;
}

// Función para parsear valores porcentuales o numéricos
const parseValue = (value: string | number | null | undefined): number => {
  if (value === null || value === undefined) return 0;
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    // Eliminar el símbolo de porcentaje si existe
    const cleanValue = value.replace(/%/g, '').trim();
    const parsedValue = parseFloat(cleanValue);
    return isNaN(parsedValue) ? 0 : parsedValue;
  }
  return 0;
};

export const useCSVData = () => {
  const [data, setData] = useState<CSVDataState>({
    brandSpend: [],
    consideration: [],
    awareness: [],
    ftsRecall: [],
    priceWorth: [],
    proofOfPoint: [],
    isLoading: true,
    error: null
  });

  useEffect(() => {
    const loadCSVData = async () => {
      try {
        // Función para obtener y parsear archivos CSV
        const fetchCSV = async (filename: string) => {
          try {
            const response = await fetch(`/${filename}`);
            if (!response.ok) {
              throw new Error(`Failed to fetch ${filename}: ${response.status} ${response.statusText}`);
            }
            const text = await response.text();
            return new Promise<any[]>((resolve) => {
              Papa.parse(text, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: (results) => {
                  resolve(results.data as any[]);
                }
              });
            });
          } catch (error) {
            return [];
          }
        };

        // Obtener todos los CSV en paralelo
        const [
          brandSpendData,
          considerationData,
          awarenessData,
          ftsRecallData,
          priceWorthData,
          proofOfPointData
        ] = await Promise.all([
          fetchCSV('hilton_spend_by_brand.csv'),
          fetchCSV('final_consideration.csv'),
          fetchCSV('final_unaided_awareness.csv'),
          fetchCSV('fts_association_communication_recall.csv'),
          fetchCSV('price_worth_by_generation.csv'),
          fetchCSV('hilton_proof_of_point.csv')
        ]);

        // Procesar datos de consideración para que coincidan con el formato esperado
        const processedConsideration = (considerationData as any[]).map(item => {
          let value = item.Value || 0;
          value = parseValue(value);
          return {
            brand: item.Hotel,
            value: value, // Guardar como porcentaje entero (ej: 56)
            audience: item.Audience,
            quarter: item.Quarter,
            category: item.Feature
          };
        });

        // Procesar datos de awareness para que coincidan con el formato esperado
        const processedAwareness = (awarenessData as any[]).map(item => {
          let value = parseValue(item.Value);
          return {
            brand: item.Hotel,
            value: value, // Guardar como porcentaje entero (ej: 29)
            audience: item.Audience,
            quarter: item.Quarter,
            category: item.Feature
          };
        });

        // Procesar datos de gasto por marca
        const processedBrandSpend = (brandSpendData as any[]).map(item => {
          const brand = item.Brand || '';
          let spend = item.Spend || 0;
          if (typeof spend === 'string') {
            spend = parseFloat(spend.replace(/,/g, ''));
          }
          return {
            brand: brand,
            spend: isNaN(spend) ? 0 : spend,
            year: 2023, // Valor predeterminado
            quarter: "Q4", // Valor predeterminado
            category: "Marketing"
          };
        });

        // Procesar datos de FTS Recall
        const processedFtsRecall = (ftsRecallData as any[]).map(item => {
          const ftsValue = parseValue(item["FTS Association (%)"]);
          const commRecall = parseValue(item["Communication Recall (%)"]);
          return {
            value: ftsValue, // Guardar como porcentaje entero (ej: 19)
            audience: item.Audience,
            quarter: item.Quarter,
            communicationRecall: commRecall // Guardar como porcentaje entero (ej: 44)
          };
        });

        // Procesar datos de price worth
        const processedPriceWorth = (priceWorthData as any[]).map(item => {
          return {
            audience: item.Audience,
            quarter: item.Trimestre,
            hiltonPrice: parseValue(item["Hilton Price"]),
            marriottPrice: parseValue(item["Marriott Price"]),
            hiltonWorth: parseValue(item["Hilton Worth"]),
            marriottWorth: parseValue(item["Marriott Worth"])
          };
        });

        // Procesar datos de proof of point
        const processedProofOfPoint = (proofOfPointData as any[]).map(item => {
          let value = parseValue(item.Percentage);
          return {
            brand: "Hilton", // Valor predeterminado si no está presente
            value: value,
            audience: item.Audience,
            country: item.Country,
            category: item.Category,
            subcategory: item.Subcategory
          };
        });

        // Configurar los datos procesados
        setData({
          brandSpend: processedBrandSpend as BrandSpendData[],
          consideration: processedConsideration as ConsiderationData[],
          awareness: processedAwareness as AwarenessData[],
          ftsRecall: processedFtsRecall as FtsRecallData[],
          priceWorth: processedPriceWorth as PriceWorthData[],
          proofOfPoint: processedProofOfPoint as ProofOfPointData[],
          isLoading: false,
          error: null
        });
      } catch (error) {
        setData(prev => ({
          ...prev,
          isLoading: false,
          error: 'Failed to load data. Please try again.'
        }));
      }
    };

    loadCSVData();
  }, []);

  return data;
};