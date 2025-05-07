export interface BrandSpendData {
  brand: string;
  spend: number;
  year: number;
  quarter: string;
  category?: string;
}

export interface BaseData {
  quarter: string;
  brand: string;
  audience?: string;
  value: string | number;
}

export interface ConsiderationData extends BaseData {
  category: 'Consideration';
}

export interface AwarenessData extends BaseData {
  category: 'Unaided Awareness';
}

export interface FtsRecallData {
  value: number;
  audience: string;
  quarter: string;
  communicationRecall: number;
}

export interface PriceWorthData {
  audience: string;
  quarter: string;
  hiltonPrice: string | number;
  marriottPrice: string | number;
  hiltonWorth: string | number;
  marriottWorth: string | number;
}

export interface ProofOfPointData {
  brand: string;
  value: number;
  category?: string;
  attribute?: string;
  audience?: string;
  country?: string;
  metric?: string;
  subcategory?: string;
}

// For chart components
export interface ChartDataPoint {
  name: string;
  value: number;
}

export type TabType = 'overview' | 'brandSpend' | 'proofOfPoint' | 'priceWorth' | 'ftsRecall' | 'awareness';