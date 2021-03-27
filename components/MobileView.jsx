
import styled, { keyframes } from 'styled-components';
import { fadeIn,fadeInUp} from 'react-animations';
const bounceAnimation = keyframes`${fadeIn}`;
function MobileView() {
  
    return (
        <Container>
           <Card>
               <h4>Oops! <br></br>ChatNow.kj is only available for tablets,laptops and desktops!</h4>
           </Card>
        </Container>
    )
}

export default MobileView


const Container= styled.div`
height: 100vh !important;
width: 100vw !important;
background-image: linear-gradient(to right top, #b784a7, #c18bb6, #ca93c5, #d29bd6, #d9a4e7, #c8b1f5, #b7befc, #abc9ff, #8ed7ff, #6ee5ff, #58f1ff, #5ffbf1);
background-position: center;

background-size: cover;

`


const Card=styled.div`
animation: 1s ${bounceAnimation};
transform:translate(-50%,-50%);
position:absolute;
left:50%;
top:50%;
padding:10px;
box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px;
background-color:whitesmoke;
border-radius:10px;
width:15rem;
height:15rem;
align-items:center;
justify-content:center;
display:flex;
>h4{
    text-align:center;
}
`;