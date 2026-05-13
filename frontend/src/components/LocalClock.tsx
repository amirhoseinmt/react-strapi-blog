import { useEffect, useState } from "react";

const LocalClock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return <span>{time.toLocaleDateString()}</span>;
};

export default LocalClock;
