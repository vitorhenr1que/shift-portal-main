import { Address, Billing, BankAccount, Withdraw, Company, Person, User } from "../../services/genesisApi/domain"

export interface IUserReducer {
    email: string,
    username: string,
    password: string,
    error: unknown,
    loading: boolean,
    isSuccessful: boolean
}

export interface ICreateAccountReducer {
    company: Company;
    person: Person;
    user: User;
    address: Address;
    bankAccount: BankAccount;
    error: unknown;
    isSuccessful: boolean;
    loading: boolean;
}

export interface ICashoutReducer {
    companyId: number;
    amount: number;
    pixKey: string;
    pixType: number;
    bankAccount: BankAccount;
    error: unknown;
    isSuccessful: boolean;
    loading: boolean;
}

export interface ICreateBillingReducer {
    title: string,
    amount: number,
    description: string,
    customerName: string,
    customerDocument: string,
    customerPhoneNumber: string,
    dueDate: string,
    error: unknown,
    loading: boolean,
    isSuccessful: boolean
}

export interface IGetBillingsReducer {
    billings: Billing[],
    error: unknown,
    loading: boolean,
    isRequested: boolean
}

export interface IGetWithdrawsReducer {
    withdraws: Withdraw[],
    error: unknown,
    loading: boolean,
    isRequested: boolean
}

export interface IGetBillingBalanceReducer {
    totalReceivedAmount: number
    receivedAmount: number
    overDueAmount: number
    willReceiveAmount: number
    isRequested: boolean
    loading: boolean
    error: unknown
}

export interface IGetAccountBalanceReducer {
    balance: number
    isRequested: boolean
    loading: boolean
    error: unknown
}
