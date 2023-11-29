export type User = {
    email: string;
    username: string;
    password: string;
}

export type Company = {
    id: number;
    document: string;
    type: string;
    name: string;
    tradingName: string;
}

export type Person = {
    cpf: string;
    name: string;
    email: string;
    phoneNumber: string;
}

export type Address = {
    street: string;
    number: string;
    complement: string;
    neighborhood: string;
    city: string;
    state: string;
    zipCode: string;
}   

export type BankAccount = {
    account: string;
    branch: string;
    bankCode: string;
    accountType: string;
}

export type BillingResult = {
    actualPage: number;
    result: Billing[];
}

export type Billing = {
    id: string,
    companyId: number,
    userId: number,
    amount: number,
    netAmount: number,
    feeAmount: number,
    customerName: string,
    title: string,
    image: string,
    content: string,
    description: string,
    statusCode: number,
    status: string,
    //errorMessage: string,
    //isSuccessful: boolean,
    dueDate: Date,
    createdAt: Date
}

export type BillingBalance = {
    totalreceivedAmount: number,
    receivedAmount: number,
    overDueAmount: number,
    willReceiveAmount: number
}

export type BillingCustomer = {
    name: string;
    document: string;
    phoneNumber: string;
}

export type Withdraw = {
    id: string;
    companyId: number;
    username: number;
    companyDocument: string;
    personCpf: string;
    personPhoneNumber: string;
    bankAccount: string;
    bankCode: string;
    bankBranch: string;
    bankAccountType: string;
    amount: number;
    status: string;
    statusCode: number;
    createdAt: Date;
}

export type WithdrawResult = {
    actualPage: number;
    result: Withdraw[];
}