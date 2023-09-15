import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [loading, setLoading] = useState(true);
  const [neurons, setNeurons] = useState([]);
  const [activeNeuron, setActiveNeuron] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      setNeurons(Array.from({ length: 5 }, (_, index) => ({
        id: index + 1,
        color: getRandomColor(),
        x: Math.random() * (window.innerWidth - 100) + 50,
        y: Math.random() * (window.innerHeight - 200) + 100,
      })));
    }, 2000);
  }, []);

  const handleNeuronClick = (neuronId) => {
    setActiveNeuron(neuronId);
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="App">
      {loading && <div className="preloader"></div>}
      {!loading && (
        <>
          <svg className="lines">
            {neurons.map((neuron) => (
              <line
                key={neuron.id}
                x1={neuron.x}
                y1={neuron.y}
                x2={window.innerWidth / 2}
                y2={window.innerHeight / 2}
                style={{ stroke: neuron.color }}
              />
            ))}
          </svg>
          <div className="neurons">
            {neurons.map((neuron) => (
              <div
                className={`neuron ${activeNeuron === neuron.id ? 'glow' : ''}`}
                key={neuron.id}
                style={{
                  backgroundColor: neuron.color,
                  transform: `translate(${neuron.x}px, ${neuron.y}px)`,
                }}
                onClick={() => handleNeuronClick(neuron.id)}
              ></div>
            ))}
          </div>
          <div className="content">
            <h1>Portfolio Website</h1>
            <p>Click on a neuron to view more information about me.</p>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
