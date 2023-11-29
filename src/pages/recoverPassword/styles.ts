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
    width: 230px;
    height: 212px;
    margin-right: 40px;
`;

export const UiTextField = styled(TextField)`
    width: 80%;
    height: 50px;
`;

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px;
    gap: 20%;
    position: absolute;
    width: 442px;
    height: 100px;
    left: 55%;
    top: 120px;
`;

export const Button = styled.button`
  background-color: #5143E7;
  color: white;
  font-size: 20px;
  padding: 10px 60px;
  border-radius: 5px;
  border: 0px;
  margin: 10px 0px;
  cursor: pointer;
  width: 80%;
`;

export const FieldsInRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Link = styled.a`
    text-decoration: none;
    text-decoration-color: '#5143E7';
    font-family: 'Montserrat';
`;

export const Title = styled.p`
    width: 286px;
    height: 34px;
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 140.88%;
    color: #505050;
    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 0px;
`;

export const Body = styled.p`
    width: 473px;
    height: 75px;
    font-family: 'Montserrat';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    line-height: 140.88%;
    text-align: center;
    color: #505050;
    flex: none;
    order: 0;
    flex-grow: 0;
    margin: 0px;
`;