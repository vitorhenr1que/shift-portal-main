import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { CustomerButton, CustomerButtonPurple } from '../../../pages/customer/styles';
import { Actions, ChargeStats, ChargeStatsContainer, Container, CustomerDataContainer, CustomerDataRow, DivInfo, DivTitle, InfoContainer } from './styles';
import { Button, Typography } from '@mui/material';
import Close from '@mui/icons-material/Close';
import CustomerDetailTable from './customerDetailTable';
import { Billing } from '../../../services/genesisApi/domain';
import ChargesTable from '../chargesTable/ChargesTable';



type Anchor = 'right';

interface IChargesTableProps {
  rows: Billing[],
  resend: (id: string) => void
}

interface InfoDataProps{
  label: string;
  value: string;
}
interface ChargeDataProps{
  label: string;
  value: number;
  position: number;
}

function createData(id: string, companyId: number, userId: number, amount: number, netAmount: number, feeAmount: number, customerName: string, title: string, image: string, content: string, description: string, statusCode: number, status: string, dueDate: Date, createdAt: Date) {
  return { id, companyId, userId, amount, netAmount, feeAmount, customerName, title, image, content, description, statusCode, status, dueDate, createdAt};
}

const rows2 = [
  createData('12', 32123123123, 123, 2000, 2000, 2000, 'Vitor Henrique', 'Cobrança a receber', '', 'content', 'description', 0, 'Pago', new Date(), new Date()),
  createData('02', 32123123123, 123, 2000, 2000, 2000, 'Vitor Henrique', 'Cobrança a receber', '', 'content', 'description', 0, 'Pago', new Date(), new Date()),
  createData('02', 32123123123, 123, 2000, 2000, 2000, 'Vitor Henrique', 'Cobrança paga', '', 'content', 'description', 1, 'Pago', new Date(), new Date()),
  createData('12', 32123123123, 123, 2000, 2000, 2000, 'Vitor Henrique', 'Cobrança paga', '', 'content', 'description', 1, 'Pago', new Date(), new Date()),
  createData('12', 32123123123, 123, 2000, 2000, 2000, 'Vitor Henrique', 'Cobrança paga', '', 'content', 'description', 1, 'Pago', new Date(), new Date()),
  createData('12', 32123123123, 123, 2000, 2000, 2000, 'Vitor Henrique', 'Cobrança paga', '', 'content', 'description', 1, 'Pago', new Date(), new Date()),
  createData('12', 32123123123, 123, 2000, 2000, 2000, 'Vitor Henrique', 'Cobrança a receber', '', 'content', 'description', 0, 'Pago', new Date(), new Date()),
  createData('12', 32123123123, 123, 2000, 2000, 2000, 'Vitor Henrique', 'Cobrança paga', '', 'content', 'description', 1, 'Pago', new Date(), new Date()),
  createData('12', 32123123123, 123, 2000, 2000, 2000, 'Vitor Henrique', 'Cobrança a receber', '', 'content', 'description', 0, 'Pago', new Date(), new Date()),
  createData('12', 32123123123, 123, 2000, 2000, 2000, 'Vitor Henrique', 'Cobrança paga', '', 'content', 'description', 1, 'Pago', new Date(), new Date()),
  createData('12', 32123123123, 123, 2000, 2000, 2000, 'Vitor Henrique', 'Cobrança cancelada', '', 'content', 'description', 2, 'Pago', new Date(), new Date()),
  createData('12', 32123123123, 123, 2000, 2000, 2000, 'Vitor Henrique', 'Cobrança cancelada', '', 'content', 'description', 2, 'Pago', new Date(), new Date()),
].sort((a, b) => (a.amount < b.amount ? -1 : 1));



export default function CustomerModal():JSX.Element {
  const [chargeSelected, setChargeSelected] = useState(5)
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
      <div style={{display: 'flex' , flex: 1, position: 'relative'}}>
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
          color={"#393099"}> {position === 1 ? 
                                  rows2.filter((index) => index.statusCode === 0 || 1 || 2 || 3 || 4).length : 
                                  rows2.filter((index) => index.statusCode === position - 1).length}
        </Typography>
        <CustomerButton onClick={() => handleClickDetailButton()}>{chargeSelected === position && toggle === true ?  "Fechar" : "Detalhes"}</CustomerButton>
      </ChargeStats>
      
      </div>
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
      
      onKeyDown={toggleDrawer('right', false)}
    >
      <Container>
        <InfoContainer>
          <DivTitle>
            <Button onClick={toggleDrawer('right', false)} style={{color: '#505050', minWidth: 0}}>
              <Close/>
            </Button>
            
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
        {chargeSelected && toggle ? <CustomerDetailTable rows={rows2.filter((index) => {
          if(chargeSelected === 1){
            return index.statusCode === 0 || 1 || 2
          }
          if(chargeSelected === 2){
            return index.statusCode === 1
          }
          if(chargeSelected === 3){
           return index.statusCode === 0
          }
        })} resend={() => {}}/> : ''}
        
        <Actions>
          <CustomerButtonPurple style={{minWidth: '212px', height: '48px'}}>Alterar dados</CustomerButtonPurple>
          <CustomerButton style={{minWidth: '212px', height: '48px'}}>Excluir Clientes</CustomerButton>
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