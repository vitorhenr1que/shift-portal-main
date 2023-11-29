import styled from 'styled-components';
import { TextField } from "@mui/material";

export const Image = styled.img`
    position: absolute;
    width: 40%;
    height: 100%;
    left: 0px;
    top: 0px;
`;

export const Logo = styled.img`
    width: 210px;
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
})

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    padding: 0px;
    height: 100vh;
    width: 100%;
    font-family: 'Montserrat';
`;

export const LoginForm = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    width: 100%;
    padding-top: 130px;
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
  justify-content: center;
  margin-top: 40px;
  margin-bottom: 40px;
`;

export const Link = styled.a`
    text-decoration: none;
    color: #5143E7;
    font-weight: bold;
`;

export const StyledSpan = styled.span`
    text-decoration: none;
    color: #5143E7;
    font-weight: bold;
    cursor: pointer;
`;

export const Body = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 200.88%;
  text-align: center;
  color: #505050;
`;