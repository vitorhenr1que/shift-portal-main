import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { Dialog, DialogContent, IconButton, Typography, Link } from '@mui/material';
import { UiButton, UiLink } from './styles';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

export interface ConfirmationModalProps {
  title: string;
  subtitle: string;
  actionBtnTitle: string;
  icon?: React.ReactNode;
  onConfirm: () => void;
}


export default function ConfirmationModal(props: ConfirmationModalProps): JSX.Element {
  const { title, subtitle, actionBtnTitle, icon, onConfirm } = props
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

  const handleClickConfirm = () => {
    onConfirm()
    setOpen(false)
  }

  return (
    <>
      <IconButton onClick={handleClickOpen}>
        {icon}
      </IconButton>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent dividers>
          <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', padding: '10px', maxWidth: '400px', minWidth: '400px' }}>
            <img src="https://static.shiftpagamentos.com.br/web/request-empty.png" width={150} alt="" />
            <Typography
              variant={'h6'}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              textAlign={'center'}
              mt={3}
            >
              {title}
            </Typography>
            <Typography
              mt={2}
              variant={'subtitle1'}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              textAlign={'center'}
              color={'#505050'}
            >
              {subtitle}
            </Typography>
            <UiButton onClick={handleClickConfirm}>{actionBtnTitle}</UiButton>
            <UiLink
              onClick={handleClose}
            >
              Cancelar
            </UiLink>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}