'use client';

import { atom, useAtom } from 'jotai';
import { useEffect } from 'react';

const schemaAtom = atom(null);

export const useSchemaAtom = () => {
  const [schema, setSchema] = useAtom(schemaAtom);

  return {
    schema,
    setSchema,
  };
};

const resultAtom = atom<{ [key: string]: any }>({});
const isLoadedAtom = atom(false);
const formattedHeadersAtom = atom<string[]>([]);
const formattedRowsAtom = atom<{ [x: string]: {}; }[]>([]);

export const useResultAtom = () => {
  const [isGenerating, setIsGenerating] = useAtom(isLoadedAtom);
  const [result, setResult] = useAtom(resultAtom);
  const [formattedHeaders, setFormattedHeaders] = useAtom(formattedHeadersAtom);
  const [formattedRows, setFormattedRows] = useAtom(formattedRowsAtom);
  
  useEffect(() => {
    if (result && result.length > 0) {
      // get headers as ["id", "created_at", "title", "content", "user_id", "view_count"]
      const headers = Object.keys(result[0]);
      // set formattedHeaders as ["id", "created_at", "title", "content", "user_id", "view_count"]
      setFormattedHeaders(headers as any);
      // set formattedRows as [["1", "2021-08-18T14:00:00.000Z", "Hello World", "This is my first post.", "1", "0"]]
      setFormattedRows(result as any);
    }
  }, [result]);
        
  return {
    result,
    setResult,
    formattedHeaders,
    setFormattedHeaders,
    formattedRows,
    setFormattedRows,
    isGenerating,
    setIsGenerating,
  };
};


const urlAtom = atom('');
const anonAtom = atom('');

export const useConnectionAtom = () => {
  const [url, setUrl] = useAtom(urlAtom);
  const [anon, setAnon] = useAtom(anonAtom);
  
  return {
    url,
    setUrl,
    anon,
    setAnon,
  };
};

type Form = {
  table: string | null;
  number: number;
};
const formAtom = atom<Form>({
  table: null,
  number: 0,
});

export const useFormAtom = () => {
  const [form, setForm] = useAtom(formAtom);
  
  return {
    form,
    setForm,
  };
};


const openAIAtom = atom('');

export const useOpenAIAtom = () => {
  const [openAIAPIToken, setOpenAIAPIToken] = useAtom(openAIAtom);

  return {
    openAIAPIToken,
    setOpenAIAPIToken,
  };
};