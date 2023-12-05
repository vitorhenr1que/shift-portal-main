import styled from "styled-components";

export const Button = styled.button`
  background-color: #5143E7;
  color: white;
  font-size: 15px;
  padding: 10px 30px;
  border-radius: 8px;
  border: 0px;
  margin: 10px 0px;
  margin-left: 10px;
  cursor: pointer;
  width: 25%;
  height: 48px;
`;

export const CustomerButton = styled.button`
background: none;
color: #5143E7;
font-size: 16px;
padding: 10px;
border-radius: 5px;
border: none;
cursor: pointer;
outline: none;
font-family: 'Montserrat';
transition: .2s;
&:hover {
  color: #393099;
};



&:disabled {
  background-color: #fff;
  color: #505050;
  border: 1px solid #505050;
  cursor: not-allowed;
};
`;

export const CustomerButtonPurple = styled.button`
background: none;
color: #5143E7;
font-size: 16px;
padding: 10px;
border-radius: 5px;
border: none;
cursor: pointer;
outline: none;
font-family: 'Montserrat';
transition: .2s;
background: #393099;
color: #fff;




&:disabled {
  background-color: #fff;
  color: #505050;
  border: 1px solid #505050;
  cursor: not-allowed;
};
`;