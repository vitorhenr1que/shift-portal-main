export type CreateBillingResponse = {
    content: string,
    image: string,
    errorMessage: string,
    isSuccessful: boolean
}

export type GetAccountBalanceResponse = {
    balance: number
}

export type LoginResponse = {
    accessToken: string,
    expireIn: number
}