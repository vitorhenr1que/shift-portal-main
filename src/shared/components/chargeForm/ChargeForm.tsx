import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br';
import { Typography, useMediaQuery, useTheme, Link, Grid, Box } from "@mui/material"
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { NumericFormat, PatternFormat } from 'react-number-format';
import { CreateBillingActions } from '../../../store/reducers/createBillingReducer'
import { ICreateBillingReducer } from '../../../store/reducers/interfaces';
import { toCent } from '../../utils'
import { UiButton, UiTextField, UiOutlinedButton } from './styles';

const LOCALE = 'pt-br'

const materialUINumberTextFieldProps = {
    variant: 'outlined',
    multiline: false,
    size: 'small',
    required: true
};

const initialFormError = {
    title: false,
    amount: false,
    description: false,
    customerName: false,
    customerDocument: false,
    customerPhoneNumber: false,
    dueDate: false
}

export default function ChargeForm(): JSX.Element {
    const dispatch = useDispatch();
    const billing = useSelector((state: any): ICreateBillingReducer => state.CreateBillingReducer);
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('sm'));
    const [step, setStep] = React.useState('form');
    const [formattedAmount, setFormattedAmount] = React.useState('');
    const [formattedDocument, setFormattedDocument] = React.useState('');
    const [formattedPhoneNumber, setFormattedPhoneNumber] = React.useState('');
    const [formattedDueDate, setFormattedDueDate] = React.useState<Dayjs | null>(dayjs().add(1, 'day'));
    const [formError, setFormError] = React.useState(initialFormError);
    React.useEffect(() => {
        if (billing.error) {
            setStep('error')
        }

        if (billing.isSuccessful) {
            setStep('success')
        }

        //console.log(billing)

    }, [billing]);

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        handleFormValidation(e);
        dispatch(CreateBillingActions.setBilling({ ...billing, [name]: value }));
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
        let property: keyof typeof formError;
        for (property in formError) {
            if (formError[property] || !billing[property]) {
                newFormError = { ...newFormError, [property]: true }
                invalidInputs.push(property)
            }
        }
        setFormError(newFormError)
        return invalidInputs.length === 0
    }

    const goToSummary = () => {
        if (!isFormValid()) {
            return;
        }

        setStep('summary')
    }

    const save = () => {

        //console.log(billing)

        dispatch(CreateBillingActions.execute(billing))
    }

    const edit = () => {
        dispatch(CreateBillingActions.failure(''));
        setStep('form');
    }

    const onReset = () => {
        setFormattedAmount('')
        setFormattedDocument('')
        setFormattedPhoneNumber('')
        setFormattedDueDate(dayjs().add(1, 'day'))
        setFormError(initialFormError)
        dispatch(CreateBillingActions.reset());
        setStep('form');
    }

    return (
        <>
            <div style={{ width: '100%', maxWidth: 400, background: '#fff', borderRadius: '7px', padding: '40px', display: step === 'form' ? 'block' : 'none' }}>
                <Typography
                    variant={smDown ? 'h5' : mdDown ? 'h6' : 'h6'}
                    whiteSpace={"normal"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    color={'#505050'}
                >
                    Etapa 1
                </Typography>
                <Typography
                    variant={'subtitle1'}
                    whiteSpace={"normal"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    color={'#505050'}
                >
                    Dados da cobrança
                </Typography>

                <div style={{ display: 'flex', overflow: 'hidden', height: '10px', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div style={{ background: '#776CEF', width: '49%', borderRadius: '3px' }}></div>
                    <div style={{ background: '#DFDFDF', width: '49%', borderRadius: '3px' }}></div>
                </div>

                <UiTextField
                    error={formError['customerName']}
                    helperText={formError['customerName'] ? 'Campo obrigatório!' : null}
                    label='Nome do cliente'
                    variant='outlined'
                    placeholder='Nome do cliente'
                    multiline={false}
                    size='small'
                    value={billing.customerName}
                    name='customerName'
                    onChange={handleInputChange}
                    required
                />


                <PatternFormat {...{
                    ...materialUINumberTextFieldProps,
                    label: 'CPF ou CNPJ do cliente',
                    placeholder: 'CPF ou CNPJ do cliente',
                    error: formError['customerDocument'],
                    helperText: formError['customerDocument'] ? 'Campo obrigatório!' : null
                }}
                    onChange={handleFormValidation}
                    format={billing.customerDocument.length <= 11 ? '###.###.###-###' : '##.###.###/####-##'}
                    mask=""
                    customInput={UiTextField}
                    value={formattedDocument}
                    onValueChange={(values) => {
                        const { formattedValue, value, floatValue } = values;
                        dispatch(CreateBillingActions.setBilling({ ...billing, customerDocument: value }))
                        setFormattedDocument(formattedValue)
                    }}
                    name='customerDocument'
                />

                <UiTextField
                    error={formError['title']}
                    helperText={formError['title'] ? 'Campo obrigatório!' : null}
                    label='Título da cobrança'
                    variant='outlined'
                    placeholder='Título da cobrança'
                    multiline={false}
                    size='small'
                    value={billing.title}
                    name='title'
                    onChange={handleInputChange}
                    required
                />

                <NumericFormat {...{
                    ...materialUINumberTextFieldProps,
                    label: 'Valor da cobrança',
                    placeholder: 'Valor da cobrança',
                    error: formError['amount'],
                    helperText: formError['amount'] ? 'Campo obrigatório!' : null
                }}
                    customInput={UiTextField}
                    decimalScale={2}
                    value={formattedAmount}
                    onValueChange={(values) => {
                        const { formattedValue, value, floatValue } = values;
                        dispatch(CreateBillingActions.setBilling({ ...billing, amount: toCent(parseFloat(value)) }))
                        setFormattedAmount(formattedValue)
                        // do something with floatValue
                    }}
                    onChange={handleFormValidation}
                    type={'text'}
                    thousandSeparator={'.'}
                    decimalSeparator={','}
                    prefix={'R$ '}
                    name='amount'
                />

                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={LOCALE}>
                    <DesktopDatePicker
                        label='Data de vencimento'
                        value={billing.dueDate}
                        onChange={(newValue) => {
                            dispatch(CreateBillingActions.setBilling({ ...billing, dueDate: dayjs(newValue).isValid() ? dayjs(newValue).format('YYYY-MM-DD 23:59:59') : billing.dueDate }))
                        }}
                        renderInput={(params) => <UiTextField  {...{
                            ...params,
                            label: 'Data de vencimento',
                            name: 'dueDate',
                            variant: 'outlined',
                            multiline: false,
                            size: 'small'
                        }} />}
                    />
                </LocalizationProvider>

                <PatternFormat {...{
                    ...materialUINumberTextFieldProps,
                    label: 'Número do WhatsApp',
                    placeholder: 'Número do WhatsApp',
                    error: formError['customerPhoneNumber'],
                    helperText: formError['customerPhoneNumber'] ? 'Campo obrigatório!' : null
                }}
                    format="(##) #####-####" mask="_"
                    value={formattedPhoneNumber}
                    customInput={UiTextField}
                    name='customerPhoneNumber'
                    onValueChange={(values) => {
                        const { formattedValue, value } = values;
                        // formattedValue = $2,223
                        // value ie, 2223
                        dispatch(CreateBillingActions.setBilling({ ...billing, customerPhoneNumber: value }))
                        setFormattedPhoneNumber(formattedValue)
                    }}
                    onChange={handleFormValidation}
                />

                <UiTextField
                    label='Descrição'
                    error={formError['description']}
                    helperText={formError['description'] ? 'Campo obrigatório!' : null}
                    variant='outlined'
                    placeholder="Descrição da cobrança"
                    multiline={true}
                    rows={2}
                    value={billing.description}
                    name='description'
                    onChange={handleInputChange}
                    inputProps={{ maxLength: 140 }}
                    required
                />

                <UiButton
                    autoFocus
                    onClick={goToSummary}
                >
                    Avançar para revisão
                </UiButton>
            </div>

            <div style={{ maxWidth: 400, width: 400, background: '#fff', borderRadius: '7px', padding: '40px', display: step === 'summary' ? 'block' : 'none' }}>
                <Typography
                    variant={smDown ? 'h5' : mdDown ? 'h6' : 'h6'}
                    whiteSpace={"normal"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    color={'#505050'}
                >
                    Etapa 2
                </Typography>
                <Typography
                    variant={'subtitle1'}
                    whiteSpace={"normal"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    color={'#505050'}
                >
                    Revisão de Dados
                </Typography>

                <div style={{ display: 'flex', overflow: 'hidden', height: '10px', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <div style={{ background: '#4337CA', width: '49%', borderRadius: '3px' }}></div>
                    <div style={{ background: '#776CEF', width: '49%', borderRadius: '3px' }}></div>
                </div>

                <Typography
                    mt={2}
                    variant={'subtitle2'}
                    whiteSpace={"normal"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    color={'#A4A1A1'}
                >
                    Nome completo do cliente
                </Typography>
                <Typography
                    variant={'subtitle1'}
                    whiteSpace={"normal"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    color={'#747272'}
                    fontWeight={'bold'}
                >
                    {billing.customerName}
                </Typography>

                <Typography
                    mt={2}
                    variant={'subtitle2'}
                    whiteSpace={"normal"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    color={'#A4A1A1'}
                >
                    CPF ou CNPJ
                </Typography>
                <Typography
                    variant={'subtitle1'}
                    whiteSpace={"normal"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    color={'#747272'}
                    fontWeight={'bold'}
                >
                    {formattedDocument}
                </Typography>

                <Typography
                    mt={2}
                    variant={'subtitle2'}
                    whiteSpace={"normal"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    color={'#A4A1A1'}
                >
                    Valor da cobrança
                </Typography>
                <Typography
                    variant={'subtitle1'}
                    whiteSpace={"normal"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    color={'#747272'}
                    fontWeight={'bold'}
                >
                    {formattedAmount}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom color={'#747272'} style={{ borderTop: '1px solid #DFDFDF'}}>
                    A Shift cobra um custo transacional de <span style={{ color: '#4337CA' }}>R$ 1,99</span> sobre o valor total da cobrança que será debitado após o recebimento..
                </Typography>

                <Typography
                    mt={2}
                    variant={'subtitle2'}
                    whiteSpace={"normal"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    color={'#A4A1A1'}
                >
                    Data de vencimento
                </Typography>
                <Typography
                    variant={'subtitle1'}
                    whiteSpace={"normal"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    color={'#747272'}
                    fontWeight={'bold'}
                >
                    {billing.dueDate !== null ? dayjs(billing.dueDate).format('DD/MM/YYYY') : null}
                </Typography>

                <Typography
                    mt={2}
                    variant={'subtitle2'}
                    whiteSpace={"normal"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    color={'#A4A1A1'}
                >
                    Número do WhatsApp
                </Typography>
                <Typography
                    variant={'subtitle1'}
                    whiteSpace={"normal"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    color={'#747272'}
                    fontWeight={'bold'}
                >
                    {formattedPhoneNumber}
                </Typography>

                <Typography
                    mt={2}
                    variant={'subtitle2'}
                    whiteSpace={"normal"}
                    overflow={"hidden"}
                    textOverflow={"ellipsis"}
                    color={'#A4A1A1'}
                >
                    Descrição
                </Typography>
                <Typography
                    variant={'body1'}
                    color={'#747272'}
                    fontWeight={'bold'}
                    gutterBottom
                >
                    {!billing.description ? '-' : billing.description}
                </Typography>

                <UiButton autoFocus onClick={save} disabled={billing.loading}>
                    {billing.loading ? 'Aguarde...' : 'Enviar Cobrança'}
                </UiButton>
                <Grid container justifyContent="center" direction="column" alignItems="center">
                    <Link
                        disabled={billing.loading}
                        component="button"
                        variant="body1"
                        underline="none"
                        color={'#4337CA'}
                        onClick={edit}
                    >
                        Editar cobrança
                    </Link>
                </Grid>
            </div>
            <div style={{ maxWidth: 400, width: 400, background: '#fff', borderRadius: '7px', padding: '40px', display: step === 'success' ? 'block' : 'none' }}>
                <Grid container justifyContent="center" direction="column" alignItems="center">
                    <img src="https://static.shiftpagamentos.com.br/web/charge-sent.png" width={150} alt="" />
                    <Typography
                        variant={smDown ? 'h4' : mdDown ? 'h5' : 'h5'}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        textAlign={'center'}
                        mt={2}
                    >
                        Cobrança enviada com sucesso!
                    </Typography>
                    <Typography
                        mt={3}
                        mb={5}
                        variant={'subtitle1'}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        textAlign={'center'}
                    >
                        Você pode acompanhar o pagamento na página de minhas cobranças.
                    </Typography>
                    <UiButton autoFocus onClick={onReset}>
                        Criar nova cobrança
                    </UiButton>
                </Grid>
            </div>
            <div style={{ maxWidth: 400, width: 400, background: '#fff', borderRadius: '7px', padding: '40px', display: step === 'error' ? 'block' : 'none' }}>
                <Grid container justifyContent="center" direction="column" alignItems="center">
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
                        Infelizmente tivemos um problema e não conseguimos criar e enviar a cobrança.
                    </Typography>
                    <Typography
                        mt={2}
                        mb={5}
                        variant={'subtitle1'}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        textAlign={'center'}
                    >
                        Por favor, tente novamente. A criação de cobrança com erro não gerou custos.
                    </Typography>
                    <UiButton autoFocus onClick={save}>
                    {billing.loading ? 'Aguarde...' : 'Tentar novamente'}
                    </UiButton>
                    <Grid container justifyContent="center" direction="column" alignItems="center">
                        <Link
                            component="button"
                            variant="body1"
                            underline="none"
                            color={'#4337CA'}
                            onClick={edit}
                        >
                            Editar dados
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}