import { takeLatest, all } from 'redux-saga/effects'
import { genesisApi } from '../../services/genesisApi'
import { IAction } from './interfaces';
import { Types, GetAccountBalanceActions } from '../reducers/getAccountBalanceReducer';
import executeSaga from './baseSaga';

function* execute(action: IAction) {
    const path = 'account/balance';
    yield executeSaga(GetAccountBalanceActions, genesisApi.get, path);
}


export default all([
    takeLatest(Types.GET_ACCOUNT_BALANCE_REQUEST, execute)
])
