import { signOut, getAuth } from "firebase/auth"
import './Home.css'
import { useState } from "react";
import { Picx } from "../Components/Picx";

export function Home(){
    const [query, setQuery] = useState('');
    const auth = getAuth()
    async function handleSignOut(){
        try {
            await signOut(auth);
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <header>
            <h3 className="title">THANK YOU HNG</h3>
            <input 
            type="text" 
            placeholder="Search by name of 'animal' e.g. Dog" 
            className="search" 
            onChange={e=>setQuery(e.target.value)}
            />
            <button className="but" onClick={()=>{handleSignOut()}}>Sign Out</button>
            </header>
            <main>
                
                    
                    <div className="grid-wrapper">
                        {Picx.filter((pic) => 
                        pic.name.toLowerCase().includes(query)
                        ).map((pic) => (
                            <div className={pic.class} key={pic.id}><img src={pic.src} alt={pic.alt}></img></div>
                        ))}
                    </div>
                
            </main>
            
        </div>
    )
    
}