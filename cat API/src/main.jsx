import React, { useState, useEffect } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

function App() {
  const [cats, setCats] = useState([]);
  const apiKey = 'live_nK5aqmweIfPz9c9UcnVGlyjqKhrpExOX2Fqq4UJJYfDzGn7t5NOc2RysUjVo9QDD'; 

  useEffect(() => {
    const fetchCats = async () => {
      try {
        const response = await fetch(`https://api.thecatapi.com/v1/images/search?limit=10`, {
          headers: {
            'x-api-key': apiKey,
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch cat images');
        }

        const data = await response.json();
        setCats(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCats();
  }, [apiKey]);

  return (
    <div>
      <h1>Cat Pictures</h1>
      {}
      {cats.length > 0 ? (
        <ul>
          {cats.map((cat) => (
            <li key={cat.id}>
              <img src={cat.url} alt="Cat" />
            </li>
          ))}
        </ul>
      ) : (
        <p>Loading cats...</p>
      )}
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);