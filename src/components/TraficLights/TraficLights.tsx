"use client"
import React, { useState, useRef, useEffect } from "react";


const TraficLightsData = {
    red: {
        next: 'yellow',
        timer: 10,
    },
    yellow: {
        next: 'green',
        timer: 5,
    },
    green: {
        next: 'red',
        timer: 10,
    }
}

const light = {
    red: '#FF0000',
    yellow: '#FFFF00',
    green: '#00FF00',
}

const TraficLights = () => {
    const [countDown, setCountDown] = useState(2)
    const [currentLight, setCurrentLight] = useState('red');
    const [delay, setDelay] = useState('')
    const timerRef = useRef();
    const countRef = useRef(countDown);
    // const inputRef = useRef(null);

    const endTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            const nextlight = TraficLightsData[currentLight].next;
            setCountDown(TraficLightsData[nextlight].timer);
            setCurrentLight(nextlight);
        }
    };

    const setLight = (light: 'red' | 'yellow' | 'green') => {
        if (light === currentLight) return;
        clearInterval(timerRef.current)
        setCountDown(TraficLightsData[light].timer);
        setCurrentLight(light);
    }

    const timer = () => {
        if (countRef.current <= 0) {
            endTimer();
        } else {
            setCountDown(prev => prev - 1);
        }
    };

    useEffect(() => {
        countRef.current = countDown;
    }, [countDown]);

    useEffect(() => {
        timerRef.current = setInterval(timer, 1000);

        // Cleanup function
        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [currentLight]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const num = parseInt(delay)
            if (!isNaN(num) && num > 0) {
                setCountDown(prev => prev + num);
                setDelay('');
            }
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        const value = e.target.value.replace(/[^0-9]/g, '');
        setDelay(value);
    };
    
    return (
        <div>
            <span>CountDown:<b>{countDown}</b></span>
            <div className='w-fit bg-slate-600 flex  flex-col space-y-2 px-2 items-center justify-center py-2'>
                <div onClick={() => setLight('red')} style={{ width: '20px', height: '20px', borderRadius: '50%', background: `${light.red}`, opacity: `${currentLight == 'red' ? '1' : '0.3'}`, cursor: 'pointer' }}></div>
                <div onClick={() => setLight('yellow')} style={{ width: '20px', height: '20px', borderRadius: '50%', background: `${light.yellow}`, opacity: `${currentLight == 'yellow' ? '1' : '0.3'}`, cursor: 'pointer' }}></div>
                <div onClick={() => setLight('green')} style={{ width: '20px', height: '20px', borderRadius: '50%', background: `${light.green}`, opacity: `${currentLight == 'green' ? '1' : '0.3'}`, cursor: 'pointer' }}></div>
            </div>
            <div className='flex flex-col w-fit mt-8'>
                <label htmlFor='time-setter'>Increase Time for current light</label>
                <input id='time-setter' className='border-2 border-gray-600 rounded-md px-2' type='text' value={delay} 
                onChange={handleInputChange}
                onKeyDown={handleKeyDown} 
                />
            </div>
        </div>
    );
}

export default TraficLights;