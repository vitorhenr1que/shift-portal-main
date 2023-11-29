import styled from 'styled-components';

export const Container = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0px;
    gap: 1em;
    flex: none;
    order: 0;
    align-self: stretch;
    flex-grow: 0;
`;

export const Body = styled.h4`
    color: white;
    margin: 0;
    font-weight: 300;
    letter-spacing: 0.1px;
`;

export const Value = styled.h2`
  color: white;
  margin: 0;
  margin-top: 10px; 
  margin-bottom: 10px;
`;

export const Button = styled.button`
  background-color: #5143E7;
  color: white;
  font-size: 15px;
  padding: 10px 30px;
  border-radius: 5px;
  border: 0px;
  margin: 10px 0px;
  margin-left: 10px;
  cursor: pointer;
  width: 30%;
  height: 35px;
`;

export const FirstBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  isolation: isolate;
  width: 18.8%;
  height: 9.5em;
  background: #9993E0;
  border-radius: 8px;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

export const SecondBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  isolation: isolate;
  width: 18.8%;
  height: 9.5em;
  background: #776CEF;
  border-radius: 8px;
  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const ThirdBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  isolation: isolate;
  width: 18.8%;
  height: 9.5em;
  background: #5143E7;
  border-radius: 8px;
  flex: none;
  order: 2;
  flex-grow: 0;
`;

export const FourthBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  isolation: isolate;
  width: 18.8%;
  height: 9.5em;
  background: #5711D1;
  border-radius: 8px;
  flex: none;
  order: 3;
  flex-grow: 0;
`;

export const Blocks = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex;
  margin-top: 15px;
  margin-bottom: 30px;
  gap: 1em;
  font-family: 'Montserrat';
`;

export const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 32px 100px 40px;
  gap: 40px;
  width: 1068px;
  height: 412px;
  background: #FFFFFF;
  border-radius: 8px;
  flex: none;
  flex-grow: 0;
`;

export const IconContainer = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    color: #fff;
    margin-bottom: 12px;
`;

export const RoundIconBorder = styled.div`
    background: #360689;
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff
`;

export const MoneyIcon = styled.span`
    font-weight: 300;
    font-size: 16px;
`;


export const Divider = styled.div`
    width: 100%;
    border-top: 1px solid #fff;
`

export const CardFooter = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
`

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

export const UiButton = styled.button`
  background-color: #5143E7;
  color: white;
  font-size: 16px;
  padding: 12px;
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

export const Link = styled.a`
    text-decoration: none;
    color: #776CEF;
    font-weight: bold;
`;