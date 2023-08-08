'use client';

import { useSchemaAtom } from '@/atoms';
import React, { useState } from 'react';

export const ConnectionForm = () => {
  // Set this to your Supabase Credentials if you want to test it out
  const [url, setUrl] = useState('');
  const [anon, setAnon] = useState('');
  const [error, setError] = useState('');
  
  const {schema, setSchema} = useSchemaAtom();
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    if (!url || !anon) {
      setError('URL and API key are required.');
      return;
    }

    fetchData(url, anon);
  };

  const fetchData = async (url: string, anon: string) => {
    try {
      const response = await fetch(`${url}/rest/v1/`, {
        headers: {
          apikey: anon,
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Error with fetching data');
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || contentType.indexOf('application/openapi+json') === -1) {
        throw new Error('Invalid link');
      }

      const data = await response.json();
      console.log(data);
      setSchema(data);
      return data;
    } catch (error: any) {
      setError(error.message || 'An error occurred.');
    }
  };

  
  const handlePost = async () => {
    setError('');

    if (!url || !anon) {
      setError('URL and API key are required.');
      return;
    }

    // Fetch data
    const data = await fetchData(url, anon);
    
    // Post data
    postData(url, anon, data);
  };
  
  const postData = async (url: string, anon: string, data: object) => {
    try {
      const response = await fetch(`${url}/rest/v1/user?select=id`, {
        headers: {
          apikey: anon,
          'Content-Type': 'application/json'
        },
      });
      if (!response.ok) {
        throw new Error('Error with fetching data');
      }
      
      const data = await response.json();
      console.log(data);
    } catch (error: any) {
      setError(error.message || 'An error occurred.');
    }

  };

  
  return (
    <>
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
        <button type="submit">Connect!</button>
      </form>
      
      <button onClick={handlePost}>
        Post Data
      </button>
    </>
  );
};
