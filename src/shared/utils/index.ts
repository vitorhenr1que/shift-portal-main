export const applyCurrency = (amount: number = 0.0, style: string = 'currency') => {
    return amount.toLocaleString('pt-BR', { style: style, currency: 'BRL', maximumFractionDigits: 2, minimumFractionDigits: 2 })
}

export const toCent = (amount: number) => {
    let str = amount.toString()
    const [int] = str.split('.')

    return Number(amount.toFixed(2).replace('.', '').padEnd(int.length === 1 ? 3 : 4, '0'))
}
