import React, {useState, useContext} from "react";
import { userDetails } from "./UserDetailsContextProvider";
import "../css/message-input-form.css"

function MessageInputForm(){
    const { me, they, messages, setMessages} = useContext(userDetails)
    const senderAndReceiver = {sender: me ? me.id : "", receiver: they? they.id : ""}
    const [sending, setSending] = useState(false)
    const [messageContent, setMessageContent] = useState("")

    function updateMessages(newMessage){
        fetch('/messages', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify(newMessage)
        })
            .then(res => {
                if (res.status == 201) {
                    res.json().then(data => {
                        setMessages(messages => ([...messages, data]))
                        setSending(false)
                        setMessageContent("")
                    })
                }
            })
    }

    function handleSubmit(e){
        e.preventDefault()
        setSending(true)
        if(me && they){
            updateMessages({...senderAndReceiver, content: messageContent})
        }
    }

    function handleChange(e){
        setMessageContent(e.target.value)
    }


    return (
        <div className="message-input">
            <form onSubmit={handleSubmit}>
                <textarea onChange={handleChange} name="content" value={messageContent}/>
                <button className="btn">{sending? "Sending..." : "Send"}</button>
            </form>
        </div>
    )
}

export default MessageInputForm