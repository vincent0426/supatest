import { Configuration, OpenAIApi } from 'openai';
import { db_datatype, table_data, supbase_table_data, column_data } from './model';
import { faker } from '@faker-js/faker';
import { Pipeline } from '@xenova/transformers';

const generation_model_name = 'gpt-3.5-turbo';
const classification_model_name = 'Xenova/mobilebert-uncased-mnli';

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
    return false;
  }
};

export const convert_schema = async (table_name: string, supabase_table: supbase_table_data, classifier: Pipeline) => {
  const table: table_data = { table_name: table_name, table_description: '', columns: [] };
  //const classifier = await pipeline('zero-shot-classification', classification_model_name);
  const labels = Object.values(db_datatype);
  for (const [column_name, column] of Object.entries(supabase_table.properties)) {
    const internal_column: column_data = { column_name: '', column_description: '', column_datatype: db_datatype.string };
    internal_column.column_name = column_name;
    internal_column.column_description = column.description || '';
    // known db datatype
    if (column.format === 'uuid') {
      internal_column.column_datatype = db_datatype.uuid;
    }
    else if (column.format === 'bigint') {
      internal_column.column_datatype = db_datatype.number;
    }
    else if (column.format === 'timestamp with time zone') {
      internal_column.column_datatype = db_datatype.timestamp;
    }
    else {

      const classification_result = await classifier(`${internal_column.column_name}(${internal_column.column_description}):${column.format}`, labels);
      internal_column.column_datatype = classification_result.labels[0];
      // need fix
      if (internal_column.column_datatype === db_datatype.uuid || internal_column.column_datatype === db_datatype.timestamp) {
        internal_column.column_datatype = db_datatype.string;
      }
    }
    table.columns.push(internal_column);
  }
  return table;
};

export const generate_random_data = async (table: table_data, request_count = 1, api_key: string) => {
  const configuration = new Configuration({
    apiKey: api_key,
  });
  delete configuration.baseOptions.headers['User-Agent'];
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
    const row: any = {};
    for (const column of table.columns) {
      let column_value = '';
      if (column.column_datatype === db_datatype.username) {
        column_value = faker.person.fullName();
      }
      else if (column.column_datatype === db_datatype.email) {
        column_value = faker.internet.email();
      }
      else if (column.column_datatype === db_datatype.uuid) {
        column_value = faker.string.uuid();
      }
      else if (column.column_datatype === db_datatype.timestamp) {
        column_value = faker.date.anytime().toISOString();
      }
      else if (column.column_datatype === db_datatype.country) {
        column_value = faker.location.country();
      }
      else if (column.column_datatype === db_datatype.city) {
        column_value = faker.location.city();
      }
      else if (column.column_datatype === db_datatype.street) {
        column_value = faker.location.street();
      }
      else {
        const chat = await openai.createChatCompletion({
          model: generation_model_name,
          messages: [{ role: 'system', content: `Generate a fake data whitch satisfy column name:${column.column_name}(${column.column_description}, the current row is :${JSON.stringify(row)},the table is about :${table.table_description} , make sure the data is beleavible and understandable by human ,return the raw result only without the JSON label and any other word or warning.` }]
        });
        column_value = chat.data.choices[0].message?.content || 'Chat-gpt errror';
      }
      row[column.column_name] = column_value;
    }
    result.push(row);
  }
  return result;

};
