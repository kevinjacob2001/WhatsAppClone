import { Button } from '@material-ui/core';
import Head from 'next/head';
import styled from 'styled-components'

function login() {
    return (
        <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
                <Logo
                src="https://i.pinimg.com/originals/f7/5d/94/f75d94874d855a7fcfcc922d89ac5e80.png"
                width="140px"
                />
                <Button>Sign in with Google</Button>
            </LoginContainer>
        </Container>
    )
}

export default login

const Container=styled.div`

`;

const LoginContainer=styled.div`

`;

const Logo=styled.img`

`;