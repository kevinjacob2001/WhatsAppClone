
import Head from 'next/head';
import styled from 'styled-components'

function login() {
    return (
        <OuterContainer>
            <Container>
            <Head>
                <title>Login</title>
            </Head>
            <LoginContainer>
                <Logo
                src="https://i.pinimg.com/originals/f7/5d/94/f75d94874d855a7fcfcc922d89ac5e80.png"
                    />
                <Button variant="outlined">Sign in with Google</Button>
            </LoginContainer>
        </Container>
        </OuterContainer>
    )
}

export default login

const OuterContainer=styled.div`
height:100vh;
width:100vw;
background-image:url('https://wallpapercave.com/wp/wp1843761.jpg');
background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`

const Container=styled.div`
  position:absolute;
  transform:translate(-50%,-50%);
  top:50%;
  left:50%;
`;

const LoginContainer=styled.div`
  display:flex;
  flex-direction:column
`;

const Logo=styled.img`
   height:9rem;
   width:13rem;
   margin-bottom:3rem;
`;

const Button=styled.button`

padding:1rem 2rem 1rem 2rem;
border-radius:.7rem;
border:none;
outline-width:0;
 :hover{
     cursor:pointer;
     background-color:#2aeae0;
 }
`;