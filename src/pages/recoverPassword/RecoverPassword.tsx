import React from "react";
import { FormControlLabel } from "@mui/material";
import { Image, Container, Logo, Button, Link, UiTextField, Title, Body} from './styles';

export default function RecoverPassword(){
    return(
        <>
            <Image src="https://static.shiftpagamentos.com.br/web/group3.png"/>
            <Container>
                <Logo src="https://static.shiftpagamentos.com.br/web/logo-shift.png"/>
                <Title>Recuperação de senha</Title>
                <Body>Insira o seu email cadastrado abaixo, se ele for encontrado em nosso sistema, iremos enviar um link para a alteração de senha.</Body>
                <UiTextField
                    label="Email"
                    variant='outlined'
                    placeholder="Digite o e-mail cadastrado"
                    multiline={false}
                    required
                />
                <Button>
                    Enviar link
                </Button>
                <Link href="/">
                    <FormControlLabel
                        control={
                            <h1 />
                        }
                        style={{ color: '#5143E7', paddingLeft: 20 }}
                        label="Voltar para o login"
                    />
                </Link>
            </Container>
        </>
    )
}