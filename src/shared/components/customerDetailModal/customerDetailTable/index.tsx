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
import { HeaderTitle, ChargeButton } from './styles'
import { Billing } from '../../../../services/genesisApi/domain';
import { applyCurrency } from '../../../utils';
import ConfirmationModal from '../../confirmationModal';
import { useDispatch, useSelector } from 'react-redux';
import { IUserReducer } from '../../../../store/reducers/interfaces';

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

function createData(name: string, date: string, customerName: string, value: number, type: string, status: string, action: string) {
  return { name, date, customerName, value, type, status, action };
}

const openInNewTab = (url: string) => {
  window.open(url, "_blank", "noreferrer");
};

const rows2 = [
  createData('Cobrança do cara', '22/12/2022', 'Marcos Aurélio', 2000, 'Pix', 'Pendente', ''),
  createData('Cobrança do cara1', '22/12/2022', 'Marcos Aurélio', 2000, 'Pix', 'Pendente', ''),
  createData('Cobrança do cara2', '22/12/2022', 'Marcos Aurélio', 2000, 'Pix', 'A Receber', ''),
  createData('Cobrança do cara3', '22/12/2022', 'Marcos Aurélio', 2000, 'Pix', 'A Receber', ''),
  createData('Cobrança do cara4', '22/12/2022', 'Marcos Aurélio', 2000, 'Pix', 'Pago', ''),
  createData('Cobrança do cara5', '22/12/2022', 'Marcos Aurélio', 2000, 'Pix', 'Pago', ''),
  createData('Cobrança do cara6', '22/12/2022', 'Marcos Aurélio', 2000, 'Pix', 'Pago', ''),
  createData('Cobrança do cara7', '22/12/2022', 'Marcos Aurélio', 2000, 'Pix', 'Pago', ''),
  createData('Cobrança do cara8', '22/12/2022', 'Marcos Aurélio', 2000, 'Pix', 'Pago', ''),
  createData('Cobrança do cara9', '22/12/2022', 'Marcos Aurélio', 2000, 'Pix', 'Pago', ''),
  createData('Cobrança do cara10', '22/12/2022', 'Marcos Aurélio', 2000, 'Pix', 'Pago', ''),
  createData('Cobrança do cara11', '22/12/2022', 'Marcos Aurélio', 2000, 'Pix', 'Pago', ''),
  createData('Cobrança do cara12', '22/12/2022', 'Marcos Aurélio', 2000, 'Pix', 'Pago', ''),
].sort((a, b) => (a.value < b.value ? -1 : 1));

interface ICustomerDetailTableProps {
  rows: Billing[],
  resend: (id: string) => void
}

const CustomerDetailTable: React.FC<ICustomerDetailTableProps> = ({ rows = [], resend }) => {
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
      {rows.length > 0 ? <TableContainer component={Paper} >
        <Table sx={{ minWidth: 500 }} aria-label="custom pagination table">
          <TableHead style={{ borderBottom: '2px solid #747272' }}>
            <TableRow>
              <TableCell ><HeaderTitle>Título</HeaderTitle></TableCell>
              <TableCell><HeaderTitle>Data</HeaderTitle></TableCell>
              <TableCell><HeaderTitle>Cliente</HeaderTitle></TableCell>
              <TableCell><HeaderTitle>Valor Bruto</HeaderTitle></TableCell>
              <TableCell><HeaderTitle>Valor Líquido</HeaderTitle></TableCell>
              <TableCell><HeaderTitle>Tipo</HeaderTitle></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row" style={{ fontWeight: '400', color: '#747272' }}>
                  {row.title}
                </TableCell>
                <TableCell style={{ width: 160, fontWeight: '400', color: '#747272' }}>
                  {dayjs(row.createdAt).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell style={{ width: 160, fontWeight: '400', color: '#747272' }}>
                  {row.customerName}
                </TableCell>
                <TableCell style={{ width: 160, fontWeight: '400', color: '#747272' }}>
                  {applyCurrency(row.amount / 100)}
                </TableCell>
                <TableCell style={{ width: 160, fontWeight: '400', color: '#747272' }}>
                  {applyCurrency(row.netAmount / 100)}
                </TableCell>
                <TableCell style={{ width: 160, fontWeight: '400', color: '#747272' }}>
                  Pix
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

export default CustomerDetailTable