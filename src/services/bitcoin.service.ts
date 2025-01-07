import type { BlockSizeData, CachedBlockSizeData, CachedData, CachedMarketPriceData, CachedRateData, MarketPriceData } from "@/model/bitcoin.model"
import axios from "axios"

export const bitcoinService = {
    getRate,
    getMarketPriceHistory,
	getAvgBlockSize,
}
const RATE_LOCAL_STORAGE_KEY = 'bitcoin-rate-data'
const HISTORY_LOCAL_STORAGE_KEY = 'bitcoin-history-data'
const BLOCK_SIZE_LOCAL_STORAGE_KEY = 'bitcoin-block-size-data'
const EXPIRATION_IN_MS = 1000 * 60 * 60 * 24

async function getRate(): Promise<number> {
    const cachedData: CachedRateData | null = getCachedData<CachedRateData>(RATE_LOCAL_STORAGE_KEY)
    if (cachedData) return cachedData.rate

    const { data } = await axios.get('https://blockchain.info/tobtc?currency=USD&value=1')
    setCachedData(RATE_LOCAL_STORAGE_KEY, { rate: data, expiration: Date.now() + EXPIRATION_IN_MS });
    return data;
}

async function getMarketPriceHistory(): Promise<MarketPriceData> {
    const cachedData: CachedMarketPriceData | null = getCachedData(HISTORY_LOCAL_STORAGE_KEY)
    if (cachedData) return cachedData.marketPriceHistory

    const { data } : { data: MarketPriceData } = await axios.get('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true');
    const marketPriceHistory: MarketPriceData = data
    setCachedData(HISTORY_LOCAL_STORAGE_KEY, { marketPriceHistory, expiration: Date.now() + EXPIRATION_IN_MS })
    return marketPriceHistory
}

async function getAvgBlockSize(): Promise<BlockSizeData> {
    const cachedData: CachedBlockSizeData | null = getCachedData(BLOCK_SIZE_LOCAL_STORAGE_KEY)
    if (cachedData) return cachedData.avgBlockSize

    const { data }: { data: BlockSizeData } = await axios.get('https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true')
    const avgBlockSize: BlockSizeData = data
    setCachedData(BLOCK_SIZE_LOCAL_STORAGE_KEY, { avgBlockSize, expiration: Date.now() + EXPIRATION_IN_MS })
    return avgBlockSize
}

function getCachedData<T extends CachedData>(key: string = RATE_LOCAL_STORAGE_KEY): T | null {
    const dataStr: string | null = localStorage.getItem(key);
    if (!dataStr) return null;
    const data: T = JSON.parse(dataStr);
    if (data.expiration < Date.now()) {
        localStorage.removeItem(key);
        return null;
    }
    return data;
}

function setCachedData<T extends CachedData>(key: string, data: T) {
    localStorage.setItem(key, JSON.stringify(data))
}
