import styled from 'styled-components';
import { TextField } from "@mui/material";

export const UiTextField = styled(TextField)({
    //width: '100%',
    borderRadius: '7px',
    background: '#fff',
    marginRight: '5px !important',
    '& label.Mui-focused': {
        color: '#5143E7',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'green',
    },
    '& .MuiOutlinedInput-root': {
        '& fieldset': {
            borderRadius: '7px'
        },
        '&:hover fieldset': {
            borderColor: '#5143E7',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#5143E7',
        },
    },
});