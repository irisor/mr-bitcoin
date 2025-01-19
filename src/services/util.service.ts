'use strict'

export function makeId(length = 5) {
	var id = ''
	var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

	for (var i = 0; i < length; i++) {
		id += possible.charAt(getRandomInt(0, possible.length))
	}
	return id
}

export function getRandomInt(num1: number, num2: number) {
    var max = num1 >= num2 ? num1 + 1 : num2 + 1
    var min = num1 <= num2 ? num1 : num2
    return Math.floor(Math.random() * (max - min)) + min
}

export function saveToStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value))
}

export function loadFromStorage(key: string) { 
    const data = localStorage.getItem(key)
    return (data) ? JSON.parse(data) : undefined
}

export function debounce<T>(func: Function, delay: number) {
    let timeoutId: number

    return (...args:T[]) => {
        clearTimeout(timeoutId)
        timeoutId = window.setTimeout(() => func(...args), delay)
    }
}