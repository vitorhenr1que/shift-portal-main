import { Address, BankAccount, Company, Person, User } from "./domain";

export type CreateAccountRequest = {
    company: Company;
    person: Person;
    user: User;
    address: Address;
    bankAccount: BankAccount | null;
}

export type CreateBillingRequest = {
    title: string,
    amount: Number,
    description: string,
    customerName: string,
    customerDocument: string,
    customerPhoneNumber: string,
    dueDate: string
}

export type GetBillingsRequest = {
    pageId: number,
    startAt: string,
    endAt: string,
    status: number | null;
}

export type GetWithdrawRequest = {
    pageId: number;
    totalPage: number;
    offset: number;
    status: number[];
}

export type GetBillingCustomerRequest = {
    document: string
}

export type CashOutRequest = {
    companyId: number;
    amount: number;
    pixKey: string | null;
    pixType: number | null;
    bankAccount: BankAccount | null;
}

export type UpdatePasswordRequest = {
    username: string,
    password: string,
    newPassword: string
}