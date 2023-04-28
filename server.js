const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient;
const PORT = 3000;
const cors = require('cors')
app.use(cors())
require('dotenv').config()

let db,
    dbConnectionSrt = "mongodb+srv://letrongdu:chudu@cluster0.spxu9rj.mongodb.net/?retryWrites=true&w=majority",
    dbName = 'todo'

MongoClient.connect(dbConnectionSrt, { useUnifiedTopology: true })
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', async (request, response)=>{
    // const todoItems = await db.collection('todos').find().toArray()
    // const itemsLeft = await db.collection('todos').countDocuments({completed: false})
    // response.render('index.ejs', { items: todoItems, left: itemsLeft })
    db.collection('todos').find().toArray()
    .then(data => {
        db.collection('todos').countDocuments({completed: false})
        .then(itemsLeft => {
            response.render('index.ejs', { items: data, left: itemsLeft })
        })
    })
    .catch(error => console.error(error))

})

app.post('/addTodo', (request,response) => {
    db.collection('todos').insertOne({thing: request.body.todoItem, completed: false})
    .then(result => {
        console.log('thing added successfully'),
        response.redirect('/')
    })
    .catch(err => console.log(err))
})

app.put('/completeItem', (request, response) => {
    db.collection('todos').findOneAndUpdate({
        thing : request.body.itemFromJS},
        {
        $set:{completed : true}
        },
        {
        upsert: true
        })
    .then(result => {
        console.log('thing updated');
        response.json('thing updated')   
    })
    .catch(err => console.log(err))
})

app.put('/unmark', (request, response) => {
    db.collection('todos').findOneAndUpdate({
        thing : request.body.itemFromJS},
        {
        $set:{completed : false}
        },
        {
            sort: {_id: -1},
            upsert: false
        })
    .then(result => {
        console.log('unmarked');
        response.json('unmarked')   
    })
    .catch(err => console.log(err))
})

app.delete('/deleteItem', (request, response) => {
    db.collection('todos').deleteOne({thing : request.body.itemFromJS})
    .then(result => {
        console.log('thing deleted');
        response.json('thing deleted')   
    })
    .catch(err => console.log(err))
})

app.listen(process.env.PORT || PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})    