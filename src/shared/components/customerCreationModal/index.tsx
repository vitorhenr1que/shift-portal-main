import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { CustomerButton, CustomerButtonPurple } from '../../../pages/customer/styles';
import { ActionsButtons, AdressData, AdressDataRow, ClientData, Container, CustomerCreationButton, DivTitle, FormContainer, SubContainer, UiTextField } from './styles';
import { Button, Typography } from '@mui/material';
import { Close } from '@mui/icons-material';



type Anchor = 'right';



export default function CustomerCreationModal():JSX.Element {
  const [state, setState] = useState({right: false});
  const [name, setName] = useState(' ')
  const [email, setEmail] = useState(' ')
  const [companyId, setCompanyId] = useState(' ')
  const [telephone, setTelephone] = useState(' ')
  const [postalCode, setPostalCode] = useState(' ')
  const [adress, setAdress] = useState(' ')
  const [houseNumber, setHouseNumber] = useState(' ')
  const [complement, setComplement] = useState(' ')
  const [neighborhood, setNeighborhood] = useState(' ')
  const [county, setCounty] = useState(' ')
  const [region, setRegion] = useState(' ')

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = () => (
    <Box
      sx={{ width: "52vw" }}
      role="presentation"
      
    >
        <Container>
            <SubContainer>
                <FormContainer>
                    <DivTitle>
                    <Button onClick={toggleDrawer('right', false)} style={{color: '#505050', minWidth: 0}}>
                    <Close/>
                    </Button>
                    <Typography
                        variant={'h5'}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}>Cadastrar novo cliente</Typography>
                    </DivTitle>
                    <ClientData>
                    <Typography
                        style={{marginBottom: '8px'}}
                        variant={'h6'}
                        fontSize={16}
                        fontWeight={'bold'}
                        overflow={"hidden"}
                        textOverflow={"ellipsis"}>Insira os dados do cliente</Typography>

                    <UiTextField 
                    error={name === ''}
                    helperText={ name === '' ? 'Campo obrigatório!' : null}
                    label="Nome do cliente"
                    variant='outlined'
                    placeholder="Nome do cliente"
                    multiline={false}
                    required
                    value={name}
                    name='name'
                    size='small'
                    onChange={(e) => setName(e.target.value)}
                    />
                    
                    <UiTextField 
                    error={companyId === ''}
                    helperText={ companyId === '' ? 'Campo obrigatório!' : null}
                    label="CNPJ ou CPF do Cliente"
                    variant='outlined'
                    placeholder="CNPJ ou CPF do Cliente"
                    multiline={false}
                    required
                    value={companyId}
                    name='companyid'
                    size='small'
                    onChange={(e) => setCompanyId(e.target.value)}
                    />
                    <UiTextField 
                    error={email === ''}
                    helperText={ email === '' ? 'Campo obrigatório!' : null}
                    label="Email"
                    variant='outlined'
                    placeholder="Insira o seu e-mail"
                    multiline={false}
                    required
                    value={email}
                    name='email'
                    size='small'
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <UiTextField 
                    error={telephone === ''}
                    helperText={ telephone === '' ? 'Campo obrigatório!' : null}
                    label="Celular"
                    variant='outlined'
                    placeholder="Celular"
                    multiline={false}
                    required
                    value={telephone}
                    type='number'
                    name='telephone'
                    size='small'
                    onChange={(e) => setTelephone(e.target.value)}
                    />
                    </ClientData>
                    <AdressData>
                        <Typography
                            style={{marginBottom: '8px'}}
                            variant={'h6'}
                            fontSize={16}
                            fontWeight={'bold'}
                            overflow={"hidden"}
                            textOverflow={"ellipsis"}>Insira os dados do cliente</Typography>
                    <UiTextField 
                         error={postalCode === ''}
                         helperText={ postalCode === '' ? 'Campo obrigatório!' : null}
                         label="CEP"
                         variant='outlined'
                         placeholder="CEP"
                         multiline={false}
                         required
                         value={postalCode}
                         name='adress'
                         size='small'
                         onChange={(e) => setPostalCode(e.target.value)}
                    />
                    <UiTextField 
                         error={adress === ''}
                         helperText={ adress === '' ? 'Campo obrigatório!' : null}
                         label="Endereço"
                         variant='outlined'
                         placeholder="Endereço"
                         multiline={false}
                         required
                         value={adress}
                         name='adress'
                         size='small'
                         onChange={(e) => setAdress(e.target.value)}
                    />
                    <AdressDataRow>
                        <UiTextField 
                             error={houseNumber === ''}
                             helperText={ houseNumber === '' ? 'Campo obrigatório!' : null}
                             label="Número"
                             variant='outlined'
                             placeholder="Número"
                             multiline={false}
                             required
                             value={houseNumber}
                             name='houseNumber'
                             size='small'
                             onChange={(e) => setHouseNumber(e.target.value)}
                        />
                         <UiTextField 
                             error={complement === ''}
                             helperText={ complement === '' ? 'Campo obrigatório!' : null}
                             label="Complemento"
                             variant='outlined'
                             placeholder="Complemento"
                             multiline={false}
                             required
                             value={complement}
                             name='complement'
                             size='small'
                             onChange={(e) => setComplement(e.target.value)}
                        />
                    </AdressDataRow>
                    <AdressDataRow>
                        <UiTextField 
                             error={neighborhood === ''}
                             helperText={ neighborhood === '' ? 'Campo obrigatório!' : null}
                             label="Bairro"
                             variant='outlined'
                             placeholder="Bairro"
                             multiline={false}
                             required
                             value={neighborhood}
                             name='neighborhood'
                             size='small'
                             onChange={(e) => setNeighborhood(e.target.value)}
                        />
                         <UiTextField 
                             error={county === ''}
                             helperText={ county === '' ? 'Campo obrigatório!' : null}
                             label="Cidade"
                             variant='outlined'
                             placeholder="Cidade"
                             multiline={false}
                             required
                             value={county}
                             name='county'
                             size='small'
                             onChange={(e) => setCounty(e.target.value)}
                        />
                    </AdressDataRow>
                    <UiTextField 
                             error={region === ''}
                             helperText={ region === '' ? 'Campo obrigatório!' : null}
                             label="Estado"
                             variant='outlined'
                             placeholder="Estado"
                             multiline={false}
                             required
                             value={region}
                             name='region'
                             size='small'
                             onChange={(e) => setRegion(e.target.value)}
                        />
                    </AdressData>
                </FormContainer>
                <ActionsButtons>
                    <CustomerButton style={{minWidth: '212px', height: '48px' }}>Cancelar</CustomerButton>
                    <CustomerButtonPurple style={{minWidth: '212px', height: '48px' }}>Cadastrar</CustomerButtonPurple>
                </ActionsButtons>
            </SubContainer>
        </Container>
    </Box>
  );



  return (
    <div>
          <CustomerCreationButton onClick={toggleDrawer('right', true)}>Cadastrar novo cliente</CustomerCreationButton>
          <Drawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
          >
            {list()}
          </Drawer>
    </div>
  );

}