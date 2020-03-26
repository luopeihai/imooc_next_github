import React, { useState, useEffect, useReducer } from "react";

function countReducer(state, action) {
  switch (action.type) {
    case "add":
      return state + 1;
    case "minus":
      return state - 1;
    default:
      return state;
  }
}

function MyCountFunc() {
  //set方式
  //   const [count, setCount] = useState(0); //[a,b]
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setCount(c => c + 1);
  //     }, 1000);
  //     //清楚倒计时
  //     return () => clearInterval(interval);
  //   }, []);

  //reducer方式
  const [count, dispatchCount] = useReducer(countReducer, 0);
  useEffect(() => {
    const interval = setInterval(() => {
      dispatchCount({ type: "add" });
    }, 1000);
    //清楚倒计时
    return () => clearInterval(interval);
  }, []);

  return <span>{count}</span>;
}

export default MyCountFunc;
