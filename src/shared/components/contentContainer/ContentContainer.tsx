import * as React from 'react';
import { Container } from './styles'

interface IContentContainerProps {
    children: React.ReactNode;
}

export const ContentContainer: React.FC<IContentContainerProps> = ({ children }): JSX.Element => {
    return (
        <>
            <Container>
                {children}
            </Container>
        </>)
}
