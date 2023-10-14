const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const { MongoClient } = require('mongodb')
const {isInvalidEmail, isEmptyPayload} = require('./validator')

const { DB_USER, DB_PASS, DEV } = process.env
const dbAdress = '127.0.0.1:27017'
const url = DEV ? `mongodb://${dbAdress}` : `mongodb://${DB_USER}:${DB_PASS}@${dbAdress}?authSource=company_db`

const client= new MongoClient(url)

const dbName = 'company_db'
const collName = 'employees'

app.use(bodyParser.json())
app.use('/', express.static(__dirname + '/dist'))

app.get('/get-profile', async function(req,res){

    //connect db
    await client.connect()
    console.log('Connected successfully to server')
    
    //initiate or get the db & collection
    const db = client.db(dbName)
    const collection = db.collection(collName)

    //get data from db
    const result = await collection.findOne({id:1})
    console.log(result)
    client.close()

    response = {} // not const, response is changing

    if (result !== null) {
        response = {
            name: result.name,
            email: result.email,
            interests: result.interests
        }
    }
    
    res.send(response)
}) //get data from database

// connect to mongodb database and save payload data to the database

app.post('/update-profile', async function(req, res){
    const payload = req.body
    console.log(payload)

    if ( isEmptyPayload(payload)|| isInvalidEmail(payload)) {
        res.status(400).send({error: "Invalid payload. Could not update user profile data"})
    }
    else {

        //connect to db
        await client.connect()
        console.log('Connected successfully to server')
        
        //initiate or get the db & collection
        const db = client.db(dbName)
        const collection = db.collection(collName)
        
        //saving payload into database
        payload ['id'] = 1;
        const updatedValues = { $set: payload};
        await collection.updateOne({id: 1}, updatedValues, {upsert: true});
        client.close()

        res.status(200).send({info: "User profile data updated successfully"}) }
        /// so as to comment on res.send ({needed})
    
})



const server = app.listen(3001, function (){
    console.log("App listening to port 3001")
})

module.exports = { 
    app, 
    server 
}