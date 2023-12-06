import { useCallback, useEffect, useRef, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [length,setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] =useState(false);
  const [charAllowed,setcharAllowed] = useState(false);
  const [password,setPassword] = useState("");
  
  //useRef Hook
  let passwordRef = useRef(null);

  const passwordGenerator = useCallback(()=>{
  let pass = "";
  let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  
  if(numberAllowed)  str += "0123456789";
  if(charAllowed)     str +="#%$!@^&*()~`";
     
    for(let i= 1 ; i<= length ; i++){
           let char = Math.floor(Math.random() * str.length +1);
           pass += str.charAt(char);

    }
    setPassword(pass);
    
  },[length,numberAllowed,charAllowed,setPassword]);

   const copyPasswordToClipBoard = useCallback(()=>{
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0,4);
    window.navigator.clipboard.writeText(password);
   },[password])

  useEffect(()=>{
           passwordGenerator();
  },[length,numberAllowed,charAllowed,passwordGenerator]);

  return (
    <>
       <div className='w-full  text-red-400 bg-gray-700 mx-auto px-4 my-8 rounded-xl shadow-lg max-w-md '>
        <h1 className='text-center  text-white my-3'>Password Generator</h1>
        <div className='flex shadow-lg mb-4 overflow-hedden'>
          <input type="text" value={password} className='outline-none w-full py-1 px-4 ' placeholder='password' readOnly ref={passwordRef}/>
          <button className='bg-cyan-500 rounded-sm outline-none px-3 py-0.5 shrink-0' onClick={copyPasswordToClipBoard}>copy</button>
        </div>
        <div className='flex gap-x-2 text-sm'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={6} max={100} value={length} className='cursor-pointer' onChange={(e)=>{setLength(e.target.value)}} />
            <label>Length : {length}</label>
          </div>
          <div className='flex gap-x-2 text-sm'>
            <input type="checkbox" defaultChecked={numberAllowed} id="numberInput" onChange={()=>{
              setNumberAllowed((prev)=>{!prev})
            }} />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div className='flex gap-x-2 text-sm'>
            <input type="checkbox" id='characterInput' defaultChecked={charAllowed} onChange={()=>{setcharAllowed( (prev) => !prev)}} />
          </div>
          <label htmlFor="characterInput">Characters</label>
        </div>
       </div>
    </>
  )
}

export default App
