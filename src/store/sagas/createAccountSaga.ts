import { takeLatest, all } from 'redux-saga/effects'
import { genesisApi } from '../../services/genesisApi'
import { IAction } from './interfaces';
import { Types, CreateAccountActions } from '../reducers/createAccountReducer';
import executeSaga from './baseSaga';

function* execute(action: IAction) {
    const path = 'account';
    yield executeSaga(CreateAccountActions, genesisApi.post, path, action.payload);
}

export default all([
    takeLatest(Types.CREATE_ACCOUNT_REQUEST, execute)
])
