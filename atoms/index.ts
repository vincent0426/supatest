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
  console.log(isGenerating);
  const [result, setResult] = useAtom(resultAtom);
  const [formattedHeaders, setFormattedHeaders] = useAtom(formattedHeadersAtom);
  const [formattedRows, setFormattedRows] = useAtom(formattedRowsAtom);
  
  useEffect(() => {
    // result will be like [{
    //   "id": "1",
    //   "created_at": "2021-08-18T14:00:00.000Z",
    //   "title": "Hello World",
    //   "content": "This is my first post.",
    //   "user_id": "1",
    //   "view_count": "0"
    // }, {
    //   "id": "2",
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
    formattedRows,
    isGenerating,
    setIsGenerating,
  };
};

// useOpenAIAtom
const openAIAtom = atom('');

export const useOpenAIAtom = () => {
  const [openAIAPIToken, setOpenAIAPIToken] = useAtom(openAIAtom);

  return {
    openAIAPIToken,
    setOpenAIAPIToken,
  };
};