export default function authHeader() {
  const obj = JSON.parse(localStorage.getItem("authUser"))
  if (obj && obj.token) {
    return { Authorization: `Bearer ${obj.token}` }
  } else {
    console.log("fialed")
    return {}
  }
}
