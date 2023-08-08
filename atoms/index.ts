'use client';

import { atom, useAtom } from 'jotai';

const schemaAtom = atom(null);

export const useSchemaAtom = () => {
  const [schema, setSchema] = useAtom(schemaAtom);

  return {
    schema,
    setSchema,
  };
};