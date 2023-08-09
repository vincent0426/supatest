'use client';


import { FormEventHandler, useEffect, useState } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useSchemaAtom } from '@/atoms';

export function SelectTable({ table, setTable }: any) {
  const { schema }: any = useSchemaAtom();
  const [definitions, setDefinitions] = useState(null);
  
  useEffect(() => {
    if (!schema) {
      return;
    }
    
    const definitions = schema.definitions;
    setDefinitions(definitions);
  }, [schema]);
  
  return (
    <Select onValueChange={setTable}>
      <SelectTrigger disabled={!definitions}>
        <SelectValue placeholder={definitions ? 'Select a table' : 'Please connect to Supabase first'}/>
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {definitions && Object.keys(definitions).map((key: string) => (
            <SelectItem key={key} value={key}>
              {key}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}