import { useState } from "react";

let myToken;

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [money, setMoney] = useState("");
  const [open, setOpen] = useState(false)

  function handleLogin() {
    const user = {
      username,
      password,
    };

    console.log(user);

    const userString = JSON.stringify(user);

    console.log(userString);

    fetch("http://localhost:4006/sessions", {
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: userString,
    })
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log(data);
        myToken = data.token;
      });
  }

  function handleGetAccount() {
    fetch("http://localhost:4006/me/accounts", {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + myToken,
      },
    })
      .then((res) => {
        console.log("ACCOUNTS GOT", res);
        return res.json();
      })
      .then((data) => {
        setMoney(data.money);
      });

      setOpen(!open)
  }

  return (
    <div>
      <div>
        <h2 className="flex justify-start text-4xl mb-10">Log in</h2>
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
        <button onClick={handleLogin} className="ml-10 border-black">Login</button>
        <div className="flex mt-10 items-center">
          <button onClick={handleGetAccount} className="border-black mr-10"> Show saldo</button>
          <div className="text-3xl">
            {open && <div className="bg-green-300 p-2">Saldo: {money}</div>}
      
        </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
