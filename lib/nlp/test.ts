import { generate_random_data } from './core';
import { table_data, db_datatype } from './model';


(async () => {
  const table: table_data = {
    table_name: 'user', columns: [
      { column_name: 'sender', column_description: '', column_datatype: db_datatype.username },
      { column_name: 'reciever', column_description: '', column_datatype: db_datatype.username },
      { column_name: 'timestamp', column_description: '', column_datatype: db_datatype.timestamp },
      { column_name: 'message_content', column_description: 'this is the column for storing message content between two users', column_datatype: db_datatype.string }
    ], table_description: 'This is a table for message information'
  };
  const result = await generate_random_data(table, 'This is a table for message information', 1);
  console.log(result);
})();