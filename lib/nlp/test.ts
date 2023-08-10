import { convert_schema, generate_random_data } from './core';
import { table_data, db_datatype, supbase_table_data } from './model';
import { pipeline } from '@xenova/transformers';


(async () => {
  /** 
  const table_1: table_data = {
    table_name: 'message', columns: [
      { column_name: 'sender', column_description: '', column_datatype: db_datatype.username },
      { column_name: 'reciever', column_description: '', column_datatype: db_datatype.username },
      { column_name: 'timestamp', column_description: '', column_datatype: db_datatype.timestamp },
      { column_name: 'message_content', column_description: 'this is the column for storing a single message content between two users', column_datatype: db_datatype.string }
    ], table_description: 'This is a table for single message information'
  };
  const result_1 = await generate_random_data(table_1, 1);
  console.log(result_1);
  const table_2: table_data = {
    table_name: 'user', columns: [
      { column_name: 'user', column_description: '', column_datatype: db_datatype.username },
      { column_name: 'bio', column_description: 'this is the column for user to introduce themself', column_datatype: db_datatype.string }
    ], table_description: 'This is a table for user information'
  };
  const result_2 = await generate_random_data(table_2, 2);
  console.log(result_2);
  */
  let classifier = await pipeline('sentiment-analysis');
})();