'use client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';

import { useConnectionAtom, useOpenAIAtom, useSchemaAtom } from '@/atoms';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';

function ConnectionForm() {
  const { url, anon, setUrl, setAnon } = useConnectionAtom();
  return (
    <div className="flex flex-col gap-4 text-white">
      <Input type="text" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="URL" />
      <Input type="text" value={anon} onChange={(e) => setAnon(e.target.value)} placeholder="API Key" />
    </div>
  );
};


export function ConnectionButton() {
  const [open, setOpen] = useState(false);
  
  // Set this to your Supabase Credentials if you want to test it out
  const { url, anon }  = useConnectionAtom();
  const { openAIAPIToken, setOpenAIAPIToken } = useOpenAIAtom();
  
  const [error, setError] = useState('');
  
  const {schema, setSchema} = useSchemaAtom();
  
  const handleConnect = () => {
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
      setSchema(data);
      return data;
    } catch (error: any) {
      setError(error.message || 'An error occurred.');
    }
  };
  
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button>Connect</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Please Enter Your Connection Details</AlertDialogTitle>
          <AlertDialogDescription className='text-sm text-red-500'>
            This will not be saved anywhere.
            <ConnectionForm />
          </AlertDialogDescription>
          <AlertDialogDescription className='text-sm pt-2'>
            Your Open AI API Token
            <Input type="text" value={openAIAPIToken} onChange={(e) => setOpenAIAPIToken(e.target.value)} />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConnect}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
