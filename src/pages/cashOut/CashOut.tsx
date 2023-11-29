import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { Typography, useMediaQuery, useTheme, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, InputLabel, Select, MenuItem, ListSubheader } from "@mui/material"
import PixIcon from '@mui/icons-material/Pix';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import SmartphoneOutlinedIcon from '@mui/icons-material/SmartphoneOutlined';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { ListingTools, MenuLeft, ContentContainer } from "../../shared/components";
import { LayoutBasePages } from "../../shared/layouts/LayoutBasePages";
import { ICashoutReducer, IGetAccountBalanceReducer, IGetWithdrawsReducer } from '../../store/reducers/interfaces';
import { CashOutActions } from '../../store/reducers/cashOutReducer';
import { GetAccountBalanceActions } from '../../store/reducers/getAccountBalanceReducer';
import { GetWithdrawsActions } from '../../store/reducers/getWithdrawsReducer';
import { GetWithdrawRequest } from '../../services/genesisApi/requests'
import { applyCurrency, toCent } from '../../shared/utils'
import {
    Link, Container, Card, CashOutMethodButton, Value, MoneyIcon, RoundIconBorder,
    TableHeader, TableFooter, ColumnTitle, ColumnValue, TableFooterValue, UiTextField, UiButton,
    CashOutMethodButtonActive, ScrollContainer, UiOutlinedButton, DefaultInput,
} from './styles'
import BANKS from './banks.json'

const materialUINumberTextFieldProps = {
    variant: 'outlined',
    multiline: false,
    size: 'small',
    required: true
};

const initialFormError = {
    amount: false,
    pixKey: false,
    account: false,
    branch: false,
    bankCode: false
}

const getWithdrawRequest: GetWithdrawRequest = {
    status: [0, 1, 2, 3, 4],
    offset: 1,
    pageId: 1,
    totalPage: 100
}

const PasswordInputStyle = {
    width: '100%',
    borderRadius: '7px',
    marginBottom: '14px !important',
    borderWidth: '5px',
    '&.MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: '7px'
        },
        '&:hover fieldset': {
            borderColor: '#5143E7',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#5143E7',
        },
    },
};

const CASH_OUT_LIST = [
    {
        amount: 'R$ 400,00',
        date: '26/05/2023',
        status: 'paid',
        type: 'pix'
    },
    {
        amount: 'R$ 400,00',
        date: '26/05/2023',
        status: 'pending',
        type: 'ted'
    },
    {
        amount: 'R$ 400,00',
        date: '26/05/2023',
        status: 'paid',
        type: 'app'
    },
    {
        amount: 'R$ 400,00',
        date: '26/05/2023',
        status: 'pending',
        type: 'app'
    }
]

