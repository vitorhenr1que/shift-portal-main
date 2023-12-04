import * as React from 'react';
import { useTheme, ThemeProvider } from '@mui/material/styles';
import { ptBR } from '@mui/material/locale';
import dayjs, { Dayjs } from 'dayjs';
import {
  Box, Table, TableHead, TableBody, TableCell, TableContainer,
  TableFooter, TablePagination, TableRow, Paper, IconButton, Grid, Typography,
  Popover, Snackbar, Alert
} from '@mui/material';
import FirstPageIcon from '@mui/icons-material/FirstPage';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import LastPageIcon from '@mui/icons-material/LastPage';
import SendIcon from '@mui/icons-material/Send';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { HeaderTitle, themeMuiPagination } from './styles'
import { Customer } from '../../../services/genesisApi/domain';
import { applyCurrency } from '../../utils'
import ConfirmationModal from '../confirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import { IUserReducer } from '../../../store/reducers/interfaces';
import { CustomerButton } from '../../../pages/customer/styles';
import CustomizedDialogs from '../chargeModal/CustomizedDialogs';
import CustomerModal from '../customerDetailModal';

interface TablePaginationActionsProps {
  count: number
  page: number,
  rowsPerPage: number,
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onPageChange(event, 0);
  };

  const handleBackButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, page + 1);
  };

  const handleLastPageButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <Box sx={{ flexShrink: 0, ml: 2.5 }}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="Primeira página"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton
        onClick={handleBackButtonClick}
        disabled={page === 0}
        aria-label="Pagina anterior"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Próxima página"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="Última página"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </Box>
  );
}

function createData(name: string, date: string, totalCharge: number, payments: number, pending: number, status: string, action: string) {
  return { name, date, totalCharge, payments, pending, status, action };
}

const openInNewTab = (url: string) => {
  window.open(url, "_blank", "noreferrer");
};

const rows2 = [
  createData('Vitor Henrique', '22/12/2022', 3, 4, 2, 'Pendente', ''),
  createData('Pedro Pessoa', '22/12/2022', 3, 4, 2, 'Pendente', ''),
  createData('Teste Pessoa', '22/12/2022', 3, 4, 2, 'A Receber', ''),
  createData('Nome da pessoa3', '22/12/2022', 3, 4, 2, 'A Receber', ''),
  createData('Nome da pessoa4', '22/12/2022', 3, 4, 2, 'Pago', ''),
  createData('Nome da pessoa5', '22/12/2022', 3, 4, 2, 'Pago', ''),
  createData('Nome da pessoa6', '22/12/2022', 3, 4, 2, 'Pago', ''),
  createData('Nome da pessoa7', '22/12/2022', 3, 4, 2, 'Pago', ''),
  createData('Nome da pessoa8', '22/12/2022', 3, 4, 2, 'Pago', ''),
  createData('Nome da pessoa9', '22/12/2022', 3, 4, 2, 'Pago', ''),
  createData('Nome da pessoa10', '22/12/2022', 3, 4, 2, 'Pago', ''),
  createData('Nome da pessoa11', '22/12/2022', 3, 4, 2, 'Pago', ''),
  createData('Nome da pessoa12', '22/12/2022', 3, 4, 2, 'Pago', ''),
].sort((a, b) => (a.totalCharge < b.totalCharge ? -1 : 1));

interface ICustomerTableProps {
  rows: Customer[],
  resend: (id: string) => void
}

const CustomerTable: React.FC<ICustomerTableProps> = ({ rows = [], resend }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [open, setOpen] = React.useState(false);
  const user = useSelector((state: any): IUserReducer => state.UserReducer);

  const handleClickClipboard = (event: React.MouseEvent<HTMLButtonElement>, text: string) => {
    navigator.clipboard.writeText(text);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 1500);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getStatusColor = (statusCode: number) => {
    switch (statusCode) {
      case 0:
        return '#747272';
      // case 'Pendente':
      //   return '#DEA400';
      case 1:
        return '#2D912C';
      case 4:
        return '#CC0000';
      default:
        return '#DEA400';
    }
  }

  const getStatusDescription = (statusCode: number) => {
    switch (statusCode) {
      case 0:
        return 'A receber';
      case 1:
        return 'Pago';
      case 2:
        return 'Cancelado';
      case 3:
        return 'Processando';
      case 4:
        return 'Atrasado';
      default:
        return '-';
    }
  }

  return (
    <>
      {rows.length > 0 ? <TableContainer component={Paper}>
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead style={{ borderBottom: '2px solid #747272' }}>
            <TableRow>
              <TableCell><HeaderTitle>Nome do cliente</HeaderTitle></TableCell>
              <TableCell style={{textAlign: 'center'}}><HeaderTitle>Cadastro</HeaderTitle></TableCell>
              <TableCell style={{textAlign: 'center'}}><HeaderTitle>Total de cobranças</HeaderTitle></TableCell>
              <TableCell style={{textAlign: 'center'}}><HeaderTitle>Pagos</HeaderTitle></TableCell>
              <TableCell style={{textAlign: 'center'}}><HeaderTitle>Pendentes</HeaderTitle></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row" style={{ fontWeight: '400', color: '#747272' }}>
                  {row.name}
                </TableCell>
                <TableCell style={{ width: 160, fontWeight: '400', color: '#747272', textAlign: 'center' }}>
                  {dayjs(row.createdAt).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell style={{ width: 160, fontWeight: '400', color: '#747272', textAlign: 'center'  }}>
                  {row.charges}
                </TableCell>
                <TableCell style={{ width: 160, fontWeight: '400', color: '#747272', textAlign: 'center'  }}>
                  {row.paidCharges}
                </TableCell>
                <TableCell style={{ width: 160, fontWeight: '400', color: '#747272', textAlign: 'center'  }}>
                  {row.pendingCharges}
                </TableCell>
                <TableCell style={{ width: 160, fontWeight: '400', color: '#747272' }}>
                  { <CustomerModal/>}
                  {/* <ConfirmationModal title='Deseja cancelar a cobrança?' subtitle='O cliente não conseguirá mais efetuar o pagamento com o código enviado para ele.' actionBtnTitle='Cancelar cobrança' onConfirm={() => null} icon={<HighlightOffOutlinedIcon />}></ConfirmationModal> */}
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <ThemeProvider theme={ptBR}>
                <TablePagination

                  rowsPerPageOptions={[10, 25, { label: 'Tudo', value: -1 }]}
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  SelectProps={{
                    inputProps: {
                      'aria-label': 'Linhas por página',
                    },
                    native: true,
                  }}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  ActionsComponent={TablePaginationActions}
                />
              </ThemeProvider>
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
        :
        <div style={{ background: '#fff', padding: '40px', borderRadius: '8px' }}>
          <Grid container justifyContent="center" direction="column" alignItems="center">
            <img src='https://static.shiftpagamentos.com.br/web/results-blank.png' width={250} alt="" />
            <Typography
              variant={'h5'}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              textAlign={'center'}
              mt={5}
            >
              Não encontramos resultados<br /> para a sua busca
            </Typography>
            <Typography
              mt={2}
              variant={'subtitle1'}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              textAlign={'center'}
              color={'#505050'}
            >
              Faça uma nova busca, ou tente novamente mais tarde.
            </Typography>
          </Grid>
        </div>
      }
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{
        vertical: 'top',
        horizontal: 'right'
      }}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }} >
          Código de cobrança copiado!
        </Alert>
      </Snackbar>
    </>
  );
}

export default CustomerTable