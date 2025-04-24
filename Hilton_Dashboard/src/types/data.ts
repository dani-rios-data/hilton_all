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
  value: number;
  audience: string;
  quarter: string;
  communicationRecall: number;
}

export interface PriceWorthData {
  brand: string;
  value: number;
  generation: string;
  quarter: string;
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

export interface BaseData {
  quarter: string;
  brand: string;
  audience?: string;
  category: 'Unaided Awareness' | 'Consideration';
  value: string | number;
}

export interface AwarenessData extends BaseData {
  category: 'Unaided Awareness';
}

export interface ConsiderationData extends BaseData {
  category: 'Consideration';
}