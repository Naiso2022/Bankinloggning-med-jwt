import "./App.css";
import Login from "./components/Login";
import Register from "./components/register";

function App() {


  return (
    <div>
      <div>
        <Register />
      </div>
      <div className="mt-32">
        <Login />
      </div>
    </div>
  );
}

export default App;
