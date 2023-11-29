export interface IAction{
    type?: string,
    payload?: any
}

export interface IResponse{
    data?: any
}

export interface IError{
    response?: IAxiosError
}

export interface IAxiosError{
    data: IErrorData;
    status: number;
    statusText: string;
}

export interface IErrorData{
    notifications: string[]
}