export enum db_datatype {
    number = 'number', string = 'normal string', timestamp = 'timestamp', uuid = 'uuid', username = 'username', email = 'email', country = 'country', city = 'city', street = 'street'
};

export interface table_data {
    table_name: string,
    table_description: string,
    columns: Array<column_data>
}

export interface column_data {
    column_name: string,
    column_description: string,
    column_datatype: db_datatype
}

export interface supabase_column_data {
    format: string, // db type
    type: string, // client js type
    default?: string,
    description?: string
}

export interface supbase_table_data {
    properties: {
        [propName: string]: supabase_column_data;
    }
    required: Array<string>
}