import axios from "axios"
import { del, get, post, put } from "./api_helper"
import * as url from "./url_helper"

// Gets the logged in user data from local session
const getLoggedInUser = () => {
  const user = localStorage.getItem("user")
  if (user) return JSON.parse(user)
  return null
}

//is user is logged in
const isUserAuthenticated = () => {
  return getLoggedInUser() !== null
}
// Login Method
const postJwtLogin = data => post(url.POST_FAKE_JWT_LOGIN, data)

// Brochure
export const getBrochures = () => get(url.GET_BROCHURES)
export const getBrochuresDetails = id =>
  get(`${url.GET_BROCHURE_DETAIL}/${id}`, { params: { id } })
export const deleteBrochure = brochure =>
  del(`${url.DELETE_BROCHURE}/${brochure}`)
// Team
export const getUsers = () => get(url.GET_USERS)
export const deleteUser = user => del(`${url.DELETE_USER}/${user}`)
export const addNewUser = user => post(url.ADD_NEW_USER, user)
export const updateUser = (id, user) => put(`${url.UPDATE_USER}/${id}`, user)
//  нийтлэл
export const getProjects = () => get(url.GET_PROJECTS)
export const getProjectsDetails = id =>
  get(`${url.GET_PROJECT_DETAIL}/${id}`, { params: { id } })
export const addNewProject = project => post(url.ADD_NEW_PROJECT, project)
export const updateProject = project => put(url.UPDATE_PROJECT, project)
export const deleteProject = project => del(`${url.DELETE_PROJECT}/${project}`)

export const getUserProfile = () => get(url.GET_USER_PROFILE)

export { getLoggedInUser, isUserAuthenticated, postJwtLogin }
