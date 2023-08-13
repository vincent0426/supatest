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
import { Eye } from 'lucide-react';
import { useConnectionAtom, useOpenAIAtom, useSchemaAtom } from '@/atoms';
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '../ui/label';
import { toast } from 'sonner';

function ConnectionForm() {
  const { url, anon, setUrl, setAnon } = useConnectionAtom();
  const [hidden, setHidden] = useState(true);
  return (
    <div className="flex flex-col gap-4 text-muted-foreground">
      <div>
        <Label htmlFor="url" className="text-sm">
        Supabase URL
        </Label>
        <Input id="url" type="text" value={url} onChange={(e) => setUrl(e.target.value)} className='w-[430px]'/>
      </div>
      <div>
        <Label htmlFor="anon" className="text-sm">
          Supabase API Key
        </Label>
        <div className="flex items-center"> {/* Wrapping in a flex container */}
          <Input id="anon" type={`${hidden ? 'password' : 'text'}`} value={anon} onChange={(e) => setAnon(e.target.value)} />
          <button onClick={() => setHidden(!hidden)} className="ml-2"> {/* Toggle button */}
            <Eye /> 
          </button>
        </div>
      </div>
    </div>
  );
};



export function ConnectionButton() {
  const [open, setOpen] = useState(false);
  const [openAPIHidden, setOpenAPIHidden] = useState(true);
  // Set this to your Supabase Credentials if you want to test it out
  const { url, anon }  = useConnectionAtom();
  const { openAIAPIToken, setOpenAIAPIToken } = useOpenAIAtom();
  
  const {schema, setSchema} = useSchemaAtom();
  
  const handleConnect = () => {
    if (!url || !anon) {
      toast.error('Please enter a Supabase URL and API key.');
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
        console.log(response);
        toast.error('Invalid content type. Please check your URL and API key.');
        return;
      }

      const contentType = response.headers.get('content-type');
      if (!contentType || contentType.indexOf('application/openapi+json') === -1) {
        toast.error('Invalid content type. Please check your URL and API key.');
        return;
      }

      const data = await response.json();
      setSchema(data);
      toast.success('Connected to Supabase!');
    } catch (error: any) {
      console.log(error);
      toast.error('Something went wrong. Please check your URL and API key.');
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
          </AlertDialogDescription>
          <ConnectionForm />
          <AlertDialogDescription className='text-sm pt-2'>
            Open AI API Token
            <div className="flex items-center"> {/* Wrapping in a flex container */}
              <Input type={`${openAPIHidden ? 'password' : 'text'}`} value={openAIAPIToken} onChange={(e) => setOpenAIAPIToken(e.target.value)} />
              <button onClick={() => setOpenAPIHidden(!openAPIHidden)} className="ml-2"> {/* Toggle button */}
                <Eye />
              </button>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className='mr-8'>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleConnect}>Connect</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
