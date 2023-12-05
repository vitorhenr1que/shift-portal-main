import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { CustomerButton } from '../../../pages/customer/styles';
import { Actions, ChargeStats, ChargeStatsContainer, Container, CustomerDataContainer, CustomerDataRow, DivInfo, DivTitle, InfoContainer } from './styles';
import { Typography } from '@mui/material';
import Close from '@mui/icons-material/Close';



type Anchor = 'right';

interface InfoDataProps{
  label: string;
  value: string;
}
interface ChargeDataProps{
  label: string;
  value: number;
  position: number;
}


export default function CustomerModal():JSX.Element {
  const [chargeSelected, setChargeSelected] = useState(0)
  const [toggle, setToggle] = useState(false)
  const [state, setState] = useState({right: false});

  function CustomerData({label, value}: InfoDataProps){
    return (
    <DivInfo>
    <Typography
    variant={'caption'}
    overflow={"hidden"}
    fontSize={14}
    textOverflow={"ellipsis"}>{label}</Typography>
    <Typography
    variant={'h6'}
    fontWeight={'bold'}
    fontSize={16}
    overflow={"hidden"}
    textOverflow={"ellipsis"}>{value}</Typography>
    </DivInfo>
    )
  }
  
  function ChargeStatsData({label, value, position}: ChargeDataProps){

    function handleClickDetailButton(){
      setChargeSelected(position)
      setToggle(!toggle)
    }

    return (
      <ChargeStats isClicked={`${chargeSelected === position ? "#F0EFFF" : "#fff"}`}>
        <Typography
          variant={'caption'}
          fontSize={16}
          fontWeight={"bold"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          color={chargeSelected === position ? '#393099' : '#505050'}>{label}
        </Typography>
        <Typography
          variant={'h5'}
          fontSize={32}
          fontWeight={"bold"}
          overflow={"hidden"}
          textOverflow={"ellipsis"}
          color={"#393099"}>{value}
        </Typography>
        <CustomerButton onClick={() => handleClickDetailButton()}>{chargeSelected === position && toggle === true ?  "Fechar" : "Detalhes"}</CustomerButton>
      </ChargeStats>
    )
  }

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = () => (
    <Box
      sx={{ width: "66vw" }}
      role="presentation"
      onClick={toggleDrawer('right', true)}
      onKeyDown={toggleDrawer('right', false)}
    >
      <Container>
        <InfoContainer>
          <DivTitle>
            <Close/>
            <Typography
                variant={'h5'}
                overflow={"hidden"}
                textOverflow={"ellipsis"}>Dados do cliente</Typography>
          </DivTitle>
          <CustomerDataContainer>
            <CustomerData label='Nome ou razão social' value='Vitor Henrique'/>
            <CustomerData label='CPF ou CNPJ' value='000.000.000-00'/>
            <CustomerData label='E-mail' value='email@email.com'/>
            <CustomerData label='Número com WhatsApp' value='(00) 00000 - 0000'/>
            <CustomerData label='Data de cadastro' value='00/00/0000'/>
          </CustomerDataContainer>
          <CustomerDataContainer>
            <CustomerDataRow>
              <CustomerData label='Endereço' value='Rua Tal'/>
              <CustomerData label='Número' value='00'/>
            </CustomerDataRow>
            <CustomerDataRow>
              <CustomerData label='Bairro' value='Nome do bairro'/>
              <CustomerData label='Cidade' value='Nome da cidade'/>
            </CustomerDataRow>
            <CustomerDataRow>
              <CustomerData label='Estado' value='Nome do estado'/>
              <CustomerData label='CEP' value='00000-000'/>
            </CustomerDataRow>
          </CustomerDataContainer>
          <ChargeStatsContainer>
            <ChargeStatsData label='Cobranças criadas' value={6} position={1}/>
            <ChargeStatsData label='Cobranças pagas' value={6} position={2}/>
            <ChargeStatsData label='Cobranças pendentes' value={0} position={3}/>
          </ChargeStatsContainer>
        </InfoContainer>
        <Actions>

        </Actions>
      </Container>
    </Box>
  );



  return (
    <div>
          <CustomerButton onClick={toggleDrawer('right', true)}>Detalhes</CustomerButton>
          <Drawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
          >
            {list()}
          </Drawer>
    </div>
  );

}