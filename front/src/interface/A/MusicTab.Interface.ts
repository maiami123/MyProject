export interface TableData {
  sql_no:number
  create_date: string
  song: string
  singer: string
  tag: string
  status:number
}

export const TableDataInit:TableData= {
  sql_no:0,
  create_date: '',
  song: '',
  singer: '',
  tag: '',
  status:0
}
export interface Tag {
  sql_no:number
  group: string
  num: string
  value: string
}

export const tagInit:Tag= {
  sql_no:0,
  group: '',
  num: '',
  value: ''
}

export interface BaseData{
  inputValue:string
  userSqlNo?:number
}

export const baseDataInit:BaseData= {
  inputValue:'',
  userSqlNo:0
}
