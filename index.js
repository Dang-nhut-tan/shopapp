/*
  Khởi tạo Sequelize
  npx sequelize-cli init

  Tạo model User
npx sequelize-cli model:generate \
--name User \
--attributes \
email:string,password:string,name:string,role:integer,avatar:string,phone:integer  Chạy migration
  npx sequelize-cli db:migrate

  Hoàn tác migration gần nhất
  npx sequelize-cli db:migrate:undo
 */

import express from 'express'
import dotenv from 'dotenv'
import { AppRoute } from './appRoutes.js';
dotenv.config();


const app = express();

app.use(express.json())
express.urlencoded({extended:true})

AppRoute(app)
app.get('/',(req,res)=>{
  res.send("hello world haha")
})

// nếu ko có env mặc định lấy port 3000
const port=process?.env?.PORT?? 3000;

app.listen(port,()=>
  {
    console.log("Đang lắng nghe ở ",port);
  })


