import { Routes, Route, Navigate } from 'react-router-dom';
import Login from "../pages/login/Login";
import Charges from "../pages/charges/Charges";
import MakeCharge from "../pages/makeCharge/MakeCharge";
import RecoverPassword from "../pages/recoverPassword/RecoverPassword";
import Register from "../pages/registration/Register";
import CashOut from '../pages/cashOut/CashOut';


export const AppRoutes = () => {

    return(
        <Routes>
            <Route path='/' element={<Login/>} />
            <Route path="*" element={<Navigate to='/' />} />
            <Route path='/cadastro' element={<Register />} />
            <Route path='/cobrancas' element={<Charges />} />
            <Route path='/redefinir-senha' element={<RecoverPassword />} />
            <Route path='/cobrar' element={<MakeCharge />} />
            <Route path='/sacar' element={<CashOut />} />
        </Routes>
    );
}