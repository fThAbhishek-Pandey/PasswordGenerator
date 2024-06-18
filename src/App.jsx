import { useState ,useCallback, useEffect,useRef} from 'react'


import './App.css'

function App() {
  const [length, setlength] = useState(8)
  const [numAllow,setNumAllow] = useState(false);
  const [CharAllow,setCharAllow] = useState(false);
  const [Password, setPassword] = useState("");
  // useRef hook
  const passwordRef = useRef(null);
  const PasswordGenerater = useCallback(()=>{
    let pass ="";
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(numAllow) str += "0123456789";
    if(CharAllow) str += "!@#$%^&*()";
    for (let i=1 ;i<= length;i++){
        let char = Math.floor(Math.random()*str.length +1);
        pass += str.charAt(char);
    }
    setPassword(pass);
  } ,[length,numAllow,CharAllow, setPassword]);
const copyPasswordToclipBoard = useCallback (()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(Password);
}, [Password]);
  // PasswordGenerater();
  useEffect(()=>{
    PasswordGenerater();
  },[length,numAllow,CharAllow,PasswordGenerater]);
  
  return (
    <>
      <h1>Password Generater</h1>
      <div className=' w-full max-w-96 mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-500 p-16'>
          <div className='flex'>
          <input type="text" value={Password}
              className='outline-none w-full py-1 px-3'
              placeholder='password'
              readOnly
              ref={passwordRef}
          />
          <button className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0'
          onClick={copyPasswordToclipBoard}>Copy</button>
          </div>
          <div className='flex text-sm gap-x-2'>
            <div className='flex items-center gap-x-1'>
              <input type="range"
               min={6}
               max={100}
               value={length}
               className='cursor-pointer'
               onChange={(e)=>{setlength(e.target.value)}}
                />
                <label htmlFor="">length : {length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input 
                   type="checkbox"
                    defaultChecked ={numAllow}
                    id="numberIP"
                    onChange={()=>{
                      setNumAllow((prev)=> !prev);

                    }}
                  />
                  <label htmlFor="">Number</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input 
                   type="checkbox"
                    defaultChecked ={CharAllow}
                    id="charIP"
                    onChange={()=>{
                      setNumAllow((prev)=> !prev);

                    }}
                  />
                  <label htmlFor="characterInput">Character</label>
            </div>
          </div>
      </div>

    </>
  )
}

export default App
