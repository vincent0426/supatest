import { convert_schema } from '../../lib/nlp/core';
import { supbase_table_data } from '../../lib/nlp/model';
export default async function handler(req: any, res: any) {
  const supabase_table_name = 'posts';
  const supabase_table_data: supbase_table_data = {
    required: [
      'id',
      'created_at',
      'title',
      'content',
      'user_id'
    ],
    properties: {
      id: {
        default: 'gen_random_uuid()',
        description: 'Note:\nThis is a Primary Key.<pk/>',
        format: 'uuid',
        type: 'string'
      },
      created_at: {
        default: 'now()',
        format: 'timestamp with time zone',
        type: 'string'
      },
      title: {
        format: 'text',
        type: 'string'
      },
      content: {
        format: 'text',
        type: 'string'
      },
      user_id: {
        description: 'Note:\nThis is a Foreign Key to `users.id`.<fk table=\'users\' column=\'id\'/>',
        format: 'uuid',
        type: 'string'
      },
      view_count: {
        format: 'bigint',
        type: 'integer'
      }
    }
  };
  console.log(await convert_schema(supabase_table_name, supabase_table_data));
  res.status(200).json({ name: 'John Doe' });
}