import { takeLatest, all } from 'redux-saga/effects'
import { genesisApi } from '../../services/genesisApi'
import { IAction } from './interfaces';
import { Types, GetWithdrawsActions } from '../reducers/getWithdrawsReducer';
import executeSaga from './baseSaga';

function* execute(action: IAction) {
    const path = 'account/withdrawal';
    yield executeSaga(GetWithdrawsActions, genesisApi.get, path, { params: action.payload });
}

export default all([
    takeLatest(Types.GET_WITHDRAWS_REQUEST, execute)
])