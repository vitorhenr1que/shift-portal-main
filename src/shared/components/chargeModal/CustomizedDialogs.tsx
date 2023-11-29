import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { UiButton, UiTextField } from './styles';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function CustomizedDialogs(): JSX.Element {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [expand, setExpand] = React.useState(true);

  const handleClick = () => {
    setExpand(!expand);
  };

  return (
    <div>
      <UiButton onClick={handleClickOpen}>
        Criar uma nova cobrança
      </UiButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          Criar cobrança
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <List
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
            component="nav"
          >
            <ListItemButton onClick={handleClick}>
              <ListItemText primary="Informações Gerais" />
              {expand ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={expand} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <UiTextField
                  label="Nome do cliente"
                  variant='outlined'
                  placeholder="Nome do cliente"
                  multiline={false}
                  size="small"
                  required
                />
                <UiTextField
                  label="CPF ou CNPJ do cliente"
                  variant='outlined'
                  placeholder="CPF ou CNPJ do cliente"
                  multiline={false}
                  size="small"
                  required
                />
                <UiTextField
                  label="Título da cobrança"
                  variant='outlined'
                  placeholder="Título da cobrança"
                  multiline={false}
                  size="small"
                  required
                />
                <UiTextField
                  label="Valor da cobrança"
                  variant='outlined'
                  placeholder="Valor da cobrança"
                  multiline={false}
                  size="small"
                  required
                />
                <UiTextField
                  label="Data de vencimento"
                  variant='outlined'
                  placeholder="dd/mm/yyyy"
                  multiline={false}
                  size="small"
                  required
                />
                <UiTextField
                  label="Número do WhatsApp"
                  variant='outlined'
                  placeholder="Número do WhatsApp"
                  multiline={false}
                  size="small"
                  required
                />
                <UiTextField
                  label="Descrição"
                  variant='outlined'
                  placeholder="Descrição da cobrança" 
                  multiline={true}
                  size="small"
                  required
                />
              </List>
            </Collapse>
          </List>
        </DialogContent>
        <DialogActions>
          <UiButton autoFocus onClick={handleClose}>
            Enviar cobrança
          </UiButton>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}