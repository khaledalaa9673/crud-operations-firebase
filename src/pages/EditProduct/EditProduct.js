
import React from "react"
import { useDispatch, useSelector } from "react-redux";
import { startEditProduct, startRemoveProduct } from "../../store/actions"
import ProductForm from "../../components/ProductForm/ProductForm"
import { useHistory, withRouter } from "react-router-dom"

const EditProduct = (props) => {
    const product = useSelector(state => state.products.find((product) => {
        return product.id === props.match.params.id
    }))
    const dispatch = useDispatch()
    const history = useHistory()
    const id = props.match.params.id
    const handleOnsubmit = (productData) => {
        if (product.name != productData.name || product.price != productData.price ||
            product.url != productData.url || product.description != productData.description) {
            dispatch(startEditProduct(props.match.params.id, productData))
        }
        history.push("/")
    }
    return (
        <>
            <ProductForm onSubmit={handleOnsubmit} title="Edit Product" product={product} >
                <button className="form_button" onClick={() => {
                    dispatch(startRemoveProduct({ id }))
                    history.push("/")
                }} >remove</button>
            </ProductForm>
        </>
    )
}

export default withRouter(EditProduct)