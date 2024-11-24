'use client'
import { cn } from "@/lib/utils"
import { useRef, useState } from "react"


const colors = ['green-900','red-900','yellow-800','white']
const fontWeights = []
const fontSize = []

interface ColorType {
    bg: string,
    text: string,
}
interface FontStyles {
    weight:''
}

export const FocusPage = () => {
    const [text,setText] = useState<string>('राधा')
    const [color, setColor] = useState<ColorType>({ bg: `bg-${colors[3]}`, text: `text-yellow-500` })
    const [fontStyle, setFontStyle] = useState<FontStyles>({
        weight:'font-[400]'
    })

    return <div className={``}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter your text here..."
          className="w-full p-2 border rounded-md h-32"
        />
        <FullscreenText text={text} fontStyle={fontStyle.weight} backgroundColor={cn(color.bg)} textColor={cn(color.text)}/>
        </div>
}



// Only work to show text and togle button for full screen
// In future make it like any file type can make full screen

const FullscreenText = ({ text = 'Testing Purpose',fontStyle='text-[100px] font-bold', backgroundColor='bg-red-900', textColor = 'text-blue-900' }) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const containerRef = useRef(null);

    const toggleFullscreen = async () => {
        if (!document.fullscreenElement && containerRef.current) {
            try {
                await containerRef.current.requestFullscreen();
                setIsFullscreen(true);
            } catch (err) {
                console.error('Error attempting to enable fullscreen:', err);
            }
        } else {
            if (document.exitFullscreen) {
                await document.exitFullscreen();
                setIsFullscreen(false);
            }
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto p-4">
            <button
                onClick={toggleFullscreen}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
            >
                {isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen'}
            </button>
            <div
                ref={containerRef}
                className={`${backgroundColor} p-8 rounded-lg shadow ${isFullscreen
                        ? 'fixed inset-0 flex items-center justify-center text-4xl overflow-auto'
                        : 'min-h-[200px] text-xl'
                    }`}
            >
                <span className={`${textColor} ${isFullscreen?'text-[250px] font-bold':''} hover:bg-blue-500 hover:text-white p-4 py-8 rounded-lg cursor-pointer`} onClick={toggleFullscreen}>
                    {text || 'Your text will appear here...'}
                </span>
            </div>
        </div>
    );
};