const express = require('express')
const { sequelize, loadModels } = require('./src/database')
const Router = express.Router()
const cors = require('cors')
const { createHandler } = require('graphql-http/lib/use/express');
const {authenticateApi}=require('./src/middleware/authenticate')
const app = express()
loadModels(sequelize)
const { applyRoutes } = require('./src/routes')
const {schema} = require('./src/graphql/hotelSchema')

app.use(express.json())
app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use('*', authenticateApi())
app.all('/v1/graphql', createHandler({ schema:schema}));
app.use(applyRoutes(Router))

app.listen('8000', () => {
    console.log('listening to port 8000')
})
module.exports={app}