import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [item, setItem] = useState('laptop');

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/analyze/${item}`)
      .then(res => setData(res.data));
  }, [item]);

  if (!data) return <h1>Loading...</h1>;

  const style = {
    border: data.isUrgent ? '3px solid red' : '1px solid gray',
    backgroundColor: data.isUrgent ? '#ffeaea' : 'white',
    padding: '30px',
    borderRadius: '20px',
    width: '400px',
    textAlign: 'center'
  };

  return (
    <div style={{padding:'50px'}}>

      <button onClick={() => setItem('laptop')}>
        Laptop
      </button>

      <button onClick={() => setItem('shirt')}>
        Shirt
      </button>

      <div style={style}>
        <h1>{data.name}</h1>
        <h2>${data.price}</h2>

        <p>{data.newsHeadline}</p>

        <p>
          Score: {data.sentimentScore}
        </p>

        <h3 style={{
          color: data.isUrgent ? 'red' : 'green'
        }}>
          {data.recommendation}
        </h3>

        <button>
          {data.isUrgent
            ? "SECURE STOCK NOW"
            : "ADD TO CART"}
        </button>
      </div>
    </div>
  );
}

export default App;