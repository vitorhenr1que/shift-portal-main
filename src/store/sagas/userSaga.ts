import { takeLatest, all } from 'redux-saga/effects'
import { genesisApi } from '../../services/genesisApi'
import { IAction } from './interfaces';
import { Types, UserActions } from '../reducers/userReducer';
import executeSaga from './baseSaga';

function* authenticate(action: IAction) {
    const path = 'user/login'
    yield executeSaga(UserActions, genesisApi.post, path, action.payload);
}

export default all([
    takeLatest(Types.AUTHENTICATE_REQUEST, authenticate)
])