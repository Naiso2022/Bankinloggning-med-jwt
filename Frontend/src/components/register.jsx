import { useState } from "react";


const Register = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleRegister() {
    const user = {
      username,
      password,
    };

    const userString = JSON.stringify(user);

    fetch("http://localhost:4006/users", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: userString,
    }).then((res) => console.log(res, userString));
  }

    return ( 
        
                  <div>
        <h2 className="flex justify-start text-4xl mb-10">Register new account</h2>
        <label htmlFor="" className="text-2xl"> Username: </label>
        <input
          value={username}
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          className="bg-slate-300"
        />
        <label htmlFor="" className="text-2xl"> Password: </label>
        <input
          value={password}
          type="text"
          onChange={(e) => setPassword(e.target.value)}
          className="bg-slate-300"
        />
        <button onClick={handleRegister} className="ml-10 border-black">Register</button>
      </div>
        
     );
}
 
export default Register;