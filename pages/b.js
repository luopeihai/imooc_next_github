import React, { useState, useEffect } from "react";

function MyCountFunc() {
  const [count, setCount] = useState(0); //[a,b]
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(c => c + 1);
    }, 1000);
    //清楚倒计时
    return () => clearInterval(interval);
  }, []);
  return <span>{count}</span>;
}
export default MyCountFunc;
