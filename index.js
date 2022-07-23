const Joi = require('joi');
const express= require('express');
const app = express();

app.use(express.json());
const hates=[
    {id:1, name:'hypocrisy'},
    {id:2, name:'ignorance'},
    {id:3, name:'superiority'},
];

app.get('/',(req,res)=>{
    res.send('hello human being haha');
});

app.get('/api/shin',(req,res)=>{
    res.send(['poor','ignorant','conscious']);
});

//http://localhost:4000/api/shin/2017/5
//output year:2017 month:5
app.get('/api/shin/:year/:month',(req,res)=>{
    res.send(req.params);
});

app.get('/api/hates',(req,res)=>{
    res.send(hates);
});

//handling GET request
app.get('/api/hates/:id',(req,res)=>{
    const hate=hates.find(h=>h.id===parseInt(req.params.id));
    if (!hate) return res.status(404).send('not this hate');
    res.send(hate);
});

//handling POST request
////http://localhost:4000/api/hates
app.post('/api/hates',(req,res)=>{
    const{error}=validateHate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const hate ={
        id:hates.length+1,
        name: req.body.name
    };
    hates.push(hate);
    res.send(hate);
});

//handling PUT request
app.put('/api/hates/:id',(req,res)=>{
    //return 404 if no such hate
    const hate=hates.find(h=>h.id===parseInt(req.params.id));
    if (!hate) return res.status(404).send('not this hate');
    
    //return 400 if the hate is not valid
    const{error}=validateHate(req.body);
    if(error) return res.status(400).send(result.error.details[0].message);
    

    //send hate
    hate.name=req.body.name;
    res.send(hate);
});

function validateHate(hate){
    const schema = Joi.object({ name: Joi.string() .min(4) .required() });
    return schema.validate(hate);
}

//handling DELETE request
app.delete('/api/hates/:id',(req,res)=>{
    const hate=hates.find(h=>h.id===parseInt(req.params.id));
    if (!hate) return res.status(404).send('not this hate');

    const index=hates.indexOf(hates);
    hates.splice(index,1);

    res.send(hate);
});

const port=process.env.PORT||2000;
app.listen(port,()=>console.log(`listening on port ${port}...`));