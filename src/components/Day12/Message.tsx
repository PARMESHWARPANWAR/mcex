import { MessageItem } from "./YoutubeChat"

export const Message:React.FC<MessageItem> = ({id,name,profileUrl,content}) =>{
    return( 
        <div className="flex" key={id}>
        <img src={profileUrl} className="w-4 h-4 rounded-full mr-4" alt={name}/>
        <p>
            <span className="font-bold mr-2">{name}</span>
            <span>{content}</span>
        </p>
        </div>
    )
}