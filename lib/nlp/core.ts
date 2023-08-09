import { Configuration, OpenAIApi } from 'openai';
import { db_datatype, table_data } from './model';
import { faker, fakerSK } from '@faker-js/faker';
import 'dotenv/config';



const model_name = 'gpt-3.5-turbo';

export const connection_test = async () => {
  try {
    const configuration = new Configuration({
      apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const chatCompletion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Hello world' }],
    });
    return true;
  } catch (e) {
    console.log(`Encounter error when connecting to OpenAI's API, ${e}`);
    return false;
  }
};

export const generate_random_data = async (table: table_data, request_count = 1) => {
  const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const result = [];
  for (let iteration = 0; iteration < request_count; iteration++) {
    /** 
    const chat = await openai.createChatCompletion({
      model: model_name,
      temperature: 1.7,
      messages: [{ role: 'user', content: 'Generate a example row in SQL with columns:name,age,email. return in JSON format without any other word'}]
    });
    
    const raw_row = chat.data.choices[0].message?.content as string;
    
    // validate
    const row = JSON.parse(raw_row);
    result.push(row);
    */
    const row = [];
    for (const column of table.columns) {
      if (column.column_datatype === db_datatype.username) {
        row.push(faker.person.fullName());
      }
      else if (column.column_datatype === db_datatype.email) {
        row.push(faker.internet.email());
      }
      else if (column.column_datatype === db_datatype.uuid) {
        row.push(faker.string.uuid());
      }
      else if (column.column_datatype === db_datatype.timestamp) {
        row.push(faker.date.anytime());
      }
      else if (column.column_datatype === db_datatype.country) {
        row.push(faker.location.country());
      }
      else if (column.column_datatype === db_datatype.city) {
        row.push(faker.location.city());
      }
      else if (column.column_datatype === db_datatype.street) {
        row.push(faker.location.street());
      }
      else {
        const chat = await openai.createChatCompletion({
          model: model_name,
          temperature: 1.7,
          messages: [{ role: 'user', content: `Generate a fake data whitch satisfy column name:${column.column_name}(${column.column_description}, the current row is :${JSON.stringify(row)},the table is about :${table.table_description} , make sure the data is beleavible and understandable by human ,return the raw result only without label.` }]
        });
        row.push(chat.data.choices[0].message?.content);
      }
    }
    result.push(row);
  }
  return result;

};
