import {Router} from "express"
import routeUser from "../data/user"

/** @type {Router} */
const routes = Router()

//
routes.use("/user", routeUser)

//
export default routes