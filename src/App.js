import { useState } from 'react';
import { useEffect } from 'react';

function App() {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [buttonText, setButtonText] = useState('Start');


  useEffect(() => {
    let interval = null;
    if (running) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [running]);

  const toggleStopwatch = () => {
    if (running) {
      setRunning(false);
      setButtonText('Start');
    } else {
      setRunning(true);
      setButtonText('Stop');
    }
  };
  const resetStopwatch = () => {
    setTime(0);
    setRunning(false);
    setButtonText('Start');
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}:${String(milliseconds).padStart(2, '0')}`;
  };

  return (
    <>
   
    <div className="flex flex-col items-center justify-center h-screen text-white bg-gradient-to-r from-color1 via-color2 to-color3">
    <h1 className='text-white text-center position absolute top-10 text-6xl md:text-7xl'>STOPWATCH</h1>
      <div className="text-6xl mb-8 font-sans">{formatTime(time)}</div>
      <div className="flex gap-4">
        <button
          className={`bg-green-500 font-sans transition duration-300 hover:bg-green-600 text-white py-2 px-5 rounded ${running ? 'bg-red-500 hover:bg-red-600' : ''}`}
          onClick={toggleStopwatch}
        >
          {buttonText}
        </button>
        <button
          className="bg-blue-500 font-sans transition duration-300 hover:bg-blue-600 text-white py-2 px-5 rounded"
          onClick={resetStopwatch}
        >
          Reset
        </button>
      </div>
    </div>
    </>
  );
}

export default App;
