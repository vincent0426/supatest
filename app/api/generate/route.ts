import { convert_schema, generate_random_data } from '@/lib/nlp/core';
import { supbase_table_data } from '@/lib/nlp/model';
import { NextResponse } from 'next/server';

export async function POST(req: any) {
  const body = await req.json();
  console.log('body', body);
  // const supabase_table_name = 'posts';
  // const supabase_table_data: supbase_table_data = {
  //   required: [
  //     'id',
  //     'created_at',
  //     'title',
  //     'content',
  //     'user_id'
  //   ],
  //   properties: {
  //     id: {
  //       default: 'gen_random_uuid()',
  //       description: 'Note:\nThis is a Primary Key.<pk/>',
  //       format: 'uuid',
  //       type: 'string'
  //     },
  //     created_at: {
  //       default: 'now()',
  //       format: 'timestamp with time zone',
  //       type: 'string'
  //     },
  //     title: {
  //       format: 'text',
  //       type: 'string'
  //     },
  //     content: {
  //       format: 'text',
  //       type: 'string'
  //     },
  //     user_id: {
  //       description: 'Note:\nThis is a Foreign Key to `users.id`.<fk table=\'users\' column=\'id\'/>',
  //       format: 'uuid',
  //       type: 'string'
  //     },
  //     view_count: {
  //       format: 'bigint',
  //       type: 'integer'
  //     }
  //   }
  // };
  // const table_data = await convert_schema(supabase_table_name, supabase_table_data);
  // const result = await generate_random_data(table_data, 3);
  return NextResponse.json({ result: 'ok' });
}