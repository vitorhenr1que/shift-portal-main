import styled from 'styled-components';
import { TextField, FormControlLabel } from "@mui/material";

export const Image = styled.div`
    background-image: url("https://static.shiftpagamentos.com.br/web/group2.png"); /* change back to whatever background image you want */
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    flex: 0 0 45%;
`;

export const Logo = styled.img`
    width: 130px;
    margin-bottom: 10px;
`;

export const Title = styled.h1`
    font-size: 24px;
    text-align: center;
    color: #505050;
`;

export const Subtitle = styled.h2`
    font-size: 16px;
    text-align: center;
    margin-bottom: 35px;
    color: #505050;
    font-weight: 500;
`;

export const FormTitle = styled.h2`
    font-size: 18px;
    text-align: left;
    color: #505050;
    margin-bottom: 24px;
`;

export const UiTextField = styled(TextField)({
  width: '100%',
  borderRadius: '7px',
  marginBottom: '14px !important',
  borderWidth: '5px',
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

export const UiFormControlLabel = styled(FormControlLabel)`
    position: relative;
    bottom: 35px;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0px;
    height: 100vh;
    /* width: 100%; */
    font-family: 'Montserrat';
`;

export const RegisterForm = styled.div`
    display: flex;
    /* flex-direction: row; */
    justify-content: center;
    width: 100%;

    flex: 0 0 55%; /* flex-basis: 50% */
    padding: 2rem;
    box-sizing: border-box; /* make sure 50% is still 50% after you add padding */
    overflow-y: auto; /* scrollability here */
`

export const Button = styled.button`
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

export const FieldsInRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const LoginContainer = styled.div`
text-align: center;
`;

export const Body = styled.div`
  font-weight: 400;
  font-size: 16px;
  color: #505050;
  padding: 32px;
  text-align: center;
`;

export const Link = styled.a`
    text-decoration: none;
    font-family: 'Montserrat';
    color: #5143E7;
    font-weight: bold;
`;

export const StyledSpan = styled.span`
    text-decoration: none;
    color: #5143E7;
    font-weight: bold;
    cursor: pointer;
`;

export const IconItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.50em;
  color: #A4A1A1;
  font-size: 16px;
`