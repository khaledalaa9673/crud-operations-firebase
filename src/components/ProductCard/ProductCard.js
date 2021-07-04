import React from "react"
import "./productCard.css"
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.css';
import {Link} from "react-router-dom"

const ProductCard = (props) => {
  
    return (
        <div key={props.id} className="card">
            <img src={props.img} className="product-img" alt="product Image"  />
            <div className="title-row">
                <p className="product-title">{props.name}</p>
                <p className="product-price">{props.price}$</p>
            </div>
            <div style={{ width: "100%",height:"55px" }}>
                <p style={{ padding: "5px",textAlign:"center" }} >{props.description}</p>
            </div>
            <Link to={`/edit/${props.id}`} className="edit-button">Edit Product</Link>
         </div>
    )
}
export default ProductCard