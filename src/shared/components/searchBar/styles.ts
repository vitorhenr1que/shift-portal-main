import styled from 'styled-components'
import { TextField } from '@mui/material';

export const UiTextField = styled(TextField)({
  background: '#fff',
  borderRadius: '7px',
  '& label.Mui-focused': {
    color: '#5143E7',
  },
  '& .MuiInput-underline:after': {
    // borderBottomColor: 'green',
  },
  '& .MuiOutlinedInput-root': {
    paddingLeft: '0px',
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
