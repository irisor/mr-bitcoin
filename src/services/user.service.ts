import type { User } from "@/model/user.model"

const user: User = {
    name: "Puki Ben David",
    balance: 100,
    transactions: []
}

export const userService = {
    getUser,
    getLoggedInUser,
}

function getUser(): User {
    return user
}

function getLoggedInUser(): User {
    return user
}