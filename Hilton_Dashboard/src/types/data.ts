export interface BrandSpendData {
  brand: string;
  spend: number;
  year: number;
  quarter: string;
  category?: string;
}

export interface ConsiderationData {
  brand: string;
  value: number;
  audience?: string;
  quarter?: string;
  year?: number;
  category?: string;
}

export interface AwarenessData {
  brand: string;
  value: number;
  audience?: string;
  quarter?: string;
  year?: number;
  category?: string;
}

export interface FtsRecallData {
  brand: string;
  value: number;
  attribute?: string;
  audience?: string;
  year?: number;
  category?: string;
}

export interface PriceWorthData {
  brand: string;
  value: number;
  generation?: string;
  category?: string;
  metric?: string;
}

export interface ProofOfPointData {
  brand: string;
  value: number;
  category?: string;
  attribute?: string;
  audience?: string;
  country?: string;
  metric?: string;
}

// For chart components
export interface ChartDataPoint {
  name: string;
  value: number;
}

export type TabType = 'overview' | 'brandSpend' | 'proofOfPoint' | 'priceWorth' | 'ftsRecall' | 'awareness';