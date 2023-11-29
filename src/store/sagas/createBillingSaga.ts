import { takeLatest, all } from 'redux-saga/effects'
import { genesisApi } from '../../services/genesisApi'
import { IAction } from './interfaces';
import { Types, CreateBillingActions } from '../reducers/createBillingReducer';
import executeSaga from './baseSaga';

function* execute(action: IAction) {
    const path = 'billing';
    yield executeSaga(CreateBillingActions, genesisApi.post, path, action.payload);
}


export default all([
    takeLatest(Types.CREATE_BILLING_REQUEST, execute)
])
