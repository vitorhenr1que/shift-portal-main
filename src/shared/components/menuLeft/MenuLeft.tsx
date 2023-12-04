import { Box, Drawer, useTheme, List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery, Icon } from "@mui/material"
import { CurrencyExchangeOutlined, Groups2Outlined, InsertChartOutlined, PaidOutlined, ReceiptLongOutlined, RequestQuoteOutlined } from "@mui/icons-material";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import logoshift from "../../../assets/images/logo-shift.png";
import { useDrawerContext } from "../../contexts";
import { useNavigate, useLocation } from "react-router-dom";
import { Logo } from "./styles";
import { spawn } from "child_process";

const theme = createTheme({
  palette: {
    primary: {
      main: '#393099',
    },
  },
  typography: {
    fontFamily: [
      'Montserrat',
    ].join(','),
    h1: {
      color: '#505050'
    },
    h2: {
      color: '#505050'
    },
    h3: {
      color: '#505050'
    },
    h4: {
      color: '#505050'
    },
    h5: {
      color: '#505050',
      fontWeight: '700'
    },
    h6: {
      color: '#505050',
      fontWeight: '700'
    },
  },
});

interface IlistItemLinkProps {
  to: string;
  icon: React.ReactNode;
  label: React.ReactNode;
  onClick?: (() => void) | undefined;
  disabled: boolean;
}

const ListItemLink: React.FC<IlistItemLinkProps> = ({ to, icon, label, onClick, disabled }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = () => {
    navigate(to);
    onClick?.();
  };

  return (
    <ListItemButton onClick={handleClick} disabled={disabled} selected={location.pathname === to}>
      <ListItemIcon>
        {icon}
      </ListItemIcon>
      <ListItemText
        primary={label}
        color="primary"
      />
    </ListItemButton>
  )

}

interface IMenuLeftProviderProps {
  children: React.ReactNode
}
export const MenuLeft: React.FC<IMenuLeftProviderProps> = ({ children }) => {
  //const theme = useTheme();
  const location = useLocation();
  const smDown = useMediaQuery(theme.breakpoints.down('sm'));

  const { isDrawerOpen, toggleDrawerOpen } = useDrawerContext();

  return (
    <ThemeProvider theme={theme}>
      <Drawer open={isDrawerOpen} variant={smDown ? 'temporary' : 'permanent'} onClose={toggleDrawerOpen}>
        <Box
          width={theme.spacing(29.5)}
          height="100%"
          display="flex"
          flexDirection='column'>
          <Box width="100%" height={theme.spacing(10)} display="flex" alignItems="center" justifyContent="center" >
            <Logo src="https://static.shiftpagamentos.com.br/web/logo-shift.png" />
          </Box>
          <Box flex={1}>
            <List component="nav" sx={{ fontFamily: 'Montserrat' }}>
              <ListItemLink
                to={""}
                icon={<InsertChartOutlined color="inherit" sx={{ width: 30, height: 30 }} />}
                label="Dashboard (em breve)"
                onClick={smDown ? toggleDrawerOpen : undefined}
                disabled={true}
              />
              <ListItemLink
                to="/cobrancas"
                icon={<ReceiptLongOutlined color="primary" sx={{ width: 30, height: 30 }} />}
                label={<span style={{ fontWeight: location.pathname === '/cobrancas' ? 'bold' : 'normal', color: '#505050' }}>Minhas Cobranças</span>}
                onClick={smDown ? toggleDrawerOpen : undefined}
                disabled={false}
              />
              <ListItemLink
                to={"/cobrar"}
                icon={<PaidOutlined color="primary" sx={{ width: 30, height: 30 }} />}
                label={<span style={{ fontWeight: location.pathname === '/cobrar' ? 'bold' : 'normal', color: '#505050' }}>Cobrar</span>}
                onClick={smDown ? toggleDrawerOpen : undefined}
                disabled={false}
              />
              <ListItemLink
                to={"/sacar"}
                icon={<CurrencyExchangeOutlined color="primary" sx={{ width: 30, height: 30 }} />}
                label={<span style={{ fontWeight: location.pathname === '/sacar' ? 'bold' : 'normal', color: '#505050' }}>Sacar</span>}
                onClick={smDown ? toggleDrawerOpen : undefined}
                disabled={false}
              />
              <ListItemLink
                to={""}
                icon={<RequestQuoteOutlined color="primary" sx={{ width: 30, height: 30 }} />}
                label="Pagar (Em breve)"
                onClick={smDown ? toggleDrawerOpen : undefined}
                disabled={true}
              />
              <ListItemLink
                to={"/clientes"}
                icon={<Groups2Outlined color="primary" sx={{ width: 30, height: 30 }} />}
                label="Clientes"
                onClick={smDown ? toggleDrawerOpen : undefined}
                disabled={false}
              />
            </List>
          </Box>
        </Box>
      </Drawer>
      <Box height='100vh' marginLeft={smDown ? 0 : theme.spacing(28)}>
        {children}
      </Box>
    </ThemeProvider>
  );
};