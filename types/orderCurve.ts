export interface ActiveOrderCurve {
  id: number;
  type: 'Buy' | 'Sell';
  startPrice: number;
  slope: number;
  minPrice: number;
  maxPrice: number;
  tokenInSymbol?: string;
  tokenOutSymbol?: string;
}
