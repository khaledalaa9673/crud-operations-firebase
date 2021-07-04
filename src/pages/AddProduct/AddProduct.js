import React from "react"
import { useDispatch } from "react-redux";
import { startAddProduct } from "../../store/actions"
import ProductForm from "../../components/ProductForm/ProductForm"
import {useHistory,withRouter} from "react-router-dom"

const AddProduct = () => {
    const dispatch = useDispatch()
    const history=useHistory()
    return (
        <>
            <ProductForm onSubmit={(product) => {
                dispatch(startAddProduct(product))
                history.push("/")


            }} title="Add Product" />
        </>
    )
}

export default withRouter(AddProduct)