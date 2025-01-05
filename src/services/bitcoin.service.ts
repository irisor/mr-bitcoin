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

async function getRate() {
    const cachedData = getCachedData(RATE_LOCAL_STORAGE_KEY)
    if (cachedData) return cachedData.rate

    const { data } = await axios.get('https://blockchain.info/tobtc?currency=USD&value=1')
    setCachedData(RATE_LOCAL_STORAGE_KEY, { rate: data, expiration: Date.now() + EXPIRATION_IN_MS });
    return data;
}

async function getMarketPriceHistory() {
    const cachedData = getCachedData(HISTORY_LOCAL_STORAGE_KEY)
    if (cachedData) return cachedData.marketPriceHistory

    const { data } = await axios.get('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true');
    const marketPriceHistory = data.values
    setCachedData(HISTORY_LOCAL_STORAGE_KEY, { marketPriceHistory, expiration: Date.now() + EXPIRATION_IN_MS })
    return marketPriceHistory
}

async function getAvgBlockSize() {
    const cachedData = getCachedData(BLOCK_SIZE_LOCAL_STORAGE_KEY)
    if (cachedData) return cachedData.avgBlockSize

    const { data } = await axios.get('https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true')
    const avgBlockSize = data
    setCachedData(BLOCK_SIZE_LOCAL_STORAGE_KEY, { avgBlockSize, expiration: Date.now() + EXPIRATION_IN_MS })
    return avgBlockSize
}

function getCachedData(key: string = RATE_LOCAL_STORAGE_KEY) {
    const dataStr = localStorage.getItem(key)
    if (!dataStr) return null
    const data = JSON.parse(dataStr)
    if (data.expiration < Date.now()) {
        localStorage.removeItem(key)
        return null
    }
    return data
}

function setCachedData(key: string, data: { rate?: number, marketPriceHistory?: number[][], avgBlockSize?: { values: number[][] }, expiration: number }) {
    localStorage.setItem(key, JSON.stringify(data))
}
