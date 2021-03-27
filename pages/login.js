import Head from "next/head";
import styled from "styled-components";
import { auth, provider } from "../firebase";

function login() {
    const signIn=()=>{
        auth.signInWithPopup(provider).catch(alert);
    }
  return (
    <OuterContainer>
      <Container>
        <Head>
          <title>Login</title>
        </Head>
        <LoginContainer>
          <Logo src="https://i.pinimg.com/originals/f7/5d/94/f75d94874d855a7fcfcc922d89ac5e80.png" />
          <Button onClick={signIn} variant="outlined">Sign in with Google</Button>
        </LoginContainer>
      </Container>
    </OuterContainer>
  );
}

export default login;

const OuterContainer = styled.div`
  height: 100vh;
  width: 100vw;
  background-image: linear-gradient(to right top, #b784a7, #c18bb6, #ca93c5, #d29bd6, #d9a4e7, #c8b1f5, #b7befc, #abc9ff, #8ed7ff, #6ee5ff, #58f1ff, #5ffbf1);
  background-position: center;
 
  background-size: cover;
  
`;

const Container = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  border-radius:10px;
  box-shadow: rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px;
`;

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding:3rem;
  background-color:whitesmoke;
  border-radius:10px;
`;

const Logo = styled.img`
  height: 9rem;
  width: 13rem;
  margin-bottom: 3rem;
`;

const Button = styled.button`
  padding: 1rem 2rem 1rem 2rem;
  border-radius: 0.7rem;
  border: none;
  background-color: #abe9cd;
  outline-width: 0;
  :hover {
    cursor: pointer;
    background-color: #00A859;
    color:white;
  }
`;
