import { useState } from "react";
import Login from "./pages/Login";
import Home from "./pages/Home";

const App = () => {
  const [username, setUsername] = useState("");
  return username ? (
    <Home username={username} />
  ) : (
    <Login submit={setUsername} />
  );
};

export default App;
