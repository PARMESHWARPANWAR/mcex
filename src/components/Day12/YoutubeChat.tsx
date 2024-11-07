'use client'
import { useEffect, useState } from "react"
import { VideoLive } from "./VideoLive"
import { Message } from "./Message"
import { faker } from '@faker-js/faker';

export interface MessageItem {
    id: number,
    name: string,
    content: string,
    profileUrl: string,
}

// Faker Data Url => https://fakerjs.dev/api/faker.html

const MSG_LIMIT = 20;

const MSG = {
    id: 1,
    name: 'Your Name',
    content: '',
    profileUrl: 'https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg'

}

let CURR = 0

const LiveChat = () => {
    const [message, setMessage] = useState<MessageItem>(MSG)
    const [messages, setMessages] = useState<MessageItem[]>([])

    const addMyMsg = () => {
        if (message?.content) {
            setMessages((messages) => {
                let newMsges = [message, ...messages]
                newMsges = newMsges.splice(0, MSG_LIMIT);
                return newMsges;
            })
        }
        setMessage({
            id: 1,
            name: 'Parmeshwar Panwar',
            content: '',
            profileUrl: 'https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg'
    
        })
    }

    const fetchData = () => {
        const newMsg = [{
            id: CURR++,
            name: faker.person.fullName(),
            content: faker.lorem.lines({ min: 1, max: 2 }),
            profileUrl: faker.image.avatar()
        }]

        setMessages((msges) => {
            let newMsges = [...newMsg, ...msges]
            newMsges = newMsges.splice(0, MSG_LIMIT);
            return newMsges;
        })
    }

    useEffect(() => {
        const interVal = setInterval(fetchData, 1000)

        return () => {
            clearInterval(interVal);
        }
    }, [])

    return (
        <div className="p-5 border-2 border-gray-400 ml-4 w-full rounded-lg">
            <div className="mb-4 border-b-2 border-gray-400">LiveChat</div>
            <div className="h-96 space-y-2 overflow-auto flex flex-col-reverse">
                {messages && messages.map((msg, idx) => <Message key={idx} {...msg} />)}
            </div>
            <div className="border-t-2 border-gray-400 mt-4 flex p-2">
                <input type='text' value={message.content} className="w-full border-2 rounded-lg mr-2 px-2" onChange={(e)=>setMessage((msg)=>{
                    return {
                        ...msg,
                        id:CURR++,
                        content:e.target.value,
                    }
                })}/>
                <button onClick={addMyMsg} className="">Send</button>
            </div>
        </div>
    )
}

export const YoutubeLiveChat = () => {
    return <div className="flex">
        <VideoLive />
        <LiveChat />
    </div>
}