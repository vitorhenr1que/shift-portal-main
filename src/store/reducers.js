import { combineReducers } from 'redux';
import UserReducer from './reducers/userReducer';
import CashoutReducer from './reducers/cashOutReducer';
import CreateBillingReducer from './reducers/createBillingReducer';
import GetBillingsReducer from './reducers/getBillingsReducer';
import GetWithdrawsReducer from './reducers/getWithdrawsReducer';
import GetBillingByIdReducer from './reducers/getBillingByIdReducer';
import GetBillingBalanceReducer from './reducers/getBillingBalanceReducer';
import GetBillingCustomerReducer from './reducers/getBillingCustomerReducer';
import CreateAccountReducer from './reducers/createAccountReducer';
import GetAccountBalanceReducer from './reducers/getAccountBalanceReducer';
import updateAccountPasswordReducer from './reducers/updateAccountPasswordReducer';

export default combineReducers({
    UserReducer,
    CashoutReducer,
    CreateBillingReducer,
    GetBillingsReducer,
    GetWithdrawsReducer,
    GetBillingByIdReducer,
    GetBillingBalanceReducer,
    GetBillingCustomerReducer,
    CreateAccountReducer,
    GetAccountBalanceReducer,
    updateAccountPasswordReducer,
});