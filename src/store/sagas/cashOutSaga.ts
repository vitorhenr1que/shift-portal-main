import { takeLatest, all } from 'redux-saga/effects'
import { genesisApi } from '../../services/genesisApi'
import { IAction } from './interfaces';
import { Types, CashOutActions } from '../reducers/cashOutReducer';
import executeSaga from './baseSaga';

function* execute(action: IAction) {
    const path = 'account/cash-out';
    yield executeSaga(CashOutActions, genesisApi.post, path, action.payload);
}

export default all([
    takeLatest(Types.CASH_OUT_REQUEST, execute)
])