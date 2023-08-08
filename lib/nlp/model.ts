export enum db_datatype {
    number, string, timestamp, uuid, username, email, country, city, street
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