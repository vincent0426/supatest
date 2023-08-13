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
import { useFormAtom, useOpenAIAtom, useResultAtom, useSchemaAtom } from '@/atoms';
import { convert_schema, generate_random_data } from '@/lib/nlp/core';
import { Pipeline, pipeline } from '@xenova/transformers';
import { toast } from 'sonner';
type Form = {
  table: string | null;
  number: number;
};


import { useRouter } from 'next/navigation';

export function GenerateForm() {
  const router = useRouter();
  const { schema } = useSchemaAtom();
  const { setResult, setIsGenerating } = useResultAtom();
  const { form, setForm } = useFormAtom();
  const { openAIAPIToken } = useOpenAIAtom();
  // Create a reference to the worker object.
  const classifier: MutableRefObject<Pipeline | null> = useRef(null);
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
  useEffect(() => {
    const build_classifier = async () => {
      if (!classifier.current) {
        classifier.current = await pipeline('zero-shot-classification', 'Xenova/mobilebert-uncased-mnli');
      }
    };
    build_classifier();
  });

  const handleGenerate = async () => {
    setIsGenerating(true);

    // Check prerequisites
    if (!schema || !form.table || !classifier.current) {
      setIsGenerating(false);
      toast.error('Prerequisites not met!'); 
      return;
    }

    // Wrap your actual operations inside a promise to handle both of them
    const mainOperations = async () => {
      const internal_table_schema = await convert_schema(form.table!, schema['definitions'][form.table as string], classifier.current!);
      const result = await generate_random_data(internal_table_schema, form.number, openAIAPIToken);
      setResult(result);
    };

    // Toast based on the real operations
    toast.promise(mainOperations(), {
      loading: 'Generating...',
      success: 'Generated successfully',
      error: 'Error generating data',
    });

    setIsGenerating(false);
  };


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
        <Button variant="outline" onClick={() => router.push('/')}>Cancel</Button>
        <Button onClick={handleGenerate}>Generate</Button>
      </CardFooter>
    </Card>
  );
}
