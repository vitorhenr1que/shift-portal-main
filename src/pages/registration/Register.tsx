import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { NumericFormat, PatternFormat } from 'react-number-format';
import {
    FormControlLabel, FormControl, InputAdornment, InputLabel, OutlinedInput, IconButton, Alert, Snackbar, Select, MenuItem,
} from "@mui/material";
import Checkbox from '@mui/material/Checkbox';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { ICreateAccountReducer } from '../../store/reducers/interfaces';
import { CreateAccountActions } from '../../store/reducers/createAccountReducer';
import {
    UiTextField, Container, Button, Logo, Title, Subtitle, Image, FieldsInRow, Body, Link, UiFormControlLabel, LoginContainer,
    RegisterForm, StyledSpan, FormTitle, IconItem
} from './styles';
import BRAZIL_STATES from './states.json'
import COMPANY_TYPE from './companyType.json'


const materialUINumberTextFieldProps = {
    variant: 'outlined',
    multiline: false,
    size: 'small',
    required: true
};

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

const initialFormError = {
    companyName: false,
    companyTradingName: false,
    companyDocument: false,
    companyType: false,
    personName: false,
    personDocument: false,
    personPhoneNumber: false,
    personEmail: false,
    userPassword: false,
    confirmUserPassword: false,
    addressStreet: false,
    addressStreetNumber: false,
    addressCity: false,
    addressNeighborhood: false,
    addressComplement: false,
    addressZipCode: false,
    addressState: false
}

