'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function Timestamp() {
    const [input, setInput] = useState('');
    const router = useRouter();
    console.log(input);
    const ButtonFunction = () => { 
        let value = input;
        if ( value == "" ) { 
            value = "empty";
            console.log(value);
        }
        router.push('timestamp/api/' + value);
    };
    return (
        <div>
            <div className="ts-Container">
                <h1>Timestamp Microservice</h1>
                <div className="ts-form">
                    <p>Please input a time in YYYY-MM-DD format or in UNIX(ms) format</p>
                    <input autoComplete="off" id="time" placeholder="Please input a Date/Time!" onChange={(e) => { setInput(e.target.value) }} />
                    <button onClick={() => { ButtonFunction() }}>Submit</button>
                </div>
            </div>
        </div>
    );
}