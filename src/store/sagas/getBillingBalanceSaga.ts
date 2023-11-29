import { takeLatest, all } from 'redux-saga/effects'
import { genesisApi } from '../../services/genesisApi'
import { Types, GetBillingBalanceActions } from '../reducers/getBillingBalanceReducer';
import executeSaga from './baseSaga'
import { IAction } from './interfaces';

function* execute(action: IAction) {
    const path = 'billing/balance';
    yield executeSaga(GetBillingBalanceActions, genesisApi.get, path);
}

export default all([
    takeLatest(Types.GET_BILLING_BALANCE_REQUEST, execute)
])