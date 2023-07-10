const express = require('express');
var cors = require('cors')
const routerApi = require('./routes');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/',(req, res)=>{
    res.send('Hola mi server');
});

routerApi(app);

app.listen(port,()=>{
    console.log('mi port' + port)
})
