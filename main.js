import { usersApp } from "./src/users/users-app";
import "./style.css";

document.querySelector("#app").innerHTML = `
  <div>
   
    <h1>CRUD EXAMPLE</h1>
    <div class="card">
    
    </div>
    
  </div>
`;
const element = document.querySelector(".card")
usersApp(element);