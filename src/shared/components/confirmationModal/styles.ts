import styled from 'styled-components';
import { TextField } from "@mui/material";

export const UiButton = styled.button`
  background-color: #5143E7;
  color: white;
  font-size: 16px;
  padding: 12px;
  border-radius: 5px;
  border: 0px;
  margin: 10px 0px;
  cursor: pointer;
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

export const UiLink = styled.a`
  color: #5143E7;
  font-size: 16px;
  padding: 10px;
  cursor: pointer;
  outline: none;
  font-family: 'Montserrat';
  &:hover {
    color: #4337CA;
  };
  &:active {
    color: #5143E7;
    background-color: #EEECFF;
    border: 1px solid #5143E7;
    border-radius: 5px;
    padding: 10px;
  };
  &:disabled {
    color: #505050;
  };
`;


export const UiTextField = styled(TextField)`
    width: 80%;
    height: 50px;
`;