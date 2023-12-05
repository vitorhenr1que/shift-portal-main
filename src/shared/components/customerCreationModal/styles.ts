import styled from "styled-components";
import { TextField } from "@mui/material";

export const CustomerCreationButton = styled.button`
background: none;
color: #5143E7;
font-size: 16px;
padding: 10px;
border-radius: 5px;
border: none;
cursor: pointer;
outline: none;
min-width: 212px;
height: 48px;
font-family: 'Montserrat';
transition: .2s;
background-color: #5143E7;
color: #fff;
&:hover {
  background-color: #393099;
};



&:disabled {
  background-color: #fff;
  color: #505050;
  border: 1px solid #505050;
  cursor: not-allowed;
};
`;

export const Container = styled.div`
padding: 40px 32px 40px 24px;
`
export const SubContainer = styled.div`
display: flex;
flex-direction: column;
gap: 70px;
`
export const FormContainer = styled.form`
display: flex;
flex-direction: column;
gap: 40px;
`

export const DivTitle = styled.div`
display: flex;
align-items: center;
gap: 1rem;
`

export const ActionsButtons = styled.div`
display: flex;
justify-content: flex-end;
gap: 12px;
`

export const ClientData = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
`

export const AdressData = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
`

export const AdressDataRow = styled.div`
display: flex;
justify-content: space-between;
gap: 1rem;
`

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