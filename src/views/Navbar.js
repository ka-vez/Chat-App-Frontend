import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import AuthContext from '../context/AuthContext'




function Navbar() {

  const {user, logoutUser} = useContext(AuthContext)
  const token = localStorage.getItem("authTokens")

  if (token) {
    const decoded = jwtDecode(token)
    console.log(decoded);
     
  }

  return (
    <nav class="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img style={{width: "100px", padding: "6px"}} src="https://i.imgur.com/juL1aAc.png" alt=""/>

          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav">
              <li class="nav-item">
                <Link class="nav-link active" to="/">Home</Link>
              </li>
              { token === null && 
              <>
                <li class="nav-item">
                  <Link class="nav-link" to="/register">Register</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/login">Login</Link>
                </li>
              </> 
              }

              {token !== null &&   
              <>
                <li class="nav-item">
                  <Link class="nav-link" to="/dashboard">Dashboard</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/inbox">Inbox</Link>
                </li>
                <li class="nav-item">
                  <Link class="nav-link" to="/todo">Todo</Link>
                </li>
                <li class="nav-item">
                  <a class="nav-link" onClick={logoutUser} style={{cursor:"pointer"}} >Logout</a>
                </li>
              </> 
              }
              
            </ul>
          </div>
        </div>
      </nav>

  )
}

export default Navbar