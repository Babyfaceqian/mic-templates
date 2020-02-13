import { getJSON, getFilePath, db } from '../helper';
import uuid from 'uuid/v4';
exports.example = async (ctx, next) => {
  let sql = 'select * from history.person_info'
  db.query(sql,[],(results, fields) => {
    console.log('results', results)
    console.log('fields', fields)
  })
  ctx.body = getJSON('example')
  return next;
}
