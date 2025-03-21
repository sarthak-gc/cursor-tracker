import { useEffect, useState } from "react";

const Login = ({ submit }) => {
  const [username, setUsername] = useState("");
  useEffect(() => {
    if (username.trim()) {
      console.log(username.trim());
    }
  }, [username]);
  return (
    <div className="bg-black w-full h-screen">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          submit(username);
        }}
      >
        <div className="flex  items-center  gap-12 mb-4 ">
          <h1 className="text-center text-4xl font-semibold text-white ">
            Enter your name :
          </h1>

          <input
            onChange={(e) => {
              if (e.target.value.trim()) setUsername(e.target.value.trim());
            }}
            type="text"
            placeholder="Enter your name..."
            className="px-5 oy-3 w-64 outline-none border-2 border-gray-500 text-white font-bold  text-2xl h-12"
          />
        </div>

        <button className="py-2 bg-amber-600 px-8 text-white text-2xl">
          Next
        </button>
      </form>
    </div>
  );
};

export default Login;
