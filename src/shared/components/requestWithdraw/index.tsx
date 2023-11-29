import * as React from 'react';
import { FormControlLabel } from "@mui/material";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { UiButton, UiTextField, Link } from './styles';

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

export default function RequestWithdrawModal() {
    const [transaction, setTransaction] = React.useState('');

    const handleChange = (event: SelectChangeEvent) => {
        setTransaction(event.target.value as string);
    }
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    const bodyTed = (
        <List component="div" disablePadding>
            <UiTextField
                label="Agência"
                variant='outlined'
                placeholder="Número da agência"
                multiline={false}
                size="small"
                required
            />
            <UiTextField
                label="Conta"
                variant='outlined'
                placeholder="Número da conta"
                multiline={false}
                size="small"
                required
            />
            <UiTextField
                label="Banco"
                variant='outlined'
                placeholder="Código do banco"
                multiline={false}
                size="small"
                required
            />
            <UiTextField
                label="Valor"
                variant='outlined'
                placeholder="Insira aqui o valor da transferência"
                multiline={false}
                size="small"
                required
            />
        </List>
    );

    const bodyPix = (
        <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Tipo da chave</FormLabel>
            <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue="female"
                name="radio-buttons-group"
            >
                <FormControlLabel value="email" control={<Radio size="small" />} label="E-mail" />
                <FormControlLabel value="phoneNumber" control={<Radio size="small" />} label="Telefone" />
                <FormControlLabel value="document" control={<Radio size="small" />} label="CPF" />
                <FormControlLabel value="random" control={<Radio size="small" />} label="Aleatória" />
            </RadioGroup>
            <UiTextField
                label="Chave"
                variant='outlined'
                placeholder="Insira aqui a chave"
                multiline={false}
                size="small"
                required
            />
            <UiTextField
                label="Valor"
                variant='outlined'
                placeholder="Insira aqui o valor da transferência"
                multiline={false}
                size="small"
                required
            />
        </FormControl>
    );

    return (
        <div>
            <FormControlLabel
                onClick={handleClickOpen}
                control={<h2 />}
                label={<span style={{ fontWeight: 'bold' }}>Solicitar saque</span>}
                style={{ color: 'white', paddingLeft: 12 }}
            />
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Solicitar saque
                </BootstrapDialogTitle>
                <DialogContent dividers>
                    <Box sx={{ minWidth: 120 }}>
                    <p>Solicitar saque é fácil, rápido, seguro e transparente com a Shift. Faça sua solicitação agora e receba seu dinheiro em até 24 horas. Clique aqui em “Solicitar Saque Agora"</p>
                        <FormControl fullWidth>
                            <InputLabel id="demo-simple-select-label">Tipo de transferência</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={transaction}
                                label="Tipo de transferência"
                                onChange={handleChange}
                            >
                                <MenuItem value={1}>Pix</MenuItem>
                                <MenuItem value={2}>TED</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    { transaction == "1" ? bodyPix : bodyTed }
                </DialogContent>
                <DialogActions>
                    <UiButton autoFocus onClick={handleClose}>
                        Solicitar saque agora
                    </UiButton>
                </DialogActions>
            </BootstrapDialog>
        </div>
    );
}