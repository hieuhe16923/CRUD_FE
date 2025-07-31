import React, { useState, useRef, useEffect } from 'react';

const Stopwatch = () => {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  const startHandler = () => {
    if (!isRunning) {
      setIsRunning(true);
      timerIdRef.current = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    }
  };

  const stopHandler = () => {
    if (timerIdRef.current) {
      clearInterval(timerIdRef.current);
      timerIdRef.current = null;
    }
    setIsRunning(false);
  };

  const resetHandler = () => {
    stopHandler(); // stop the timer
    setSeconds(0); // reset the counter
  };

  useEffect(() => {
    return () => {
      // Cleanup on component unmount
      if (timerIdRef.current) {
        clearInterval(timerIdRef.current);
      }
    };
  }, []);

  return (
    <div className="p-4 max-w-sm mx-auto text-center bg-gray-100 rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Stopwatch</h1>
      <div className="text-4xl mb-4">{seconds}s</div>
      <div className="space-x-2">
        <button
          onClick={startHandler}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Start
        </button>
        <button
          onClick={stopHandler}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Stop
        </button>
        <button
          onClick={resetHandler}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Stopwatch;
