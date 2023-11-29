import styled from 'styled-components';

export const HeaderTitle = styled.span`
    color: #747272;
    font-weight: bold;
`;

export const ChargeButton = styled.button`
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