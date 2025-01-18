<template>
    <div class="chart-container" style="height: 400px;">
        <Line :data="chartData" :options="chartOptions" />
    </div>
</template>

<script lang="ts">
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    type TooltipItem,
    type ChartData,
    ChartOptions,
} from 'chart.js'
import { Line } from 'vue-chartjs'
import { bitcoinService } from '@/services/bitcoin.service'
import type { MarketPriceData, PriceItem } from '@/model/bitcoin.model';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
)

export default {
    name: 'BitcoinChart',
    components: {
        Line
    },
    data() {
        return {
            chartData: {
                labels: [] as string[], // Explicitly typed
                datasets: []
            },
            chartOptions: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top' as const,
                    },
                    title: {
                        display: true,
                        text: 'Bitcoin Price History'
                    },
                    tooltip: {
                        callbacks: {
                            label: (context: TooltipItem<'line'>) => {
                                return `Price: $${(context.raw as number).toLocaleString()}`
                            }
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        ticks: {
                            callback: function (this: any, tickValue: number | string) {
                                return `$${Number(tickValue).toLocaleString()}`;
                            }
                        }
                    }
                }
            }
        }
    },
    mounted() {
        this.loadChartData()
    },
    methods: {
        async loadChartData() {
            try {
                const response: MarketPriceData = await bitcoinService.getMarketPriceHistory()

                if (!response || !response.values || !Array.isArray(response.values)) {
                    throw new Error(`Invalid response format: ${JSON.stringify(response)}`)
                }

                const processedData: { x: string, y: number }[] = response.values.map((item: PriceItem) => ({
                    x: new Date(item.x * 1000).toLocaleDateString(),
                    y: item.y
                }))

                // Update chartData with the correct structure
                this.chartData = {
                    labels: processedData.map(item => item.x as string),
                    datasets: [{
                        label: 'Bitcoin Price (USD)',
                        borderColor: '#F7931A', // Bitcoin orange
                        borderWidth: 2,
                        fill: true,
                        tension: 0.4,
                        data: processedData.map(item => item.y as number)
                    }]
                } as ChartData<'line', number[], string>
            } catch (error) {
                console.error('Error loading chart data:', error)
            }
        }
    }
}
</script>

<style scoped>
.chart-container {
    position: relative;
    margin: auto;
    width: 100%;
}
</style>
