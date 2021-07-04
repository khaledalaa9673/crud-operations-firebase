import React from "react"
import { Link} from "react-router-dom"
 

const NotFoundPage=()=>{
    return (
        <div>
             <h1>Not found</h1> 
             <h1><Link to="/" >Home</Link></h1>
          
        </div>
    )
}

export default NotFoundPage