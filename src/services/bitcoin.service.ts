import axios from "axios"

export const bitcoinService = {
    getRate,
    getMarketPriceHistory,
	getAvgBlockSize,
}
const LOCAL_STORAGE_KEY = 'bitcoin-data'
const EXPIRATION_IN_MS = 1000 * 60 * 60 * 24

async function getRate() {
    const cachedData = getCachedData()
    if (cachedData) return cachedData.rate

    const { data } = await axios.get('https://blockchain.info/q/exchange-rates')
    setCachedData({ rate: data, expiration: Date.now() + EXPIRATION_IN_MS })
    return data
}

async function getMarketPriceHistory() {
    const cachedData = getCachedData()
    if (cachedData) return cachedData.marketPriceHistory

    const { data } = await axios.get('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true');
    const marketPriceHistory = data.values
    setCachedData({ marketPriceHistory, expiration: Date.now() + EXPIRATION_IN_MS })
    return marketPriceHistory
}

async function getAvgBlockSize() {
    const cachedData = getCachedData()
    if (cachedData) return cachedData.avgBlockSize

    const { data } = await axios.get('https://api.blockchain.info/charts/avg-block-size?timespan=5months&format=json&cors=true')
    const avgBlockSize = data
    setCachedData({ avgBlockSize, expiration: Date.now() + EXPIRATION_IN_MS })
    return avgBlockSize
}

function getCachedData() {
    const dataStr = localStorage.getItem(LOCAL_STORAGE_KEY)
    if (!dataStr) return null
    const data = JSON.parse(dataStr)
    if (data.expiration < Date.now()) {
        localStorage.removeItem(LOCAL_STORAGE_KEY)
        return null
    }
    return data
}

function setCachedData(data: { rate?: number, marketPriceHistory?: number[][], avgBlockSize?: { values: number[][] }, expiration: number }) {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data))
}
