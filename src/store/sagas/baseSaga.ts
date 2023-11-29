import { call, put } from 'redux-saga/effects';
import { IResponse } from './interfaces';

export default function* executeSaga(actionHandler: any, fn:any, ...args: unknown[]) {
    try {
        const response: IResponse = yield call(fn, ...args);
        if (response?.status >= 200 && response?.status !== 401 && response?.status !== 403) {
            yield put(actionHandler.success(response.data));
        }
        else {
            if (response?.status === 401 || response?.status == 403) {
                window.location.href = '/'
            } else {
                yield put(
                    actionHandler.failure(
                        response?.data?.errorMessage || 'Unknown error',
                    )
                );
            }
        }
    } catch (error: any) {
        const status = error?.response?.status

        if (status === 401 || status == 403) {
            window.location.href = '/'
        }

        yield put(actionHandler.failure(error));
    }
}
