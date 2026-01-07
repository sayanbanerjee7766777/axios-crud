import React from "react";
import Posts from "./component/Posts";

const App = () => {
  return (
    <div>
      <h1 className="font-semibold text-center text-2xl m-2 underline text-amber-700">
        Crud Axios
      </h1>

      <Posts/>
    </div>
  );
};

export default App;
