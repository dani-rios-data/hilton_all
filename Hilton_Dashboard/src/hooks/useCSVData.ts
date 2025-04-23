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
        // Function to fetch and parse a CSV file
        const fetchCSV = async (filename: string) => {
          try {
            const response = await fetch(`/${filename}`);
            if (!response.ok) {
              throw new Error(`Failed to fetch ${filename}: ${response.status} ${response.statusText}`);
            }
            const text = await response.text();
            return new Promise((resolve) => {
              Papa.parse(text, {
                header: true,
                dynamicTyping: true,
                skipEmptyLines: true,
                complete: (results) => {
                  resolve(results.data);
                }
              });
            });
          } catch (error) {
            console.error(`Error fetching ${filename}:`, error);
            return [];
          }
        };

        // Fetch all CSV files in parallel
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

        console.log("Brand Spend Raw Data:", brandSpendData);

        // Process consideration data to match the expected format
        const processedConsideration = (considerationData as any[]).map(item => ({
          brand: item.Hotel,
          value: item.Value,
          audience: item.Audience,
          quarter: item.Quarter,
          category: item.Feature
        }));

        // Process awareness data to match the expected format
        const processedAwareness = (awarenessData as any[]).map(item => ({
          brand: item.Hotel,
          value: item.Value,
          audience: item.Audience,
          quarter: item.Quarter,
          category: item.Feature
        }));

        // Process brand spend data - specifically handle the column name issue
        const processedBrandSpend = (brandSpendData as any[]).map(item => {
          // Check if the CSV has Brand and Spend columns
          const brand = item.Brand !== undefined ? item.Brand : item.brand;
          const spend = item.Spend !== undefined ? item.Spend : (item.spend !== undefined ? item.spend : 0);
          
          return {
            brand: brand,
            spend: typeof spend === 'string' ? parseFloat(spend) : spend,
            year: item.Year || item.year || 2023,
            quarter: item.Quarter || item.quarter || "Q4",
            category: item.Category || item.category || "Marketing"
          };
        });

        // Process FTS recall data
        const processedFtsRecall = (ftsRecallData as any[]).map(item => ({
          brand: item.Brand || item.brand || "Hilton",
          value: item["FTS Association (%)"] || item.value || 0,
          audience: item.Audience || item.audience,
          attribute: item.Attribute || item.attribute
        }));

        // Process price worth data
        const processedPriceWorth = (priceWorthData as any[]).map(item => ({
          brand: item.Brand || item.brand || "Hilton",
          value: item.Value || item.value || 0,
          generation: item.Audience || item.Generation || item.generation
        }));

        // Process proof of point data
        const processedProofOfPoint = (proofOfPointData as any[]).map(item => ({
          brand: item.Brand || item.brand || "Hilton",
          value: item.Percentage || item.Value || item.value || 0,
          audience: item.Audience || item.audience,
          country: item["Country Name"] || item.Country || item.country,
          category: item.Category || item.category
        }));

        console.log("Processed Brand Spend Data:", processedBrandSpend);

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
        console.error('Error loading CSV data:', error);
      }
    };

    loadCSVData();
  }, []);

  return data;
};