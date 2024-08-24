import { useState, useEffect } from 'react';
import './App.css';
import useThrottle from './hooks/useThrottle';

function App() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  const handleResize = () => {
    console.log("handle resize");
    setWindowSize({width: window.innerWidth, height: window.innerHeight})

    // any expensive operation or API call     -- it will run everytime ...so throttle it.

  }

  const throttledHandleSize = useThrottle(handleResize, 1000);


  useEffect(() => {
        
    window.addEventListener("resize", throttledHandleSize);
  
    return () => {
      window.removeEventListener("resize", throttledHandleSize);
    }
    
  }, [throttledHandleSize])

  return (
    <div className="App">
      <h1>Throttle App</h1>
      
      <p> Size - {windowSize.width}x{windowSize.height}</p>

    </div>
  );
}

export default App;
