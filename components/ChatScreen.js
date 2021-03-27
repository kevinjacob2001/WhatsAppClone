import { Avatar, IconButton } from "@material-ui/core";
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { auth, db } from "../firebase";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic'
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { useState } from "react";
import firebase from 'firebase'
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from 'timeago-react'
import { useRef } from "react";

function ChatScreen({messages,chat}) {
  const [user] = useAuthState(auth);
  const [input,setInput]=useState('')
  const endOfMessagesRef=useRef(null)
  const router = useRouter();
  const [messagesSnapshot]=useCollection(db.collection('chats').doc(router.query.id).collection('messages').orderBy('timestamp','asc'))

   const [recipientSnapshot]=useCollection(
     db.collection('users').where('email','==',getRecipientEmail(chat.users,user ))
   )



  const showMessage=()=>{
       if(messagesSnapshot){
           return messagesSnapshot.docs.map((message)=>(
             <Message
             key={message.id}
             user={message.data().user}
             message={{
               ...message.data(),
               timestamp:message.data().timestamp?.toDate().getTime()
             }}
             />
           ))
       }else{
         return JSON.parse(messages).map((message)=>(
           <Message key={message.id} user={message.user} message={message}/>
         ))
       }
  }

  const ScrollToBottom=()=>{
    endOfMessagesRef.current.scrollIntoView({
      behaviour: 'smooth',
      block:"start",
    })
  }

  const sendMessage=(e)=>{
    e.preventDefault();

    //update last seen
    db.collection('users').doc(user.uid).set({
      lastSeen:firebase.firestore.FieldValue.serverTimestamp()
    },
    {merge:true}
    )

    db.collection('chats').doc(router.query.id).collection('messages').add({
      timestamp:firebase.firestore.FieldValue.serverTimestamp(),
      message:input,
      user:user.email,
      photoURL:user.photoURL
    })
    setInput('')
    ScrollToBottom()
  }

const recipient=recipientSnapshot?.docs?.[0]?.data();  
const recipientEmail=getRecipientEmail(chat.users,user)
  return (
    <Container>
      <Header>
        {recipient?(
          <Avatar src={recipient?.photoURL}/>
        ):(
          <Avatar>{recipientEmail?.[0]?.toUpperCase()}</Avatar>
        )}
        

        <HeaderInformation>
          <h3>{recipientEmail}</h3>
          {recipientSnapshot?(
            <p>Last active: {' '}
            {recipient?.lastSeen?.toDate()?(
              <TimeAgo datetime={recipient?.lastSeen?.toDate()}/>
            ):"Unavailable"}
            </p>
          ):(
            <p>Loading last active...</p>
          )}
          
        </HeaderInformation>
        <HeaderIcons>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </HeaderIcons>
      </Header>

      <MessageContainer>
          {showMessage()} 
         
          <EndOfMessage ref={endOfMessagesRef}/>
      </MessageContainer>

      <InputContainer>
      <InsertEmoticonIcon/>
      <Input value={input} onChange={(e)=>setInput(e.target.value)}/>
      <button disabled={!input} hidden type="submit" onClick={sendMessage}>Send Message</button>
      <MicIcon/>
      </InputContainer>
    </Container>
  );
}

export default ChatScreen;

const Container = styled.div``;

const Input = styled.input`
flex:1;
align-items:center;
padding:10px;
position:sticky;
bottom:0;
background:white;
border:none;
outline:0;
background-color:whitesmoke;
margin-left:15px;
margin-right:15px; 
padding:20px;
`;


const InputContainer= styled.form`
  display:flex;
  align-items:center;
  padding:10px;
  position:sticky;
  background-color:white;
  z-index:100;
  bottom:0;
`;

const Header = styled.div`
  position: sticky ;
  background-color: white !important;
  z-index: 100 !important;
  top: 0;

  display: flex;
  border-bottom: 1px solid whitesmoke;
  
  align-items: center;
`;

const HeaderInformation = styled.div`
  margin-left: 1.4rem;
  flex: 1;

  > h3 {
    margin-bottom: 3px;
  }
  > p { 
    color: gray;
  }
`;

const HeaderIcons = styled.div``;


const MessageContainer=styled.div`
padding:30px;
min-height:90vh ;
background:#e5ded8;
`;

const EndOfMessage=styled.div`

`;

