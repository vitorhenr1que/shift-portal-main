import { takeLatest, all } from 'redux-saga/effects'
import { genesisApi } from '../../services/genesisApi'
import { Types, GetBillingByIdActions } from '../reducers/getBillingByIdReducer';
import executeSaga from './baseSaga'
import { IAction } from './interfaces';

function* execute(action: IAction) {
    const path = `billing/${action.payload}`;
    yield executeSaga(GetBillingByIdActions, genesisApi.get, path);
}

export default all([
    takeLatest(Types.GET_BILLING_BY_ID_REQUEST, execute)
])