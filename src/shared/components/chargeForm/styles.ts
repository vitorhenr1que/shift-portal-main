import styled from 'styled-components';
import { TextField } from "@mui/material";

export const UiButton = styled.button`
  background-color: #5143E7;
  color: white;
  font-size: 16px;
  padding: 14px 15px;
  border-radius: 5px;
  border: 0px;
  margin: 10px 0px;
  cursor: pointer;
  width: 100%;
  outline: none;
  font-family: 'Montserrat';
  &:hover {
    background-color: #4337CA;
  };
  &:active {
    background-color: #393099;
  };
  &:disabled {
    background-color: #DFDFDF;
    color: #505050;
    cursor: not-allowed;
  };
`;

export const UiOutlinedButton = styled.button`
  color: white;
  font-size: 16px;
  padding: 14px 15px;
  border-radius: 5px;
  border: 0px;
  margin: 10px 0px;
  cursor: pointer;
  width: 100%;
  outline: none;
`;

export const UiTextField = styled(TextField)({
  width: '100%',
  borderRadius: '7px',
  marginBottom: '14px !important',
  '& label.Mui-focused': {
    color: '#5143E7',
  },
  '& .MuiInput-underline:after': {
    // borderBottomColor: 'green',
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