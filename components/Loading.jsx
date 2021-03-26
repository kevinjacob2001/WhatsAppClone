import {Circle} from 'better-react-spinkit'

function Loading() {
    return (
        <center style={{display:"grid",placeItems:"center",height:"100vh"}}>

            <div>
                <img src="https://i.pinimg.com/originals/f7/5d/94/f75d94874d855a7fcfcc922d89ac5e80.png" alt="" height={200} style={{marginBottom:10}}/>
                <Circle color="#3cbc28" size={60}/>
            </div>
            
        </center>
    )
}

export default Loading
