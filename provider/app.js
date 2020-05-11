const express=require('express');
const cors=require('cors');
const mysql=require('mysql');
const fs=require('fs');

const app=express();
app.use(cors());
app.use(express.json());

let credentials=JSON.parse(fs.readFileSync('credentials.json','utf8'));
let connection=mysql.createConnection(credentials);
connection.connect();

function rowToObject(row){
    return{
        information:row.information,
    };
}

app.get('/message/:pass',(request, response) =>{
    const query='SELECT information FROM data WHERE is_deleted = 0 AND pass = ? ORDER BY updated_at DESC';
    const params=[request.params.pass];
    connection.query(query,params,(error,rows)=>{
        if(error){
            console.log(`SELECT ERROR: ${error.message}`);
        }
         else{
             response.send({
                 message:rows.map(rowToObject),
	           });
         }
    });
});


app.post('/message',(request,response)=>{
    const query='INSERT INTO data(pass,information,will_deleted) VALUES (?,?,?)';
    const params=[request.body.pass,request.body.information,request.body.will_deleted];
    connection.query(query,params,(error,result)=>{
        if(error){
            console.log(`INSERT ERROR: ${error.message}`);
        }
        else{
             response.send({id:result.insertId,});
         }
    });
});

app.patch('/message/:pass', (request,response)=>{
    const query ='UPDATE data SET information=?,updated_at = CURRENT_TIMESTAMP WHERE pass =?';
    const params = [request.body.information,request.params.pass];
    connection.query(query, params, (error, result)=>{
        if(error){
            console.log(`UPDATE ERROR: ${error.message}`);
        }
        else{
             response.send({ok:true,});
         }
    });
});

app.delete('/message/:pass',(request,response)=>{
    const query ='UPDATE data SET id_deleted = 1,updated_at = CURRENT_TIMESTAMP WHERE pass =?';
    const params=[request.params.pass];
    connection.query(query,params,(error,result)=>{
        if(error){
            console.log(`DELETE ERROR: ${error.message}`);
        }
        else{
             response.send({ok:true});
         }
    });
});

const port=41000;
app.listen(port,()=>{
   console.log(`Live on port ${port}`);
});
