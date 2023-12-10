require("./core/config/env")

//
import * as express from "express"
import * as cors from "cors"
import * as bodyparser from "body-parser"
const { default: routes } = require("./routes/routes")

/** @type {express.Express} */
const app = express()

/** @type {number} */
const PORT = Number(process.env.SERVER_PORT)

//
app.use(cors())

//
app.use(bodyparser.json())

//
app.use("/", routes)

//
app.listen(PORT, () => {
    console.log(`Port: ${PORT}`)
})
