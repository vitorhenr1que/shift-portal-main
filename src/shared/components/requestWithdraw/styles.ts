import styled from 'styled-components';
import { TextField } from "@mui/material";

export const UiButton = styled.button`
  background-color: #5143E7;
  color: white;
  font-size: 15px;
  padding: 10px 30px;
  border-radius: 5px;
  border: 0px;
  margin: 10px 0px;
  margin-left: 10px;
  cursor: pointer;
`;

export const UiTextField = styled(TextField)`
    width: 80%;
    height: 50px;
`;

export const Link = styled.a`
    text-decoration: none;
    text-decoration-color: '#5143E7';
    font-family: 'Montserrat';
`;