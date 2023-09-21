import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import "./Signin.css"

export function Signin(){
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const auth = getAuth()
    const navigate = useNavigate();
    const [error, setError] = useState(null)

    async function handleSignin(e){
        e.preventDefault();
       signInWithEmailAndPassword(auth,email,password)
       .then((user) => {
        setError('')
        navigate('/home')
       })
       .catch((error) => {
        setError('Check that you are using authorised email and password')
        console.log(error)
       })
    }

    return (
        <div className='page'>
        <div className='card'>
            <div className='card-body'>
                <h2 style={{textAlign: 'center', marginBottom: '4px'}}>Sign In</h2>
                {error && <div style={{padding: '10px', backgroundColor:'rgba(255,0,0,0.3)', fontSize: '15px', textAlign:'center', color:'red'}}>{error}</div>}
                <form  style={{width: '100%', display:'flex', justifyContent:'center', alignItems:'center', flexDirection: 'column'}}>
                    <div className='group'>
                    <label htmlFor="email">Email</label>
                    <input className="inpu" type="email" id="email" name="email" onChange={(e) => {setEmail(e.target.value)}} required/>
                    </div>
                    <div className='group'>
                    <label htmlFor="password">Password</label>
                    <input className="inpu" type="password" id="password" name="password" onChange={(e) => {setPassword(e.target.value)}} required/>
                    </div>
                    <center><button type='submit' onClick={(e)=>{handleSignin(e)}} className="signbut">Get In</button></center>
                </form>

            </div>
        </div>
        <div style={{textAlign:'center', marginTop: '2px', width: '100%', color: 'red'}}>
            Only authenticated persons can Log In! There is no Sign Up
        </div>
    </div>
    )
}