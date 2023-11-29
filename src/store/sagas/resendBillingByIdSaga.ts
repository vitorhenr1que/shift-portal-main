import { takeLatest, all } from 'redux-saga/effects'
import { genesisApi } from '../../services/genesisApi'
import { Types, ResendBillingByIdActions } from '../reducers/resendBillingByIdReducer';
import executeSaga from './baseSaga'
import { IAction } from './interfaces';

function* execute(action: IAction) {
    const path = `billing/${action.payload}/resend`;
    yield executeSaga(ResendBillingByIdActions, genesisApi.post, path);
}

export default all([
    takeLatest(Types.RESEND_BILLING_BY_ID_REQUEST, execute)
])