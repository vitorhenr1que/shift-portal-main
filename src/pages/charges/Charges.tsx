import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from 'dayjs';
import DateFilter from "../../shared/components/dateFilter/DateFilter";
import ChargesTable from "../../shared/components/chargesTable/ChargesTable";
import { FormControlLabel, Snackbar, Alert, Typography, useMediaQuery, useTheme } from "@mui/material";
import {
    FirstBlockContainer, SecondBlockContainer,
    ThirdBlockContainer, FourthBlockContainer, Blocks, Value, Body,
    IconContainer, RoundIconBorder, MoneyIcon, Divider, CardFooter,
    UiOutlinedButton, UiButton, Link
} from './styles';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import ArrowCircleRightOutlinedIcon from '@mui/icons-material/ArrowCircleRightOutlined';
import { ListingTools, MenuLeft, ContentContainer } from "../../shared/components";
import { LayoutBasePages } from "../../shared/layouts/LayoutBasePages";
import { useDispatch, useSelector } from "react-redux";
import { GetBillingBalanceActions } from "../../store/reducers/getBillingBalanceReducer";
import { GetBillingsActions } from "../../store/reducers/getBillingsReducer";
import { GetBillingsRequest } from "../../services/genesisApi/requests"
import { IGetAccountBalanceReducer, IGetBillingBalanceReducer, IGetBillingsReducer } from "../../store/reducers/interfaces";
import { GetAccountBalanceActions } from "../../store/reducers/getAccountBalanceReducer";
import { ResendBillingByIdActions } from "../../store/reducers/resendBillingByIdReducer";
import { Billing } from "../../services/genesisApi/domain";
import { applyCurrency } from '../../shared/utils'

const initialState: GetBillingsRequest = {
    startAt: dayjs().subtract(1, 'months').format('YYYY-MM-DD'),
    endAt: dayjs().add(1, 'day').format('YYYY-MM-DD 23:59:59'),
    status: null,
    pageId: 1
}

