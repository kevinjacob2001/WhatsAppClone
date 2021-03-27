import { Avatar, IconButton } from "@material-ui/core";
import styled from "styled-components";
import ChatIcon from "@material-ui/icons/Chat";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import { Button } from "@material-ui/core";
import * as EmailValidator from "email-validator";
import { auth, db } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollection } from "react-firebase-hooks/firestore";
import Chat from "./Chat";

function Sidebar() {
    const [user]=useAuthState(auth)
    const userChatRef=db.collection('chats').where('users','array-contains',user.email)
    const [chatSnapshot]=useCollection(userChatRef)
console.log(user)
  const CreateAChat = () => {
    const input = prompt("Please enter the email address to which u want to message!");

    if (!input) return null;

    if (EmailValidator.validate(input)&&!chatAlreadyExists(input)&&input!==user.email) {
      //we need to add to the 'chats' collection
      db.collection("chats").add({
          users:[user.email,input],

      })
    }
  };

const chatAlreadyExists=(recipientEmail)=>{
  return !!chatSnapshot?.docs.find((chat)=>chat.data().users.find((user)=>user===recipientEmail)?.length>0)

}

  return (
    <Container>
      <Header>
        <UserAvatar src={user?.photoURL} onClick={()=>auth.signOut()}/>
        <IconsContainer>
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </IconsContainer>
      </Header>

      <Search>
        <SearchIcon />
        <SearchInput placeholder="Search in chat" />
      </Search>
      <SidebarButton onClick={CreateAChat}>Start a new chat</SidebarButton>
      {chatSnapshot?.docs.map((chat)=>{
        return(
          <Chat key={chat.id} id={chat.id} users={chat.data().users}/>
        )
      })}
      {/* List of chats */}
    </Container>
  );
}

export default Sidebar;

const Container = styled.div`
flex:0.45;
border-right:1px solid whitesmoke;
min-width:300px;
max-width:350px;
overflow-y:scroll;
height:100vh;
::-webkit-scrollbar{
  display:none;
}
-ms-overflow-style:none;
scrollbar-width:none;

`;

const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

const SearchInput = styled.input`
  outline-width: 0;
  border: none;
  flex: 1;
`;

const SidebarButton = styled(Button)`
  width: 100%;

  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;

const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 6rem !important;
  border-bottom: 3px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

const IconsContainer = styled.div``;
