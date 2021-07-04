import React, { useEffect, useState } from "react"
import "./dashbord.css"
import { Link } from "react-router-dom"
import ProductCard from "../../components/ProductCard/ProductCard"
import { useSelector, useDispatch } from "react-redux"
import { startSetProducts } from "../../store/actions"
import { logout } from "../../store/authActions"
import firebase from "../../firebase"
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.css';

const Dashboard = (props) => {
    const [loading,setLoading]=useState(true)
    const products = useSelector(state => state.products)
    const dispatch = useDispatch()
    

    const handleLogout = () => {
        firebase.auth().signOut()
        localStorage.removeItem("user")
        dispatch(logout())
    }
const getProduct=async()=>{
await dispatch(startSetProducts())
}
    useEffect(() => {
        getProduct()
        setLoading(false)
    }, [])

 
    return (
        <div>
            <header className="header-container">
                <div>
                    <Link to="/add" className="link" >Add Product</Link>
                </div>
                <div>
                    <button onClick={handleLogout} className="log-button">logout</button>
                </div>
            </header>
            {loading ? <div className="middle">
                <Spinner animation="border" variant="primary" />
            </div> 
             :products.length===0 ?  <div className="middle">
              <h2>There is no products</h2>
         </div> :
            <div className="products-list">
                {
                    products.map(product => {
                        return <ProductCard
                            key={product.id}
                            id={product.id}
                            name={product.name}
                            img={product.url}
                            description={product.description}
                            price={product.price} />
                    })
                }
            </div>
            }
        </div>
    )
}

export default Dashboard