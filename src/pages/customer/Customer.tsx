import { Typography, useMediaQuery, useTheme } from "@mui/material";
import { ContentContainer, ListingTools, MenuLeft } from "../../shared/components";
import ChargeForm from "../../shared/components/chargeForm/ChargeForm";
import CustomizedDialogs from "../../shared/components/chargeModal/CustomizedDialogs";
import ChargesTable from "../../shared/components/customerTable/CustomerTable";
import { ChargeButton } from "../../shared/components/chargesTable/styles";
import DateFilter from "../../shared/components/dateFilter/DateFilter";
import SearchBar from "../../shared/components/searchBar/SearchBar";
import { LayoutBasePages } from "../../shared/layouts";
import { Button } from "./styles";
import CustomerTable from "../../shared/components/customerTable/CustomerTable";
import CustomerCreationModal from "../../shared/components/customerCreationModal";

interface createDataProps {
    id: string;
    name: string;
    companyId: number;
    email: string;
    phone: string;
    city: string;
    createdAt: Date;
    charges: number;
    paidCharges: number;
    pendingCharges: number;
    adress: {
        road: string;
        neighborhood: string;
        number: string;
        state: string;
        city: string;
        postalCode: string;
    };
}


export default function Customer(){

    const theme = useTheme()
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('sm'));

    function createData(rows: createDataProps) {
        return rows ;
      }
    function resend (){

    }
    const rows2 = [
        createData({id: '', name: 'Vitor Henrique', companyId: 23, email: '', phone: '', city: '', createdAt: new Date(), charges: 3, paidCharges: 3, pendingCharges: 0, adress: {road: '', neighborhood: '', number: '', state: '', city: '', postalCode: ''}}),
        createData({id: '', name: 'Paula Albuquerque', companyId: 23, email: '', phone: '', city: '', createdAt: new Date(), charges: 3, paidCharges: 3, pendingCharges: 0, adress: {road: '', neighborhood: '', number: '', state: '', city: '', postalCode: ''}}),
        createData({id: '', name: 'Antony Davies', companyId: 23, email: '', phone: '', city: '', createdAt: new Date(), charges: 3, paidCharges: 3, pendingCharges: 0, adress: {road: '', neighborhood: '', number: '', state: '', city: '', postalCode: ''}}),
        createData({id: '', name: 'Paulo Henrique', companyId: 23, email: '', phone: '', city: '', createdAt: new Date(), charges: 3, paidCharges: 3, pendingCharges: 0, adress: {road: '', neighborhood: '', number: '', state: '', city: '', postalCode: ''}}),
        createData({id: '', name: 'Bruna Silva', companyId: 23, email: '', phone: '', city: '', createdAt: new Date(), charges: 3, paidCharges: 3, pendingCharges: 0, adress: {road: '', neighborhood: '', number: '', state: '', city: '', postalCode: ''}}),
        createData({id: '', name: 'Pedro Sanchez', companyId: 23, email: '', phone: '', city: '', createdAt: new Date(), charges: 3, paidCharges: 3, pendingCharges: 0, adress: {road: '', neighborhood: '', number: '', state: '', city: '', postalCode: ''}}),
        createData({id: '', name: 'Maria de Almerinda', companyId: 23, email: '', phone: '', city: '', createdAt: new Date(), charges: 3, paidCharges: 3, pendingCharges: 0, adress: {road: '', neighborhood: '', number: '', state: '', city: '', postalCode: ''}}),
        createData({id: '', name: 'Maria de Almerinda', companyId: 23, email: '', phone: '', city: '', createdAt: new Date(), charges: 3, paidCharges: 3, pendingCharges: 0, adress: {road: '', neighborhood: '', number: '', state: '', city: '', postalCode: ''}}),
        createData({id: '', name: 'Maria de Almerinda', companyId: 23, email: '', phone: '', city: '', createdAt: new Date(), charges: 3, paidCharges: 3, pendingCharges: 0, adress: {road: '', neighborhood: '', number: '', state: '', city: '', postalCode: ''}}),
        createData({id: '', name: 'Maria de Almerinda', companyId: 23, email: '', phone: '', city: '', createdAt: new Date(), charges: 3, paidCharges: 3, pendingCharges: 0, adress: {road: '', neighborhood: '', number: '', state: '', city: '', postalCode: ''}}),
        createData({id: '', name: 'Maria de Almerinda', companyId: 23, email: '', phone: '', city: '', createdAt: new Date(), charges: 3, paidCharges: 3, pendingCharges: 0, adress: {road: '', neighborhood: '', number: '', state: '', city: '', postalCode: ''}}),

      ].sort((a, b) => (a.charges < b.charges ? -1 : 1));
    return (
        <>  
        <MenuLeft>
        <LayoutBasePages
        children={undefined}
        barraDeFerrementas={(
            <ListingTools titlePage="Gestão de Clientes"/>
        )}/>
        <ContentContainer>
            <div style={{width: "100%"}}>
            <Typography 
                        variant={smDown ? 'h5' : mdDown ? 'h6' : 'h6'}
                        whiteSpace={"normal"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        style={{ marginBottom: '24px' }}
                    >
                        Clientes salvos
            </Typography>
            <Typography
                        variant={'subtitle1'}
                        whiteSpace={"normal"}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}
                        color={'#505050'}
                        style={{ marginBottom: '32px' }}
                    >
                        Acesse, gerencie os dados e cobranças de todos os seus clientes cadastrados.
            </Typography>
            <div style={{marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <SearchBar/>
            
                <CustomerCreationModal/>

           
            </div>
            
            <div>
                <CustomerTable rows={rows2} resend={resend} />

            </div>
            </div>
        </ContentContainer>
        </MenuLeft>
        </>
    )
}