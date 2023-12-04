import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { CustomerButton } from '../../../pages/customer/styles';
import { Actions, Container, CustomerDataContainer, CustomerDataRow, DivInfo, DivTitle, InfoContainer } from './styles';
import { Typography } from '@mui/material';
import Close from '@mui/icons-material/Close';

type Anchor = 'right';

interface InfoDataProps{
  label: string;
  value: string;
}
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

export default function CustomerModal(): JSX.Element {
  const [state, setState] = React.useState({right: false});

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