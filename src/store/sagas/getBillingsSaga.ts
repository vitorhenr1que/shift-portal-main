import { takeLatest, all } from 'redux-saga/effects'
import { genesisApi } from '../../services/genesisApi'
import { IAction } from './interfaces';
import { Types, GetBillingsActions } from '../reducers/getBillingsReducer';
import executeSaga from './baseSaga';

function* execute(action: IAction) {
    const path = 'billing';
    yield executeSaga(GetBillingsActions, genesisApi.get, path, { params: action.payload });
}

export default all([
    takeLatest(Types.GET_BILLINGS_REQUEST, execute)
])