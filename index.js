const express = require('express')
const app = express()
const port = 4000
const monk = require('monk')
const url = 'mongodb://User:Password@express-db-shard-00-00-k9wqh.mongodb.net:27017,express-db-shard-00-01-k9wqh.mongodb.net:27017,express-db-shard-00-02-k9wqh.mongodb.net:27017/PhoneBook-Back-End?ssl=true&replicaSet=Express-Db-shard-0&authSource=admin&retryWrites=true';
const db = monk(url);
const user = db.get('user')
const cors = require('cors')
const bodyParser = require ('body-parser')
db.then(() => {
  console.log('Connected correctly to server')
})
app.use(cors())
app.use(bodyParser.json())

app.get('/', async function (req, res) {
    const result = await user.find()
    res.send(result)})

    app.post('/user', async function (req, res) {
      const body = req.body
      const result = await user.insert(body)
    res.send(result)})

  app.put('/user/:id', async function (req, res) {
      const result = await user.findOneAndUpdate(req.params.id,{$set: req.body})
    res.send(result)})

  app.delete('/user', async function (req, res) {
      const result = await user.remove()
    res.send(result)})

    app.delete('/user/:id', async function (req, res) {
        const result = await user.remove({'_id':req.params.id})
      res.send(result)})


app.listen(port, () => console.log(`Example app listening on port ${port}!`))


  