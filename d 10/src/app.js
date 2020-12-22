const express= require('express')

require('./db/moongse')

const doctorRoutes = require('./routes/docrouter')

const patientRoutes = require('./routes/patrouter')

const app = express()

const port = process.env.PORT || 3000

app.use(express.json())

app.use(doctorRoutes)

app.use(patientRoutes)

app.listen(port)