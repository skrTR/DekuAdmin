import { combineReducers } from "redux"
// Front
import Layout from "./layout/reducer"
// Authentication
import Login from "./auth/login/reducer"
//niitlel
import projects from "./projects/reducer"
//Товхимол
import brochures from "./brochure/reducer"
//Баг
import contacts from "./contacts/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  projects,
  brochures,
  contacts,
})

export default rootReducer
