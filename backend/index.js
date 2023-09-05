const connectToMongo=require('./db');
var cors=require("cors")
connectToMongo();
const express = require('express')
const app = express()
const port = 5000

app.use(cors())
app.use(express.json())
app.use('/api/pins', require('./routes/pins'))
app.use('/api/users', require('./routes/users'))
app.listen(port, () => {
    console.log(`Travelmap listening at http://127.0.0.1:${port}`)
  })

