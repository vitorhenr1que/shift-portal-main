import styled from 'styled-components';
import { TextField, InputBase } from "@mui/material";
import { styled as muiStyled } from '@mui/material/styles';

export const Link = styled.a`
    text-decoration: none;
    color: #5143E7;
    font-weight: bold;
`;

export const Container = styled.div`
    padding: 40px 40px 40px 40px;
    background: #F2F2F2;
    display: flex;
    height: 100vh;
    font-family: 'Montserrat';
`;

export const Card = styled.div`
    background: #fff;
    padding: 20px 30px 20px 30px;
    border-radius: 8px;
`

export const CashOutMethodButton = styled.div`
    display: flex; 
    gap: 0.2em; 
    align-items: center;
    border: 1.33px solid #DFDFDF;
    border-radius: 2px;
    padding: 5px;
    font-family: Montserrat;
    font-size: 16px;
    color: #505050;
    cursor: pointer;
    &:hover {
        color: #5143E7;
        border: 1.33px solid #5143E7;
        background: #EEECFF;
    };
    &:active {
        color: #5143E7;
        border: 1.33px solid #5143E7;
        background: #EEECFF;
    };
    &:disabled {
        color: #505050;
    };
`
export const CashOutMethodButtonActive = styled.div`
    display: flex; 
    gap: 0.2em; 
    align-items: center;
    border: 1.33px solid #5143E7;
    background: #EEECFF;
    border-radius: 2px;
    padding: 5px;
    font-family: Montserrat;
    font-size: 16px;
    color: #5143E7;
    cursor: pointer;
    &:hover {
        color: #5143E7;
        border: 1.33px solid #5143E7;
        background: #EEECFF;
    };
    &:active {
        color: #5143E7;
        border: 1.33px solid #5143E7;
        background: #EEECFF;
    };
    &:disabled {
        color: #505050;
    };
`

export const Value = styled.h2`
  color: #393099;
  margin: 0;
  margin-top: 10px; 
  margin-bottom: 10px;
`;

export const MoneyIcon = styled.span`
    color: #393099;
    font-weight: 400;
    font-size: 16px;
`;

export const RoundIconBorder = styled.div`
    background: #360689;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
`;

export const TableHeader = styled.div`
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #DFDFDF;
    padding-bottom: 10px;
    margin-bottom: 10px;
`;

export const TableFooter = styled.div`
    display: flex;
    justify-content: flex-end;
`

export const TableFooterValue = styled.div`
    color: #747272;
    font-weight: bold;
    font-size: 16px;
`

export const ColumnTitle = styled.div`
    color: #747272;
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 10px;
`

export const ColumnValue = styled.div`
    color: #747272;
    font-size: 16px;
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
});

export const DefaultInput = muiStyled(InputBase)(({ theme }) => ({
    // 'label + &': {
    // //   marginTop: theme.spacing(1),
    // },
    '& .MuiInputBase-input': {
      borderRadius: 7,
    //   position: 'relative',
    //   backgroundColor: theme.palette.background.paper,
      border: '1px solid #e0e0e0',
      fontSize: 16,
      padding: '10px 26px 10px 12px',
      transition: theme.transitions.create(['border-color', 'box-shadow']),
      // Use the system font instead of the default Roboto font.
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:focus': {
        borderRadius: 7,
        borderColor: '#80bdff',
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
      },
    },
  }));

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

export const ScrollContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
    max-height: 350px;
    overflow: auto;
    padding-right: 5px;
    padding-bottom: 10px;
    scrollbar-width: thin;

    &::-webkit-scrollbar {
        width: 5px;
    };
    &::-webkit-scrollbar-track {
        //background: red; 
    };
    &::-webkit-scrollbar-thumb {
        background: #DFDFDF; 
        border-radius: 5px;
    };

    /* Handle on hover */
    &::-webkit-scrollbar-thumb:hover {
        background: #A4A1A1; 
    };
`;

export const UiOutlinedButton = styled.button`
  background-color: #fff;
  color: #5143E7;
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #5143E7;
  cursor: pointer;
  outline: none;
  font-family: 'Montserrat';
  &:hover {
    background-color: #5143E7;
    color: #fff;
  };
  &:active {
    background-color: #4337CA;
    color: #fff;
  };
  &:disabled {
    background-color: #fff;
    color: #505050;
    border: 1px solid #505050;
    cursor: not-allowed;
  };
`;