export default function Charges() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('sm'));


    const accountBalance = useSelector((state: any): IGetAccountBalanceReducer => state.GetAccountBalanceReducer);
    const billingBalance = useSelector((state: any): IGetBillingBalanceReducer => state.GetBillingBalanceReducer);
    const billing = useSelector((state: any): IGetBillingsReducer => state.GetBillingsReducer);
    const [billings, setBillings] = useState<Array<Billing>>([]);
    const [billingFilter, setBillingFilter] = useState(initialState);
    const [startDate, setStartDate] = React.useState(initialState.startAt);
    const [endDate, setEndDate] = React.useState(initialState.endAt);
    const [openResendToast, setOpenResendToast] = React.useState(false)
    const isEmptyAccount = billings.length === 0 && accountBalance.balance === 0 && !accountBalance.loading && !billing.loading;

    if (accountBalance.isRequested === false) {
        dispatch(GetAccountBalanceActions.execute());
    }

    if (billingBalance.isRequested === false) {
        dispatch(GetBillingBalanceActions.execute());
    }

    if (billing.isRequested === false) {
        dispatch(GetBillingsActions.execute(billingFilter));
    }

    React.useEffect(() => {
        if (billing.billings.length > 0 && billing.loading === false && billing.isRequested === true) {
            setBillings(billings.concat(billing.billings))
            const newFilter = { ...billingFilter, pageId: billingFilter.pageId + 1 }

            //console.log(newFilter)

            setBillingFilter(newFilter)
            dispatch(GetBillingsActions.execute(newFilter))
        }
    }, [billing, accountBalance]);

    useEffect(() => {

        //console.log('passou aqui')

        dispatch(GetBillingsActions.execute(initialState))
    }, [])


    const onDateChange = (newValue: any, name: string) => {
        if (name === 'startDate') {
            setStartDate(dayjs(newValue).isValid() ? dayjs(newValue).format('YYYY-MM-DD 23:59:59') : startDate)
        } else {
            setEndDate(dayjs(newValue).isValid() ? dayjs(newValue).format('YYYY-MM-DD 23:59:59') : endDate)
        }
    }

    const onFilter = () => {
        const newFilter = { ...billingFilter, pageId: 1, startAt: startDate, endAt: endDate }
        setBillings([])
        setBillingFilter(newFilter)
        dispatch(GetBillingsActions.execute(newFilter))
    }    

    const GetReceive = () => {
        const newFilter = { ...billingFilter, pageId: 1, startAt: startDate, endAt: endDate, status: 1 }
        setBillings([])
        dispatch(GetBillingsActions.execute(newFilter))
    }

    const GetOverDue = () => {
        const newFilter = { ...billingFilter, pageId: 1, startAt: startDate, endAt: endDate, status: 4 }
        setBillings([])
        dispatch(GetBillingsActions.execute(newFilter))
    }

    const GetWillReceive = () => {
        const newFilter = { ...billingFilter, pageId: 1, startAt: startDate, endAt: endDate, status: 0 }
        setBillings([])
        dispatch(GetBillingsActions.execute(newFilter))
    }

    const resendBilling = (id: string) => {
        dispatch(ResendBillingByIdActions.execute(id));
        setOpenResendToast(true);
    }

    const handleCloseResendToast = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenResendToast(false);
    };

    return (
        <>
            <MenuLeft>
                <LayoutBasePages
                    children={undefined}
                    barraDeFerrementas={(
                        <ListingTools titlePage="Minhas Cobranças" />
                    )}
                />
                {!accountBalance.loading && !billing.loading && !billingBalance.loading && <ContentContainer>
                    {isEmptyAccount
                        ? <div style={{ width: '100%', height: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#fff', padding: '40px', borderRadius: '8px', textAlign: 'center' }}>
                            <div>
                                <img src='https://static.shiftpagamentos.com.br/web/request-empty.png' width={180} alt="" />
                                <Typography
                                    variant={smDown ? 'h5' : mdDown ? 'h6' : 'h6'}
                                    whiteSpace={"normal"}
                                    overflow={"hidden"}
                                    textOverflow={"ellipsis"}
                                    style={{ marginBottom: '16px' }}
                                >
                                    Crie sua primeira cobrança!
                                </Typography>
                                <Typography
                                    variant={'subtitle1'}
                                    whiteSpace={"normal"}
                                    overflow={"hidden"}
                                    textOverflow={"ellipsis"}
                                    color={'#505050'}
                                    style={{ marginBottom: '16px' }}
                                >
                                    Ainda não temos nenhuma cobrança para exibir.
                                </Typography>
                                <Typography
                                    variant={'subtitle1'}
                                    whiteSpace={"normal"}
                                    overflow={"hidden"}
                                    textOverflow={"ellipsis"}
                                    color={'#505050'}
                                    style={{ marginBottom: '16px' }}
                                >
                                    <Link href="#">Vamos criar sua primeira em poucos passos?</Link>
                                </Typography>
                                <UiButton onClick={() => navigate('/cobrar')}>Criar cobrança</UiButton>
                            </div>
                        </div>
                        : <div style={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                                <DateFilter startDate={startDate} endDate={endDate} onChange={onDateChange} />
                                {/* <SearchBar /> */}
                                <UiOutlinedButton style={{ marginLeft: '10px' }} onClick={onFilter} disabled={billing.loading}>{billing.loading ? 'Carregando' : 'Filtrar'}</UiOutlinedButton>
                                <span style={{ marginLeft: 'auto' }}><UiButton onClick={() => navigate('/cobrar')}>Criar uma nova cobrança</UiButton></span>
                            </div>
                            <Blocks>
                                <FirstBlockContainer>
                                    <IconContainer>
                                        <RoundIconBorder><AttachMoneyIcon /></RoundIconBorder>
                                        <HelpOutlineIcon />
                                    </IconContainer>
                                    <Body>Saldo em conta</Body>
                                    <Value><MoneyIcon>R$</MoneyIcon> {applyCurrency(accountBalance.balance / 100, 'decimal')}</Value>
                                    <Divider />
                                    <CardFooter onClick={() => navigate('/sacar')}>
                                        <FormControlLabel
                                            control={<h2 />}
                                            label={<span style={{ fontWeight: '300' }}>Mais detalhes</span>}
                                            style={{ color: 'white', paddingLeft: 12 }}
                                        />
                                        <ArrowCircleRightOutlinedIcon style={{ alignSelf: 'center', color: '#fff' }} />
                                    </CardFooter>
                                </FirstBlockContainer>
                                <SecondBlockContainer>
                                    <IconContainer>
                                        <RoundIconBorder style={{ backgroundColor: '#4337CA' }}><VerifiedOutlinedIcon /></RoundIconBorder>
                                        <HelpOutlineIcon />
                                    </IconContainer>
                                    <Body>Recebido | Ultimos 30 dias</Body>
                                    <Value><MoneyIcon>R$</MoneyIcon> {billingBalance.receivedAmount}</Value>
                                    <Divider />
                                    <CardFooter>
                                        <FormControlLabel
                                            onClick={GetReceive}
                                            control={<h2 />}
                                            label={<span style={{ fontWeight: '300' }}>Mais detalhes</span>}
                                            style={{ color: 'white', paddingLeft: 12 }}
                                        />
                                        <ArrowCircleRightOutlinedIcon style={{ alignSelf: 'center', color: '#fff' }} />
                                    </CardFooter>
                                </SecondBlockContainer>
                                <ThirdBlockContainer>
                                    <IconContainer>
                                        <RoundIconBorder style={{ backgroundColor: '#393099' }}><AccessTimeIcon /></RoundIconBorder>
                                        <HelpOutlineIcon />
                                    </IconContainer>
                                    <Body>Em atraso</Body>
                                    <Value><MoneyIcon>R$</MoneyIcon> {billingBalance.overDueAmount}</Value>
                                    <Divider />
                                    <CardFooter>
                                    <FormControlLabel
                                        onClick={GetOverDue}
                                        control={<h2 />}
                                        label={<span style={{ fontWeight: '300' }}>Mais detalhes</span>}
                                        style={{ color: 'white', paddingLeft: 12 }}
                                    />
                                        <ArrowCircleRightOutlinedIcon style={{ alignSelf: 'center', color: '#fff' }} />
                                    </CardFooter>
                                </ThirdBlockContainer>
                                <FourthBlockContainer>
                                    <IconContainer>
                                        <RoundIconBorder style={{ backgroundColor: '#190044' }}><CalendarTodayIcon fontSize="small" /></RoundIconBorder>
                                        <HelpOutlineIcon />
                                    </IconContainer>
                                    <Body>A receber</Body>
                                    <Value><MoneyIcon>R$</MoneyIcon> {billingBalance.willReceiveAmount}</Value>
                                    <Divider />
                                    <CardFooter>
                                        <FormControlLabel
                                             onClick={GetWillReceive}
                                            control={<h2 />}
                                            label={<span style={{ fontWeight: '300' }}>Mais detalhes</span>}
                                            style={{ color: 'white', paddingLeft: 12 }}
                                        />
                                        <ArrowCircleRightOutlinedIcon style={{ alignSelf: 'center', color: '#fff' }} />
                                    </CardFooter>
                                </FourthBlockContainer>
                            </Blocks>
                            <div>
                                <ChargesTable rows={billings.sort((a, b) => (a.createdAt < b.createdAt ? -1 : 1)).reverse()} resend={resendBilling} />
                            </div>
                        </div>}


                </ContentContainer>}

                <Snackbar open={openResendToast} autoHideDuration={3000} onClose={handleCloseResendToast} anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}>
                    <Alert onClose={handleCloseResendToast} severity="success" sx={{ width: '100%' }} >
                        Cobrança reenviada com sucesso!
                    </Alert>
                </Snackbar>

            </MenuLeft>
        </>
    )
}