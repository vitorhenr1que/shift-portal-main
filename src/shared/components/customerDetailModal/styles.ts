import styled from "styled-components";

export const Container = styled.div`
display: flex;
flex-direction: column;
padding: 40px 32px 24px 40px;
`

export const InfoContainer = styled.div`
display: flex;
flex-direction: column;
gap: 40px;
margin-bottom: 1.5rem;
`

export const DivTitle = styled.div`
display: flex;
align-items: center;
gap: 1rem;
`

export const DivInfo = styled.div`
display: flex;
flex-direction: column;
width: 80%;
`

export const CustomerDataContainer = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
`
export const CustomerDataRow = styled.div`
display: flex;
`

export const ChargeStatsContainer = styled.div`
display: flex;
justify-content: space-between;
gap: .5rem;
`

interface props {
    isClicked: string;
}

export const ChargeStats = styled.div<props>`
padding: 16px 16px 16px 8px;
display: flex;
flex: 1;
flex-direction: column;
align-items: center;
justify-content: space-between;
gap: 1rem;
border: 1px solid #DFDFDF;
border-radius: 8px;
background-color: ${(props) => (props.isClicked)};

&:focus {
    background-color: #F0EFFF;
    border: 1px solid #9993E0;
}
`

export const Actions = styled.div`

`