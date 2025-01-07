export interface MarketPriceData {
    values: PriceItem[]
}

export interface PriceItem {
    x: number;  // timestamp
    y: number;  // price
}

export interface BlockSizeData {
    values: Array<[number, number]> // [timestamp, size]
}

export interface CachedRateData {
    rate: number
    expiration: number
}

export interface CachedMarketPriceData {
    marketPriceHistory: MarketPriceData
    expiration: number
}

export interface CachedBlockSizeData {
    avgBlockSize: BlockSizeData
    expiration: number
}

export type CachedData = CachedRateData | CachedMarketPriceData | CachedBlockSizeData