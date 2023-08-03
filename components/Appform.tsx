'use client';

import React, { useState } from 'react';

const ApiForm = () => {
  const [url, setUrl] = useState('');
  const [anon, setAnon] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!url || !anon) {
      setError('URL and API key are required.');
      return;
    }

    fetchData(url, anon);
  };

  const fetchData = (url: string, anon: string) => {
    fetch(`${url}/rest/v1/?apikey=${anon}`)
      .then(async (res) => {
        if (res.ok) {
          // Handle successful response
          const contentType = res.headers.get('content-type');
          if (contentType && contentType.indexOf('application/openapi+json') !== -1) {
            res.json().then((data) => {
              console.log(data)
              // Process the data from the response
              // ...
            });
          } else {
            res.text().then((text) => {
              setError('Invalid link');
            });
          }
        } else {
          setError('Error with fetching data');
        }
      })
      .catch((e) => {
        setError(e.message || 'An error occurred.');
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          URL:
          <input className="text-blue-500" type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          API Key:
          <input className="text-blue-500" type="text" value={anon} onChange={(e) => setAnon(e.target.value)} />
        </label>
      </div>
      {error && <div>{error}</div>}
      <button type="submit">Fetch Data</button>
    </form>
  );
};

export default ApiForm;
