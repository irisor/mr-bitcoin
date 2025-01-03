import type { Transsaction } from "./transaction.model"

export interface User {
    name: string
    balance: number
    transactions: Transsaction[]
}