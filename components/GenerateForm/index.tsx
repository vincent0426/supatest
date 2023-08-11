'use client';

import { useEffect, useState, useRef, MutableRefObject } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { SelectTable } from '../SelectTable';
import { useSchemaAtom } from '@/atoms';
import { convert_schema, generate_random_data } from '@/lib/nlp/core';
type Form = {
  table: string | null;
  number: number;
};

export function GenerateForm() {
  const { schema } = useSchemaAtom();
  // Create a reference to the worker object.
  const worker: MutableRefObject<Worker | null> = useRef(null);
  // hit /api/nlp

  // useEffect(() => {
  //   fetch('/api/nlp', {
  //     method: 'POST',
  //     body: JSON.stringify({
  //       text: 'generate 10 rows for table users',
  //     }),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
  // }, []);

  const [form, setForm] = useState<Form>({
    table: null,
    number: 0,
  });
  const handleGenerate = async () => {
    if (!schema || !form.table) return;
    console.log(schema['definitions'][form.table as string]);
    console.log('running');
    const internal_table_schema = await convert_schema(form.table, schema['definitions'][form.table as string]);
    console.log(internal_table_schema);
    //user need to put openai api key here
    const result = await generate_random_data(internal_table_schema, form.number,'');
    console.log(result);
    /* 
    fetch('/api/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        table: form.table,
        number: form.number,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
      */
  };

  console.log(form);

  return (
    <Card className="w-1/2">
      <CardHeader>
        <CardTitle>Generate Data</CardTitle>
        <CardDescription>
          Automatically generate data for your tables
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-4">
          <SelectTable table={form.table} setTable={(table: string) => setForm({ ...form, table })} />
          <Input
            className="w-full p-2 rounded-md"
            type="number"
            value={form.number}
            onChange={(e) => setForm({ ...form, number: parseInt(e.target.value) })}
          />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleGenerate}>Generate</Button>
      </CardFooter>
    </Card>
  );
}