export default function Register() {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const account = useSelector((state: any): ICreateAccountReducer => state.CreateAccountReducer);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [accepted, setAccepted] = useState(false);
    const [open, setOpen] = useState(false);
    const [openError, setOpenError] = useState(false);
    const [formattedCompanyDocument, setFormattedCompanyDocument] = useState('');
    const [formattedPostalCode, setFormattedFormattedPostalCode] = useState('');
    const [formattedDocument, setFormattedDocument] = useState('');
    const [formattedPhoneNumber, setFormattedPhoneNumber] = useState('');
    const [confirmUserPassword, setConfirmUserPassword] = useState('');
    const [formError, setFormError] = useState(initialFormError);
    const [searchPostalCode, setSearchPostalCode] = useState('')
    const [searchCNPJ, setSearchCNPJ] = useState('')
    const [step, setStep] = useState('begin')

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            //console.log(searchPostalCode)
            findAddress()
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchPostalCode])

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            //console.log(searchCNPJ)
            findCNPJ()
        }, 500)

        return () => clearTimeout(delayDebounceFn)
    }, [searchCNPJ])

    useEffect(() => {
        if (account.error && !openError) {
            setOpenError(true)
        }

        if (account.isSuccessful) {
            setOpen(true)
            navigate('/')
        }
        //console.log(account)
    }, [account]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const handleCloseError = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenError(false);
    };

    const isFormValid = (firstStep: boolean = false) => {
        const invalidInputs = [];
        let newFormError = { ...formError }

        if (firstStep) {
            newFormError.companyName = isNil(account.company.name)
            newFormError.companyTradingName = isNil(account.company.tradingName)
            newFormError.companyDocument = isNil(account.company.document)
            newFormError.companyType = isNil(account.company.type)
            newFormError.addressStreet = isNil(account.address.street)
            newFormError.addressStreetNumber = isNil(account.address.number)
            newFormError.addressZipCode = isNil(account.address.zipCode)
            newFormError.addressState = isNil(account.address.state)
            newFormError.personName = false
            newFormError.personDocument = false
            newFormError.personEmail = false
            newFormError.personPhoneNumber = false
            newFormError.userPassword = false
            newFormError.confirmUserPassword = false
        } else {
            newFormError.companyName = isNil(account.company.name)
            newFormError.companyTradingName = isNil(account.company.tradingName)
            newFormError.companyDocument = isNil(account.company.document)
            newFormError.companyType = isNil(account.company.type)
            newFormError.addressStreet = isNil(account.address.street)
            newFormError.addressStreetNumber = isNil(account.address.number)
            newFormError.addressZipCode = isNil(account.address.zipCode)
            newFormError.addressState = isNil(account.address.state)
            newFormError.personName = isNil(account.person.name)
            newFormError.personDocument = isNil(account.person.cpf)
            newFormError.personEmail = isNil(account.person.email)
            newFormError.personPhoneNumber = isNil(account.person.phoneNumber)
            newFormError.userPassword = isNil(account.user.password) && !isValidPassword(account.user.password)
            newFormError.confirmUserPassword = newFormError.userPassword
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

    const isValidPassword = (password: string) => {
        return !isNil(password)
            && password.length >= 6
            && !isNil(password.match(new RegExp("[A-Z]")))
            && !isNil(password.match(new RegExp("[a-z]")))
            && !isNil(password.match(new RegExp("[0-9]")))
            && !isNil(password.match(new RegExp("[$&+,:;=?@#|'<>.^*()%!-]")))
    }

    const isNil = (value: any) => {
        return value === null || value === undefined || value === '' || value === 0
    }

    const handleFormValidation = (e: any) => {
        const { name, value } = e.target;

        if (!value) {
            setFormError({ ...formError, [name]: true })
        } else {
            setFormError({ ...formError, [name]: false })
        }
    }

    const findCNPJ = () => {
        if (searchCNPJ !== '' && searchCNPJ.length === 14) {
            fetch(`https://publica.cnpj.ws/cnpj/${searchCNPJ}`)
                .then(res => res.json())
                .then(result => {
                    dispatch(CreateAccountActions.set({
                        ...account,
                        company: {
                            ...account.company,
                            tradingName: result.estabelecimento.nome_fantasia,
                            name: result.razao_social
                        },
                        address:{
                            ...account.address,
                            zipCode: result.estabelecimento.cep,
                            number: result.estabelecimento.numero,
                            street: result.estabelecimento.tipo_logradouro + ' ' + result.estabelecimento.logradouro,
                            complement: result.estabelecimento.complemento,
                            state: result.estabelecimento.estado.sigla,
                            city: result.estabelecimento.cidade.nome,
                            neighborhood: result.estabelecimento.bairro
                        },
                    }))
                    setFormError({ ...formError, addressStreet: false, addressZipCode: false, addressState: false })
                }, error => {
                    dispatch(CreateAccountActions.set({
                        ...account,
                        company: {
                            ...account.company,
                            tradingName: '',
                            name: ''
                        },
                        address:{
                            ...account.address,
                            zipCode: '',
                            number: '',
                            complement: ''
                        },
                    }))
                });
            }
    }
    
    const findAddress = () => {
        if (searchPostalCode !== '' && searchPostalCode.length === 8) {
            fetch(`https://viacep.com.br/ws/${searchPostalCode}/json/`)
                .then(res => res.json())
                .then(result => {
                    dispatch(CreateAccountActions.set({
                        ...account,
                        address: {
                            ...account.address,
                            state: result.uf,
                            street: result.logradouro,
                            city: result.localidade,
                            neighborhood: result.bairro
                        }
                    }))
                    setFormError({ ...formError, addressStreet: false, addressZipCode: false, addressState: false })
                }, error => {
                    dispatch(CreateAccountActions.set({
                        ...account,
                        address: {
                            ...account.address,
                            state: '',
                            street: '',
                            city:'',
                            neighborhood:''
                        }
                    }))
                });
        }
    }

    const nextStep = () => {
        if (isFormValid(true)) {
            setStep('end')
        }
    }

    const save = () => {
        //console.log(account)
        if (isFormValid()) {
            dispatch(CreateAccountActions.execute(account));
        }
    }

    const sortByName = (a: string, b: string) => {
        if (a < b) { return -1; }
        if (a > b) { return 1; }
        return 0;
    }

    return (
        <>
            <Container>
                <Image />
                <RegisterForm>
                    <div style={{ width: '500px', display: step === 'begin' ? 'block' : 'none' }}>
                        <div style={{ textAlign: 'center' }}>
                            <Logo src="https://static.shiftpagamentos.com.br/web/logo-shift.png" />
                        </div>
                        <Title>Crie sua conta grátis</Title>
                        <Subtitle>Sem mensalidade. Sem cadastro de cartão de crédito.</Subtitle>
                        <FormTitle
                        >
                            Dados do responsável e acesso
                        </FormTitle>
                        <div style={{ display: 'flex', overflow: 'hidden', height: '10px', justifyContent: 'space-between', marginBottom: '40px' }}>
                            <div style={{ background: '#776CEF', width: '49%', borderRadius: '3px' }}></div>
                            <div style={{ background: '#DFDFDF', width: '49%', borderRadius: '3px' }}></div>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5em' }}>
                        <PatternFormat {...{
                            ...materialUINumberTextFieldProps,
                            label: 'Insira o CNPJ',
                            placeholder: 'CNPJ',
                            error: formError['companyDocument'],
                            // helperText: formError['companyDocument'] ? 'Campo obrigatório!' : null
                        }}
                            onChange={handleFormValidation}
                            format={'##.###.###/####-##'}
                            name='companyDocument'
                            mask=""
                            customInput={UiTextField}
                            value={formattedCompanyDocument}
                            onValueChange={(values) => {
                                const { formattedValue, value, floatValue } = values;
                                dispatch(CreateAccountActions.set({
                                    ...account,
                                    company: {
                                        ...account.company,
                                        document: value
                                    }
                                }))
                                setFormattedCompanyDocument(formattedValue)
                                setSearchCNPJ(value)
                            }}
                        />

                        <FormControl size="small" fullWidth variant="outlined">
                            <InputLabel htmlFor="demo-simple-select" sx={{
                                textAlign: 'left',
                                color: formError['companyType'] ? '#d32f2f' : '',
                                "&.Mui-focused": {
                                    color: "#5143E7"
                                },
                            }}>Tipo</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                error={formError['companyType']}
                                value={isNil(account.company.type) ? '' : account.company.type}
                                onChange={(event) => {
                                    const type = event.target.value;
                                    dispatch(CreateAccountActions.set({
                                        ...account,
                                        company: {
                                            ...account.company,
                                            type
                                        }
                                    }))
                                    handleFormValidation(event)
                                }}
                                sx={PasswordInputStyle}
                                name="companyType"
                                label="Tipo"
                            >
                                <MenuItem value='' disabled>Selecione</MenuItem>
                                {COMPANY_TYPE.sort((b) => sortByName(b.sigla, b.sigla)).map(type => <MenuItem value={type.enum}>{type.sigla}</MenuItem>)}
                            </Select>
                        </FormControl>
                        </div>
                        <UiTextField
                            value={account.company.name}
                            name="companyName"
                            error={formError['companyName']}
                            // helperText={formError['companyName'] ? 'Campo obrigatório!' : null}
                            onChange={(event) => {
                                const name = event.target.value;
                                dispatch(CreateAccountActions.set({
                                    ...account,
                                    company: {
                                        ...account.company,
                                        name
                                    }
                                }))
                                handleFormValidation(event)
                            }}
                            label="Digite o nome/razão social"
                            size="small"
                            variant='outlined'
                            placeholder="Digite o nome/razão social"
                            InputLabelProps={{ shrink: !isNil(account.company.name) }}
                            multiline={false}
                            required
                        />
                        <UiTextField
                            value={account.company.tradingName}
                            name="companyTradingName"
                            error={formError['companyTradingName']}
                            // helperText={formError['companyTradingName'] ? 'Campo obrigatório!' : null}
                            onChange={(event) => {
                                const tradingName = event.target.value;
                                dispatch(CreateAccountActions.set({
                                    ...account,
                                    company: {
                                        ...account.company,
                                        tradingName
                                    }
                                }))
                                handleFormValidation(event)
                            }}
                            label="Nome fantasia"
                            size="small"
                            variant='outlined'
                            placeholder="Digite o nome fantasia"
                            InputLabelProps={{ shrink: !isNil(account.company.tradingName) }}
                            multiline={false}
                            required
                        />



                        <PatternFormat {...{
                            ...materialUINumberTextFieldProps,
                            label: 'CEP',
                            placeholder: 'CEP',
                            error: formError['addressZipCode'],
                            // helperText: formError['companyDocument'] ? 'Campo obrigatório!' : null
                        }}
                            onChange={handleFormValidation}
                            format={'#####-###'}
                            name='addressZipCode'
                            mask=""
                            customInput={UiTextField}
                            value={account.address.zipCode}
                            onValueChange={(values) => {
                                const { formattedValue, value, floatValue } = values;
                                dispatch(CreateAccountActions.set({
                                    ...account,
                                    address: {
                                        ...account.address,
                                        zipCode: value
                                    }
                                }))
                                setFormattedFormattedPostalCode(formattedValue)
                                //setSearchPostalCode(value)
                            }}
                        />

                        <UiTextField
                            value={account.address.street}
                            name="addressStreet"
                            error={formError['addressStreet']}
                            // helperText={formError['personName'] ? 'Campo obrigatório!' : null}
                            onChange={(event) => {
                                const street = event.target.value;
                                dispatch(CreateAccountActions.set({
                                    ...account,
                                    address: {
                                        ...account.address,
                                        street
                                    }
                                }))
                                handleFormValidation(event)
                            }}
                            label="Endereço"
                            size="small"
                            variant='outlined'
                            placeholder="Endereço"
                            multiline={false}
                            required
                            InputLabelProps={{ shrink: !isNil(account.address.street) }}
                        />

                        <div style={{ display: 'flex', gap: '0.5em' }}>
                            <FormControl size="small" sx={{ width: '25ch' }} variant="outlined" required >
                                <InputLabel htmlFor="outlined-adornment-number" sx={{
                                    color: formError['addressState'] ? '#d32f2f' : '',
                                    "&.Mui-focused": {
                                        color: "#5143E7"
                                    },
                                }}>Número</InputLabel>
                                <OutlinedInput
                                    sx={PasswordInputStyle}
                                    value={account.address.number}
                                    name="addressStreetNumber"
                                    error={formError['addressStreetNumber']}
                                    //helperText={formError['userPassword'] ? 'Campo obrigatório!' : null}
                                    onChange={(event) => {
                                        const number = event.target.value;
                                        dispatch(CreateAccountActions.set({
                                            ...account,
                                            address: {
                                                ...account.address,
                                                number
                                            }
                                        }))
                                        handleFormValidation(event)
                                    }}
                                    id="outlined-adornment-number"
                                    placeholder="Número"
                                    label="Número"
                                    required
                                />
                            </FormControl>
                            <FormControl size="small" sx={{ width: '25ch' }} variant="outlined" >
                                <InputLabel htmlFor="outlined-adornment-confirm-password" sx={{
                                    "&.Mui-focused": {
                                        color: "#5143E7"
                                    },
                                }}>Complemento</InputLabel>
                                <OutlinedInput
                                    sx={PasswordInputStyle}
                                    name="complement"
                                    placeholder="Complemento"
                                    value={account.address.complement}
                                    onChange={(event) => {
                                        const complement = event.target.value;
                                        dispatch(CreateAccountActions.set({
                                            ...account,
                                            address: {
                                                ...account.address,
                                                complement
                                            }
                                        }))
                                    }}
                                    label="Complemento"
                                />
                            </FormControl>
                        </div>

                        <UiTextField
                            value={account.address.city}
                            name="addressCity"
                            error={formError['addressCity']}
                            // helperText={formError['personName'] ? 'Campo obrigatório!' : null}
                            onChange={(event) => {
                                const city = event.target.value;
                                dispatch(CreateAccountActions.set({
                                    ...account,
                                    address: {
                                        ...account.address,
                                        city
                                    }
                                }))
                                handleFormValidation(event)
                            }}
                            label="Cidade"
                            size="small"
                            variant='outlined'
                            placeholder="Cidade"
                            multiline={false}
                            required
                            InputLabelProps={{ shrink: !isNil(account.address.street) }}
                        />

                        <UiTextField
                            value={account.address.neighborhood}
                            name="addressNeighborhood"
                            error={formError['addressNeighborhood']}
                            // helperText={formError['personName'] ? 'Campo obrigatório!' : null}
                            onChange={(event) => {
                                const neighborhood = event.target.value;
                                dispatch(CreateAccountActions.set({
                                    ...account,
                                    address: {
                                        ...account.address,
                                        neighborhood
                                    }
                                }))
                                handleFormValidation(event)
                            }}
                            label="Bairro"
                            size="small"
                            variant='outlined'
                            placeholder="Bairro"
                            multiline={false}
                            required
                            InputLabelProps={{ shrink: !isNil(account.address.street) }}
                        />

                        <FormControl size="small" fullWidth variant="outlined">
                            <InputLabel htmlFor="demo-simple-select" sx={{
                                textAlign: 'left',
                                color: formError['addressState'] ? '#d32f2f' : '',
                                "&.Mui-focused": {
                                    color: "#5143E7"
                                },
                            }}>Estado</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                error={formError['addressState']}
                                value={isNil(account.address.state) ? '' : account.address.state}
                                onChange={(event) => {
                                    const state = event.target.value;
                                    dispatch(CreateAccountActions.set({
                                        ...account,
                                        address: {
                                            ...account.address,
                                            state
                                        }
                                    }))
                                    handleFormValidation(event)
                                }}
                                sx={PasswordInputStyle}
                                name="addressState"
                                label="Estado"
                            >
                                <MenuItem value='' disabled>Selecione</MenuItem>
                                {BRAZIL_STATES.sort((a, b) => sortByName(a.nome, b.nome)).map(state => <MenuItem value={state.sigla}>{state.nome}</MenuItem>)}
                            </Select>
                        </FormControl>

                        <div style={{ color: '#707070', fontSize: '16px', lineHeight: '22px', marginBottom: '20px' }}>*Campos obrigatórios</div>

                        <Button onClick={nextStep}
                        // disabled={!accepted || account.loading}
                        >
                            {account.loading ? 'Enviando...' : 'Avançar'}
                        </Button>
                        <Body>Já possui uma conta? <StyledSpan onClick={() => navigate('/')}> Faça login </StyledSpan></Body>
                    </div>
                    <div style={{ width: '500px', display: step === 'end' ? 'block' : 'none' }}>
                        <div style={{ textAlign: 'center' }}>
                            <Logo src="https://static.shiftpagamentos.com.br/web/logo-shift.png" />
                        </div>
                        <Title>Crie sua conta grátis</Title>
                        <Subtitle>Sem mensalidade. Sem cadastro de cartão de crédito.</Subtitle>
                        <FormTitle>
                            Dados do responsável e acesso
                        </FormTitle>
                        <div style={{ display: 'flex', overflow: 'hidden', height: '10px', justifyContent: 'space-between', marginBottom: '40px' }}>
                            <div onClick={() => setStep('begin')} style={{ background: '#776CEF', width: '49%', borderRadius: '3px', cursor: 'pointer' }}></div>
                            <div style={{ background: '#776CEF', width: '49%', borderRadius: '3px' }}></div>
                        </div>

                        <UiTextField
                            value={account.person.name}
                            name="personName"
                            error={formError['personName']}
                            // helperText={formError['personName'] ? 'Campo obrigatório!' : null}
                            onChange={(event) => {
                                const name = event.target.value;
                                dispatch(CreateAccountActions.set({
                                    ...account,
                                    person: {
                                        ...account.person,
                                        name
                                    }
                                }))
                                handleFormValidation(event)
                            }}
                            label="Nome do responsável"
                            size="small"
                            variant='outlined'
                            placeholder="Nome do responsável"
                            multiline={false}
                            required
                        />


                        <PatternFormat {...{
                            ...materialUINumberTextFieldProps,
                            label: 'CPF do responsável',
                            placeholder: 'Digite o CPF do responsável pela empresa',
                            error: formError['personDocument'],
                            // helperText: formError['personDocument'] ? 'Campo obrigatório!' : null
                        }}
                            onChange={handleFormValidation}
                            format={'###.###.###-##'}
                            mask=""
                            customInput={UiTextField}
                            value={formattedDocument}
                            onValueChange={(values) => {
                                const { formattedValue, value, floatValue } = values;
                                dispatch(CreateAccountActions.set({
                                    ...account,
                                    person: {
                                        ...account.person,
                                        cpf: value
                                    }
                                }))
                                setFormattedDocument(formattedValue)
                            }}
                            name='personDocument'
                        />

                        <PatternFormat {...{
                            ...materialUINumberTextFieldProps,
                            label: 'Celular',
                            placeholder: 'Insira um celular com WhatsApp',
                            error: formError['personPhoneNumber'],
                            // helperText: formError['personPhoneNumber'] ? 'Campo obrigatório!' : null
                        }}
                            format="(##) #####-####" mask="_"
                            value={formattedPhoneNumber}
                            customInput={UiTextField}
                            name='personPhoneNumber'
                            onValueChange={(values) => {
                                const { formattedValue, value } = values;
                                // formattedValue = $2,223
                                // value ie, 2223
                                dispatch(CreateAccountActions.set({
                                    ...account,
                                    person: {
                                        ...account.person,
                                        phoneNumber: value
                                    }
                                }))
                                setFormattedPhoneNumber(formattedValue)
                            }}
                            onChange={handleFormValidation}
                        />
                        <UiTextField
                            value={account.person.email}
                            name="personEmail"
                            error={formError['personEmail']}
                            // helperText={formError['personEmail'] ? 'Campo obrigatório!' : null}
                            onChange={(event) => {
                                const email = event.target.value;
                                dispatch(CreateAccountActions.set({
                                    ...account,
                                    person: {
                                        ...account.person,
                                        email
                                    },
                                    user: {
                                        ...account.user,
                                        email,
                                        username: email
                                    }
                                }))
                                handleFormValidation(event)
                            }}
                            label="Informe um e-mail"
                            size="small"
                            variant='outlined'
                            placeholder="Informe um e-mail"
                            multiline={false}
                            required
                        />
                        <div style={{ display: 'flex', gap: '0.5em' }}>
                            <FormControl size="small" sx={{ width: '25ch' }} variant="outlined" required >
                                <InputLabel htmlFor="outlined-adornment-password" sx={{
                                    "&.Mui-focused": {
                                        color: "#5143E7"
                                    },
                                }}>Senha</InputLabel>
                                <OutlinedInput
                                    value={account.user.password}
                                    name="userPassword"
                                    error={formError['userPassword']}
                                    //helperText={formError['userPassword'] ? 'Campo obrigatório!' : null}
                                    onChange={(event) => {
                                        const password = event.target.value;
                                        dispatch(CreateAccountActions.set({
                                            ...account,
                                            user: {
                                                ...account.user,
                                                password
                                            }
                                        }))
                                        handleFormValidation(event)
                                    }}
                                    sx={PasswordInputStyle}
                                    id="outlined-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Digite uma senha"
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Senha"
                                />
                            </FormControl>
                            <FormControl size="small" sx={{ width: '25ch' }} variant="outlined" required >
                                <InputLabel htmlFor="outlined-adornment-confirm-password" sx={{
                                    "&.Mui-focused": {
                                        color: "#5143E7"
                                    },
                                }}>Confirma sua senha</InputLabel>
                                <OutlinedInput
                                    sx={PasswordInputStyle}
                                    id="outlined-adornment-confirm-password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    name="confirmUserPassword"
                                    error={formError['confirmUserPassword'] && confirmUserPassword !== account.user.password}
                                    placeholder="Confirme sua senha"
                                    value={confirmUserPassword}
                                    onChange={(event) => {
                                        const value = event.target.value

                                        setFormError({ ...formError, confirmUserPassword: !value || value !== account.user.password })
                                        // handleFormValidation(event)
                                        setConfirmUserPassword(value)
                                    }}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowConfirmPassword}
                                                onMouseDown={handleMouseDownPassword}
                                                edge="end"
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Confirma sua senha"
                                />
                            </FormControl>
                        </div>
                        {formError['confirmUserPassword'] && confirmUserPassword !== account.user.password && <Alert severity="error">A senha e a confirmação da senha devem ser iguais!</Alert>}

                        <div style={{ color: '#707070', fontSize: '16px', lineHeight: '22px', marginBottom: '20px' }}>*Campos obrigatórios</div>

                        <div>
                            <div style={{ color: '#595959', fontWeight: '700', fontSize: '16px', lineHeight: '22px', marginBottom: '8px' }}>
                                O que sua senha precisa ter?
                            </div>
                            <IconItem style={{ color: !isNil(account.user.password) && account.user.password.length >= 6 ? '#5143E7' : '' }}>
                                <div><CheckCircleOutlineIcon /></div>
                                <div>Pelo menos 6 caracteres</div>
                            </IconItem>

                            <IconItem style={{ color: !isNil(account.user.password) && account.user.password.match(new RegExp("[A-Z]")) ? '#5143E7' : '' }}>
                                <div><CheckCircleOutlineIcon /></div>
                                <div>Letra maiúscula</div>
                            </IconItem>
                            <IconItem style={{ color: !isNil(account.user.password) && account.user.password.match(new RegExp("[a-z]")) ? '#5143E7' : '' }}>
                                <div><CheckCircleOutlineIcon /></div>
                                <div>Letra minúscula</div>
                            </IconItem>
                            <IconItem style={{ color: !isNil(account.user.password) && account.user.password.match(new RegExp("[0-9]")) ? '#5143E7' : '' }}>
                                <div><CheckCircleOutlineIcon /></div>
                                <div>Número</div>
                            </IconItem>
                            <IconItem style={{ color: !isNil(account.user.password) && account.user.password.match(new RegExp("[$&+,:;=?@#|'<>.^*()%!-]")) ? '#5143E7' : '' }}>
                                <div><CheckCircleOutlineIcon /></div>
                                <div>Caracter especial</div>
                            </IconItem>
                        </div>

                        <FormControlLabel sx={{ width: '100%', textAlign: 'left', marginTop: '20px' }} control={<Checkbox
                            checked={accepted}
                            onChange={(e) => setAccepted(e.target.checked)}
                            sx={{
                                color: '#5143E7',
                                '&.Mui-checked': {
                                    color: '#5143E7',
                                },
                            }} />} label={<>Ao se cadastrar, você concorda com os <Link target="_blank" href="https://static.shiftpagamentos.com.br/web/termo-aceite.pdf" style={{ color: '#505050' }}>
                                termos de serviço e política de privacidade
                            </Link></>} />

                        <Button onClick={save} disabled={!accepted || account.loading}>
                            {account.loading ? 'Enviando...' : 'Cadastrar'}
                        </Button>
                        <Body>Já possui uma conta? <StyledSpan onClick={() => navigate('/')}> Faça login </StyledSpan></Body>
                    </div>
                </RegisterForm>
                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}>
                    <Alert onClose={handleClose} severity='success' sx={{ width: '100%' }} >
                        Cadastro realizado com sucesso! Volte para a tela de login para entrar.
                    </Alert>
                </Snackbar>
                <Snackbar open={openError} autoHideDuration={6000} onClose={handleCloseError} anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}>
                    <Alert onClose={handleCloseError} severity='error' sx={{ width: '100%' }} >
                        Ocorreu um erro ao realizar o cadastro! Por favor, verifique os dados e tente novamente!
                    </Alert>
                </Snackbar>
            </Container>
        </>
    )
}