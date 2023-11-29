import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import cashOutSaga from './cashOutSaga';
import createAccountSaga from './createAccountSaga';
import createBillingSaga from './createBillingSaga';
import getAccountBalance from './getAccountBalance';
import getBillingBalanceSaga from './getBillingBalanceSaga';
import getBillingByIdSaga from './getBillingByIdSaga';
import getBillingCustomerSaga from './getBillingCostumerSaga';
import getBillingsSaga from './getBillingsSaga';
import updateAccountPasswordSaga from './updateAccountPasswordSaga';
import resendBillingByIdSaga from './resendBillingByIdSaga';
import getWithdrawsSaga from './getWithdrawsSaga';

export default function* rootSaga(){
    return yield all([
        userSaga,
        cashOutSaga,
        createAccountSaga,
        createBillingSaga,
        getAccountBalance,
        getBillingBalanceSaga,
        getBillingByIdSaga,
        getBillingCustomerSaga,
        getBillingsSaga,
        updateAccountPasswordSaga,
        resendBillingByIdSaga,
        getWithdrawsSaga
    ])
}