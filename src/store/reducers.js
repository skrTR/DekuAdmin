import { combineReducers } from "redux"

// Front
import Layout from "./layout/reducer"

// Authentication
import Login from "./auth/login/reducer"
import Account from "./auth/register/reducer"
import ForgetPassword from "./auth/forgetpwd/reducer"
import Profile from "./auth/profile/reducer"
//niitlel
import projects from "./projects/reducer"
//Товхимол
import brochures from "./brochure/reducer"
//E-commerce
import ecommerce from "./e-commerce/reducer"

//Calendar
import calendar from "./calendar/reducer"

//chat
import chat from "./chat/reducer"

//crypto
import crypto from "./crypto/reducer"

//invoices
import invoices from "./invoices/reducer"

//tasks
import tasks from "./tasks/reducer"

//contacts
import contacts from "./contacts/reducer"

//mails
import mails from "./mails/reducer"

//Dashboard
import Dashboard from "./dashboard/reducer"

//Dasboard saas
import DashboardSaas from "./dashboard-saas/reducer"

const rootReducer = combineReducers({
  // public
  Layout,
  Login,
  Account,
  ForgetPassword,
  Profile,
  ecommerce,
  calendar,
  chat,
  mails,
  crypto,
  invoices,
  projects,
  brochures,
  tasks,
  contacts,
  Dashboard,
  DashboardSaas,
})

export default rootReducer
