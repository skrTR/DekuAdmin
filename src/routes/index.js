import React from "react"
import { Redirect } from "react-router-dom"

// Profile
import UserProfile from "../pages/Authentication/user-profile"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"
import Register from "../pages/Authentication/Register"
import ForgetPwd from "../pages/Authentication/ForgetPassword"

// Dashboard
import Dashboard from "../pages/Dashboard/index"
// Niitlel
import projectsGrid from "pages/News/projects-grid"
import NewsCreate from "pages/News/news-create"
import brochureGrid from "pages/Brochure/brochure-grid"
import BrochureCreate from "pages/Brochure/brochure-create"
import Team from "pages/Team/Team"
import TeamCreate from "pages/Team/team-create"
import NewsDetails from "pages/News/news-details"
import BrochureDetail from "pages/Brochure/brochure-detail"
import LockScreen from "pages/Authentication/auth-lock-screen"

const authProtectedRoutes = [
  // { path: "/dashboard", component: Dashboard },
  // Team
  { path: "/team", component: Team },
  { path: "/team-create", component: TeamCreate },
  // //profile
  { path: "/profile", component: UserProfile },
  // Niitlel
  { path: "/news", component: projectsGrid },
  { path: "/news-details/:id", component: NewsDetails },
  { path: "/news-create", component: NewsCreate },
  // Товхимол
  { path: "/brochure", component: brochureGrid },
  { path: "/brochure-details/:id", component: BrochureDetail },
  { path: "/brochure-create", component: BrochureCreate },
  { path: "/auth-lock-screen", component: LockScreen },
  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/team" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
  { path: "/forgot-password", component: ForgetPwd },
  { path: "/register", component: Register },
]

export { publicRoutes, authProtectedRoutes }
