const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cors = require('cors')
require("dotenv").config()
const { readdirSync } = require('fs')

const authRoutes = require('./routes/auth')
const { report } = require('./routes/auth')

const app = express()

//mongo
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
})
.then(() => console.log("DB CONNECTED"))
.catch(err => console.log(`DB CONNECTION ERR ${err}`))
 
//moddlewares
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "2mb"}));
app.use(cors());

//routes middleware
app.use('/api', authRoutes)
readdirSync('./routes').map((r) => 
    app.use("/api", require("./routes/" + r))
);


const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`))
