'use client';
import { useRouter } from 'next/navigation';
export default function RequestParser() {
    const router = useRouter();
    const whoami = () => {
        router.push("/request-parser/api/whoami");
    };
    return (
        <div>
           <div className="whoHolder">
            <h1>WHO ARE YOU?!?!</h1>
                <button onClick={whoami}>??????</button>
           </div>
        </div>
    );
};