export default function CashOut() {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('sm'));

    const dispatch = useDispatch();
    const cashOut = useSelector((state: any): ICashoutReducer => state.CashoutReducer);
    const accountBalance = useSelector((state: any): IGetAccountBalanceReducer => state.GetAccountBalanceReducer);
    const withdraw = useSelector((state: any): IGetWithdrawsReducer => state.GetWithdrawsReducer);
    const [tab, setTab] = useState('bank_transfer');
    const [formattedAmount, setFormattedAmount] = React.useState('');
    const [showSuccessTab, setShowSuccessTab] = React.useState(false);
    const [formError, setFormError] = React.useState(initialFormError);
    const [amountError, setAmountError] = React.useState('');

    if (accountBalance.isRequested === false) {
        dispatch(GetAccountBalanceActions.execute());
    }

    if (withdraw.isRequested === false) {
        dispatch(GetWithdrawsActions.execute(getWithdrawRequest));
    }


    React.useEffect(() => {
        if (cashOut.error) {
            setTab('error')
        }

        if (cashOut.isSuccessful) {
            dispatch(GetWithdrawsActions.execute(getWithdrawRequest));
        }
    }, [cashOut]);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        handleFormValidation(e);
        dispatch(CashOutActions.set({ ...cashOut, [name]: value }));
    }

    const handleFormValidation = (e: any) => {
        const { name, value } = e.target;

        if (!value) {
            setFormError({ ...formError, [name]: true })
        } else {
            setFormError({ ...formError, [name]: false })
        }
    }

    const isFormValid = () => {
        const invalidInputs = [];
        let newFormError = { ...formError }

        newFormError.amount = isNil(cashOut.amount) || formError.amount

        if (tab === 'pix') {
            newFormError.pixKey = isNil(cashOut.pixKey)
        } else {
            newFormError.pixKey = false
        }

        if (tab === 'bank_transfer') {
            newFormError.account = isNil(cashOut.bankAccount.account)
            newFormError.bankCode = isNil(cashOut.bankAccount.bankCode)
            newFormError.branch = isNil(cashOut.bankAccount.branch)
        } else {
            newFormError.account = false
            newFormError.bankCode = false
            newFormError.branch = false
        }

        let property: keyof typeof formError;
        for (property in formError) {
            if (newFormError[property]) {
                invalidInputs.push(property)
            }
        }

        setFormError(newFormError)
        return invalidInputs.length === 0
    }

    const validateAmount = (value: string) => {
        if (!value || Number(value) === 0) {
            setAmountError('O campo é obrigatório e o valor deve ser maior que zero.');
            setFormError({ ...formError, amount: true });
            return false;
        }

        const amount = toCent(parseFloat(value));
        const isValid = amount <= accountBalance.balance;

        if (!isValid) {
            setAmountError('O valor não pode ser maior do que o saldo disponível para transferência!');
            setFormError({ ...formError, amount: true });
        } else {
            setAmountError('');
            setFormError({ ...formError, amount: false });
        }

        return isValid;
    }

    const isNil = (value: any) => {
        return value === null || value === undefined || value === '' || value === 0
    }

    const getTransferTypeLabel = (value: string) => {
        switch (value) {
            case 'pix':
                return 'Pix';
            case 'ted':
                return 'TED';
            case 'app':
                return 'Aplicativo';
            default:
                return 'TED';
        }
    }

    const getStatusLabel = (value: number) => {
        switch (value) {
            case 0:
                return 'Aguardando';
            case 1:
                return 'Processando';
            case 2:
                return 'Pago';
            case 3:
                return 'Falha';
            case 4:
                return 'Cancelado';

        }
    }

    const getStatusLabelColor = (value: number) => {
        switch (value) {
            case 0:
                return '#393099';
            case 1:
                return '#2D912C';
        }
    }

    const save = () => {

        //console.log(cashOut)

        if (isFormValid()) {
            dispatch(CashOutActions.execute({
                ...cashOut,
                bankAccount: tab === 'pix' || tab === 'app' ? null : cashOut.bankAccount,
                pixKey: tab === 'pix' ? cashOut.pixKey : null,
                pixType: tab === 'pix' ? cashOut.pixType : null
            }))

            setShowSuccessTab(true)
        }
    }

    const refresh = () => {
        setFormattedAmount('')
        dispatch(CashOutActions.reset());
        setFormError(initialFormError)
        setShowSuccessTab(false);
    }

    const sortByName = (a: string, b: string) => {
        if (a < b) { return -1; }
        if (a > b) { return 1; }
        return 0;
    }


    return (<>
        <MenuLeft>
            <LayoutBasePages
                children={undefined}
                barraDeFerrementas={(
                    <ListingTools titlePage="Solicitar saque" />

                )} />
            <Container>
                <div style={{ width: '60%', paddingRight: '30px' }}>
                    <Typography
                        variant={smDown ? 'h5' : mdDown ? 'h6' : 'h6'}
                        whiteSpace={"normal"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        style={{ marginBottom: '16px' }}
                    >
                        Transfira seu saldo para uma conta de mesma titularidade.
                    </Typography>
                    <Typography
                        variant={'subtitle1'}
                        whiteSpace={'normal'}
                        overflow={"hidden"}
                        textOverflow={'ellipsis'}
                        color={'#505050'}
                        style={{ marginBottom: '16px' }}
                    >
                        Envie para um banco de sua preferência ou utilize o aplicativo da Shift para transferir, pagar contas e muito mais.
                    </Typography>
                    <Typography
                        variant={'subtitle1'}
                        whiteSpace={'normal'}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        color={'#505050'}
                        style={{ marginBottom: '20px' }}
                    >
                        {/* <Link href="www.google.com" target='_blank'>Veja aqui um passo a passo sobre o aplicativo da Shift.</Link> */}
                    </Typography>
                    <Card style={{ display: 'flex', border: '1px solid #9993E0', marginBottom: '26px' }}>
                        <div style={{ marginRight: '15px' }}>
                            <RoundIconBorder><AttachMoneyIcon /></RoundIconBorder>
                        </div>
                        <div>
                            <Typography
                                variant={'subtitle1'}
                                whiteSpace={'normal'}
                                overflow={"hidden"}
                                textOverflow={'ellipsis'}
                                color={'#505050'}
                                style={{ marginBottom: '10px' }}
                            >
                                Saldo disponível para transferência
                            </Typography>
                            <div>
                                <Value><MoneyIcon>R$</MoneyIcon> {applyCurrency(accountBalance.balance / 100, 'decimal')}</Value>
                            </div>
                        </div>
                    </Card>
                    <Typography
                        variant={smDown ? 'h5' : mdDown ? 'h6' : 'h6'}
                        whiteSpace={"normal"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        style={{ marginBottom: '16px' }}
                    >
                        Últimas solicitações
                    </Typography>
                    <ScrollContainer>
                        {withdraw.withdraws.length > 0 ? withdraw.withdraws.map(withdraw => <Card>
                            <TableHeader>
                                <div>
                                    <ColumnTitle>Data</ColumnTitle>
                                    <ColumnValue>{dayjs(withdraw.createdAt).format('DD/MM/YYYY')}</ColumnValue>
                                </div>
                                <div>
                                    <ColumnTitle>Valor</ColumnTitle>
                                    <ColumnValue>R$ {applyCurrency(withdraw.amount / 100, 'decimal')}</ColumnValue>
                                </div>
                                <div>
                                    <ColumnTitle>Transferência</ColumnTitle>
                                    <ColumnValue>{getTransferTypeLabel(withdraw.bankAccountType)}</ColumnValue>
                                </div>
                            </TableHeader>
                            <TableFooter>
                                <TableFooterValue style={{ color: getStatusLabelColor(withdraw.statusCode) }}>{getStatusLabel(withdraw.statusCode)}</TableFooterValue>
                            </TableFooter>
                        </Card>)
                            : <Card>
                                <Typography
                                    variant={smDown ? 'h5' : mdDown ? 'h6' : 'h6'}
                                    whiteSpace={"normal"}
                                    overflow={"hidden"}
                                    textOverflow={"ellipsis"}
                                    textAlign={'center'}
                                    color={'#747272'}
                                >
                                    Nenhuma solicitação de pagamento encontrada.
                                </Typography>
                            </Card>}
                    </ScrollContainer>
                </div>
                <div style={{ width: '40%' }}>
                    {tab === 'error' && <Card>
                        <div style={{ textAlign: 'center' }}>
                            <img src="https://static.shiftpagamentos.com.br/web/charge-error.png" width={200} alt="" />
                            <Typography
                                variant={smDown ? 'h4' : mdDown ? 'h5' : 'h5'}
                                overflow={"hidden"}
                                textOverflow={"ellipsis"}
                                textAlign={'center'}
                                mt={2}
                            >
                                Ops! Tivemos um problema
                            </Typography>
                            <Typography
                                mt={3}
                                variant={'subtitle1'}
                                overflow={"hidden"}
                                textOverflow={"ellipsis"}
                                textAlign={'center'}
                            >
                                Infelizmente tivemos um problema e não conseguimos realizar o saque.
                            </Typography>
                            <Typography
                                mt={2}
                                mb={5}
                                variant={'subtitle1'}
                                overflow={"hidden"}
                                textOverflow={"ellipsis"}
                                textAlign={'center'}
                            >
                                Por favor, tente novamente.
                            </Typography>
                            <div>
                                <UiOutlinedButton style={{ width: '100%' }} onClick={() => setTab('bank_transfer')}>Tentar novamente</UiOutlinedButton>
                            </div>
                        </div>
                    </Card>}
                    {showSuccessTab
                        ? <Card>
                            <Typography
                                variant={smDown ? 'h5' : mdDown ? 'h6' : 'h6'}
                                whiteSpace={"normal"}
                                overflow={"hidden"}
                                textOverflow={"ellipsis"}
                                style={{ marginBottom: '16px' }}
                            >
                                Solicitação efetuada com sucesso
                            </Typography>
                            <div>
                                <div style={{ color: '#A4A1A1', fontSize: '14px' }}>Valor</div>
                                <ColumnValue style={{ marginBottom: '8px', fontWeight: 'bold' }}>R$ {applyCurrency(cashOut.amount / 100, 'decimal')}</ColumnValue>
                            </div>
                            {tab === 'pix' && <>
                                <div>
                                    <div style={{ color: '#A4A1A1', fontSize: '14px' }}>Pix</div>
                                    <ColumnValue style={{ marginBottom: '10px', fontWeight: 'bold' }}>{cashOut.pixKey}</ColumnValue>
                                </div></>}
                            {tab === 'bank_transfer' && <>
                                <div>
                                    <div style={{ color: '#A4A1A1', fontSize: '14px' }}>Banco</div>
                                    <ColumnValue style={{ marginBottom: '8px', fontWeight: 'bold' }}>{cashOut.bankAccount.bankCode}</ColumnValue>
                                </div>
                                <div>
                                    <div style={{ color: '#A4A1A1', fontSize: '14px' }}>Agência</div>
                                    <ColumnValue style={{ marginBottom: '8px', fontWeight: 'bold' }}>{cashOut.bankAccount.branch}</ColumnValue>
                                </div>
                                <div>
                                    <div style={{ color: '#A4A1A1', fontSize: '14px' }}>Conta</div>
                                    <ColumnValue style={{ marginBottom: '10px', fontWeight: 'bold' }}>{cashOut.bankAccount.account}</ColumnValue>
                                </div>
                            </>}
                            <div>
                                <UiOutlinedButton style={{ width: '100%' }} onClick={refresh}>Solicitar nova transferência</UiOutlinedButton>
                            </div>
                        </Card>
                        : tab !== 'error' && <Card>
                            <Typography
                                variant={smDown ? 'h5' : mdDown ? 'h6' : 'h6'}
                                whiteSpace={"normal"}
                                overflow={"hidden"}
                                textOverflow={"ellipsis"}
                                style={{ marginBottom: '16px' }}
                            >
                                Como deseja transferir o dinheiro?
                            </Typography>
                            <div style={{
                                display: 'flex', flex: 'column', justifyContent: 'space-between', flexWrap: 'wrap',
                                borderBottom: '1.33px solid #A4A1A1', paddingBottom: '10px', marginBottom: '20px'
                            }}>
                                {/* {tab === 'pix' ? <CashOutMethodButtonActive onClick={() => setTab('pix')}><PixIcon /> Pix</CashOutMethodButtonActive> : <CashOutMethodButton onClick={() => setTab('pix')}><PixIcon /> Pix</CashOutMethodButton>} */}
                                {tab === 'bank_transfer' ? <CashOutMethodButtonActive onClick={() => setTab('bank_transfer')}><AccountBalanceOutlinedIcon /> Transferência</CashOutMethodButtonActive> : <CashOutMethodButton onClick={() => setTab('bank_transfer')}><AccountBalanceOutlinedIcon /> Transferência</CashOutMethodButton>}
                                {/* {tab === 'app' ? <CashOutMethodButtonActive onClick={() => setTab('app')}><SmartphoneOutlinedIcon /> Aplicativo</CashOutMethodButtonActive> : <CashOutMethodButton onClick={() => setTab('app')}><SmartphoneOutlinedIcon /> Aplicativo</CashOutMethodButton>} */}
                            </div>
                            <div style={{ display: tab === 'pix' ? 'block' : 'none' }}>
                                <div style={{ display: 'flex', justifyContent: 'end', gap: '0.5em', marginBottom: '15px' }}>
                                    <div style={{
                                        color: '#5143E7',
                                        border: '1px solid #5143E7',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        fontSize: '14px'
                                    }}>Disponível <strong>R$ {applyCurrency(accountBalance.balance / 100, 'decimal')}</strong></div>
                                    <div style={{
                                        color: '#09A498',
                                        border: '1px solid #00F4E0',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        fontSize: '14px',
                                        fontWeight: 'bold'
                                    }}>Receba na hora</div>
                                </div>

                                <NumericFormat {...{
                                    ...materialUINumberTextFieldProps,
                                    label: 'Qual valor você deseja transferir?',
                                    placeholder: 'Qual valor você deseja transferir?',
                                    error: formError['amount'],
                                    helperText: formError['amount'] ? amountError !== '' ? amountError : 'Campo obrigatório!' : null
                                }}
                                    customInput={UiTextField}
                                    decimalScale={2}
                                    value={formattedAmount}
                                    onValueChange={(values) => {
                                        const { formattedValue, value, floatValue } = values;

                                        dispatch(CashOutActions.set({ ...cashOut, amount: toCent(parseFloat(value)) }))
                                        setFormattedAmount(formattedValue)
                                        validateAmount(value)
                                        // do something with floatValue
                                    }}
                                    //onChange={handleFormValidation}
                                    type={'text'}
                                    thousandSeparator={'.'}
                                    decimalSeparator={','}
                                    prefix={'R$ '}
                                    name='amount'
                                />

                                <UiTextField
                                    error={formError['pixKey']}
                                    helperText={formError['pixKey'] ? 'Campo obrigatório!' : null}
                                    label='Insira a chave pix'
                                    variant='outlined'
                                    placeholder='Insira a chave pix'
                                    multiline={false}
                                    size='small'
                                    value={cashOut.pixKey}
                                    name='pixKey'
                                    onChange={handleInputChange}
                                    required
                                />

                                <UiButton
                                    onClick={save}
                                >
                                    Solicitar transferência
                                </UiButton>
                            </div>
                            <div style={{ display: tab === 'bank_transfer' ? 'block' : 'none' }}>
                                <div style={{ display: 'flex', justifyContent: 'end', gap: '0.5em', marginBottom: '15px' }}>
                                    <div style={{
                                        color: '#5143E7',
                                        border: '1px solid #5143E7',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        fontSize: '14px'
                                    }}>Disponível <strong>R$ {applyCurrency(accountBalance.balance / 100, 'decimal')}</strong></div>
                                    <div style={{
                                        color: '#09A498',
                                        border: '1px solid #00F4E0',
                                        borderRadius: '4px',
                                        padding: '8px',
                                        fontSize: '14px',
                                        fontWeight: 'bold'
                                    }}>Receba em até 1 dia útil</div>
                                </div>

                                <NumericFormat {...{
                                    ...materialUINumberTextFieldProps,
                                    label: 'Qual valor você deseja transferir?',
                                    placeholder: 'Qual valor você deseja transferir?',
                                    error: formError['amount'],
                                    helperText: formError['amount'] ? amountError !== '' ? amountError : 'Campo obrigatório!' : null
                                }}
                                    customInput={UiTextField}
                                    decimalScale={2}
                                    value={formattedAmount}
                                    onValueChange={(values) => {
                                        const { formattedValue, value, floatValue } = values;

                                        dispatch(CashOutActions.set({ ...cashOut, amount: toCent(parseFloat(value)) }))
                                        setFormattedAmount(formattedValue)
                                        validateAmount(value)
                                        // do something with floatValue
                                    }}
                                    // onChange={handleFormValidation}
                                    type={'text'}
                                    thousandSeparator={'.'}
                                    decimalSeparator={','}
                                    prefix={'R$ '}
                                    name='amount'
                                />

                                <FormControl size="small" fullWidth variant="outlined">
                                    <InputLabel htmlFor="demo-simple-select" sx={{
                                        textAlign: 'left',
                                        color: formError['bankCode'] ? '#d32f2f' : '',
                                        "&.Mui-focused": {
                                            color: "#5143E7"
                                        },
                                    }}>Selecione um banco</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        error={formError['bankCode']}
                                        value={isNil(cashOut.bankAccount.bankCode) ? '' : cashOut.bankAccount.bankCode}
                                        onChange={(event) => {
                                            const bankCode = event.target.value;
                                            handleFormValidation(event)
                                            dispatch(CashOutActions.set({
                                                ...cashOut, bankAccount: {
                                                    ...cashOut.bankAccount,
                                                    bankCode: bankCode
                                                }
                                            }))
                                        }}
                                        sx={PasswordInputStyle}
                                        name="bankCode"
                                        label="Selecione um banco"
                                    >
                                        <MenuItem value='' disabled>Selecione</MenuItem>
                                        <ListSubheader>Principais</ListSubheader>
                                        {BANKS.main.map(bank => <MenuItem value={bank.COMPE}>{bank.COMPE} - {bank.LongName}</MenuItem>)}
                                        <ListSubheader>Todos</ListSubheader>
                                        {BANKS.all.sort((a, b) => sortByName(a.COMPE, b.COMPE)).map(bank => <MenuItem value={bank.COMPE}>{bank.COMPE} - {bank.LongName}</MenuItem>)}
                                    </Select>
                                </FormControl>

                                <UiTextField
                                    error={formError['branch']}
                                    helperText={formError['branch'] ? 'Campo obrigatório!' : null}
                                    label='Digite a agência'
                                    variant='outlined'
                                    placeholder='Digite a agência'
                                    multiline={false}
                                    size='small'
                                    value={cashOut.bankAccount.branch}
                                    name='branch'
                                    onChange={(event) => {
                                        handleFormValidation(event)
                                        dispatch(CashOutActions.set({
                                            ...cashOut, bankAccount: {
                                                ...cashOut.bankAccount,
                                                branch: event.target.value
                                            }
                                        }))
                                    }}
                                    required
                                />

                                <UiTextField
                                    error={formError['account']}
                                    helperText={formError['account'] ? 'Campo obrigatório!' : null}
                                    label='Digite a conta com dígito (sem o hífen)'
                                    variant='outlined'
                                    placeholder='Digite a conta com dígito'
                                    type='number'
                                    size='small'
                                    value={cashOut.bankAccount.account}
                                    name='account'
                                    inputProps={{ maxLength: 20 }}
                                    onChange={(event) => {
                                        handleFormValidation(event)
                                        dispatch(CashOutActions.set({
                                            ...cashOut, bankAccount: {
                                                ...cashOut.bankAccount,
                                                account: event.target.value
                                            }
                                        }))
                                    }}
                                    required
                                />

                                <FormControl>
                                    <FormLabel id="demo-controlled-radio-buttons-group">Tipo da conta</FormLabel>
                                    <RadioGroup
                                        aria-labelledby="demo-controlled-radio-buttons-group"
                                        name="controlled-radio-buttons-group"
                                        value={cashOut.bankAccount.accountType}
                                        onChange={(event) => {
                                            handleFormValidation(event)
                                            dispatch(CashOutActions.set({
                                                ...cashOut, bankAccount: {
                                                    ...cashOut.bankAccount,
                                                    accountType: event.target.value
                                                }
                                            }))
                                        }}
                                    >
                                        <FormControlLabel value="CC" control={<Radio
                                            sx={{
                                                color: '#5143E7',
                                                '&.Mui-checked': {
                                                    color: '#5143E7',
                                                },
                                            }}
                                        />} label="Conta Corrente" />
                                        <FormControlLabel value="CP" control={<Radio sx={{
                                            color: '#5143E7',
                                            '&.Mui-checked': {
                                                color: '#5143E7',
                                            },
                                        }}
                                        />} label="Conta Poupança" />
                                    </RadioGroup>
                                </FormControl>

                                <UiButton
                                    onClick={save}
                                >
                                    Solicitar transferência
                                </UiButton>
                            </div>
                            <div style={{ display: tab === 'app' ? 'block' : 'none', textAlign: 'center' }}>
                                <Typography
                                    variant={smDown ? 'h5' : mdDown ? 'h6' : 'h6'}
                                    whiteSpace={"normal"}
                                    overflow={"hidden"}
                                    textOverflow={"ellipsis"}
                                    style={{ marginBottom: '16px' }}
                                >
                                    Em breve
                                </Typography>
                                {/* <Typography
                            variant={smDown ? 'h5' : mdDown ? 'h6' : 'h6'}
                            whiteSpace={"normal"}
                            overflow={"hidden"}
                            textOverflow={"ellipsis"}
                            style={{ marginBottom: '16px' }}
                        >
                            Baixe o aplicativo da Shift para transferir e pagar contas de forma simples.
                        </Typography>
                        <Typography
                            variant={'subtitle1'}
                            whiteSpace={'normal'}
                            overflow={"hidden"}
                            textOverflow={'ellipsis'}
                            color={'#505050'}
                            style={{ marginBottom: '16px' }}
                        >
                            Acesse com os mesmo dados de login do portal.
                            <div><Link href="www.google.com" target='_blank'>Clique aqui para ver um passo a passo.</Link></div>
                        </Typography>
                        <img src="https://media.istockphoto.com/id/828088276/vector/qr-code-illustration.jpg?s=612x612&w=0&k=20&c=FnA7agr57XpFi081ZT5sEmxhLytMBlK4vzdQxt8A70M=" width={200} alt="" /> */}
                            </div>

                            <div style={{ display: tab === 'error' ? 'block' : 'none', textAlign: 'center' }}>
                                <Typography
                                    variant={smDown ? 'h5' : mdDown ? 'h6' : 'h6'}
                                    whiteSpace={"normal"}
                                    overflow={"hidden"}
                                    textOverflow={"ellipsis"}
                                    style={{ marginBottom: '16px' }}
                                >
                                    Em breve
                                </Typography>
                            </div>
                        </Card>}

                </div>
            </Container>
        </MenuLeft>
    </>)
}

