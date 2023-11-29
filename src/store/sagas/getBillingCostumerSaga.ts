import { takeLatest, all } from 'redux-saga/effects';
import { genesisApi } from '../../services/genesisApi';
import { Types, GetBillingCustomerActions } from '../reducers/getBillingCustomerReducer';
import executeSaga from './baseSaga';
import { IAction } from './interfaces';

function* execute(action: IAction) {
  const path = 'billing/customer';
  yield executeSaga(GetBillingCustomerActions, genesisApi.get, path, action.payload);
}

export default all([
  takeLatest(Types.GET_BILLING_CUSTOMER_REQUEST, execute)
]);
