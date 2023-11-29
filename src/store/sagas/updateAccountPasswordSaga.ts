import { takeLatest, all } from 'redux-saga/effects';
import { genesisApi } from '../../services/genesisApi';
import { IAction } from './interfaces';
import { Types, UpdateAccountPasswordActions } from '../reducers/updateAccountPasswordReducer';
import executeSaga from './baseSaga';

function* execute(action: IAction) {
    const path = 'account/update-password';
    yield executeSaga(UpdateAccountPasswordActions, genesisApi.put, path, action.payload);
}

export default all([
    takeLatest(Types.UPDATE_ACCOUNT_PASSWORD_REQUEST, execute)
]);
