import * as React from 'react';
import { Typography, useMediaQuery, useTheme } from "@mui/material"
import ChargeForm from "../../shared/components/chargeForm/ChargeForm";
import { ListingTools, MenuLeft, ContentContainer } from "../../shared/components";
import { LayoutBasePages } from "../../shared/layouts/LayoutBasePages";
import { Link } from './styles'

export default function MakeCharge() {
    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <MenuLeft>
            <LayoutBasePages
                children={undefined}
                barraDeFerrementas={(
                    <ListingTools titlePage="Cobrar" />

                )} />
            <ContentContainer>
                <div style={{ flexGrow: 1, height: '100vh' }}>
                    <Typography
                        variant={smDown ? 'h5' : mdDown ? 'h6' : 'h6'}
                        whiteSpace={"normal"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        style={{ marginBottom: '16px' }}
                    >
                        Criar Cobrança
                    </Typography>
                    <Typography
                        variant={'subtitle1'}
                        whiteSpace={"normal"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        color={'#505050'}
                        style={{ marginBottom: '16px' }}
                    >
                        Crie e envie uma cobrança de Pix via WhatsApp em poucos passos.
                    </Typography>
                    <Typography
                        variant={'subtitle1'}
                        whiteSpace={"normal"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        color={'#505050'}
                    >
                        {/* Se preferir, <Link href="www.google.com">
                            clique aqui para ver um passo a passo</Link>. */}
                    </Typography>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}>
                        <img src="https://static.shiftpagamentos.com.br/web/transfer-money.png" width={400} alt="" />
                    </div>
                </div>
                <div>
                    <ChargeForm />
                </div>
            </ContentContainer>
        </MenuLeft>

    )
}