import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserActions } from '../../store/reducers/userReducer'
import { FormControlLabel, Snackbar, Alert } from "@mui/material";
import { Image, Container, Logo, Button, FieldsInRow, UiTextField, Link, Body, LoginForm, StyledSpan } from './styles';
import { IUserReducer } from '../../store/reducers/interfaces';

const initialFormError = {
    email: false,
    password: false,
}

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state: any): IUserReducer => state.UserReducer);
    const [formError, setFormError] = React.useState(initialFormError);
    const [openError, setOpenError] = React.useState(false);

    const login = () => {
        if (isFormValid()) {
            dispatch(UserActions.authenticate(user))
        }
    };

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setFormError({ ...formError, [name]: !value })
        dispatch(UserActions.setUser({ ...user, [name]: value }));
    }

    const isFormValid = () => {
        setFormError({ ...formError, email: !user.email, password: !user.password })

        return (!user.email) === false || (!user.password) === false
    }

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenError(false);
    };

    React.useEffect(() => {
        if (user.error && !openError) {
            //console.log('teste')
            setOpenError(true)
        }

        if (user.isSuccessful) {
            navigate('/cobrar')
        }
    }, [user]);

    return (
        <>

            <Container>
                <img src="https://static.shiftpagamentos.com.br/web/group1.png" crossOrigin='' style={{ objectFit: 'cover' }} width={'50%'} />
                <LoginForm>
                    <div style={{ textAlign: 'center', width: '500px' }}>
                        <Logo src="https://static.shiftpagamentos.com.br/web/logo-shift.png" />
                        <FieldsInRow>
                            <Body>Ainda não tem conta? <StyledSpan onClick={() => navigate('cadastro')}>Faça agora em 3 minutos</StyledSpan></Body>
                        </FieldsInRow>
                        <UiTextField
                            error={formError['email']}
                            helperText={formError['email'] ? 'Campo obrigatório!' : null}
                            label="Email"
                            variant='outlined'
                            placeholder="Insira o seu e-mail"
                            multiline={false}
                            required
                            value={user.email}
                            name='email'
                            size='small'
                            onChange={handleInputChange}
                        />
                        <UiTextField
                            error={formError['password']}
                            helperText={formError['password'] ? 'Campo obrigatório!' : null}
                            label="Senha"
                            variant='outlined'
                            placeholder="Digite sua senha"
                            multiline={false}
                            required
                            value={user.password}
                            name='password'
                            type='password'
                            size='small'
                            onChange={handleInputChange}
                        />
                        <Button onClick={login} disabled={user.loading}>
                            {user.loading ? 'Carregando' : 'Entrar'}
                        </Button>
                    </div>
                </LoginForm>
                {/* <Link href="/redefinir-senha">
                    <FormControlLabel
                        control={
                            <h1 />
                        }
                        style={{ color: '#5143E7', paddingLeft: 20 }}
                        label="Esqueci a senha"
                    />
                </Link> */}
                <Snackbar open={openError} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                }}>
                    <Alert onClose={handleClose} severity='error' sx={{ width: '100%' }} >
                        Ocorreu um erro ao realizar login! Verifique seu email e senha!
                    </Alert>
                </Snackbar>
            </Container>
        </>
    )
}