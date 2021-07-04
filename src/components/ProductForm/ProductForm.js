import React from 'react';
import "./productForm.css"
import firebase from "../../firebase"
import { ProgressBar, Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.css';
import mime from 'mime-types'



class ProductForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            uploadTask: null,
            percentUpLoad: 0,
            loading: false,
            file: null,
            authorized: ["image/jpeg", "image/png"],
            name: props.product ? props.product.name : "",
            price: props.product ? props.product.price : "",
            description: props.product ? props.product.description : "",
            downloadUrl: props.product ? props.product.url : "",
            error: ""
        }
    }

    handleChange = (e) => {
        if (e.target.name == "price") {
            const price = e.target.value
            if (!price || price.match(/^\d{1,8}(\.\d{0,2})?$/)) {
                this.setState({ "price": price })
            }
        } else {
            this.setState({ [e.target.name]: e.target.value })
        }
    }

    uploadFile = () => {
        const metaData = { contentType: mime.lookup(this.state.file.name) }
        const filePath = `images/${this.state.file.name}`
        this.setState({
            uploadTask: firebase.storage().ref().child(filePath).put(this.state.file, metaData)
        }, () => {
            this.state.uploadTask.on('state_changed', snap => {
                const percentUpLoad = Math.round((snap.bytesTransferred / snap.totalBytes) * 100)
                this.setState({ percentUpLoad })

            }, err => {
                console.log(err)
                this.setState({ loading: false })
                this.setState(
                    {
                        uploadTask: null,
                    })
            }, () => {
                this.state.uploadTask.snapshot.ref.getDownloadURL().then(downloadUrl => {
                    this.setState({ downloadUrl: downloadUrl })
                    this.props.onSubmit({
                        name: this.state.name,
                        price: this.state.price,
                        description: this.state.description,
                        url: this.state.downloadUrl
                    })
                })
            }
            )
        }
        )
    }

    addFile = (e) => {
        let file = e.target.files[0]
        if (file) {
            this.setState({ file })
        }
    }

    isAuthorized = (fileName) => this.state.authorized.includes(mime.lookup(fileName.name))

    handleSubmit = (e) => {
        const { name, description, price, downloadUrl } = this.state
        e.preventDefault()

        if (name.trim().length != 0 && description.trim().length != 0 && price.trim().length != 0) {
            if ((this.state.file !== null && this.isAuthorized(this.state.file))) {
                this.setState({ error: "" })
                this.setState({ loading: true })
                this.uploadFile()
            } else if (downloadUrl) {
                this.props.onSubmit({
                    name: this.state.name,
                    price: this.state.price,
                    description: this.state.description,
                    url: this.state.downloadUrl
                })
            } else {
                this.setState({ error: "please choose an  image  PNG or JPEG" })
            }
        } else {
            this.setState({ error: "please fill all inputs " })
        }
    }
    render() {
        return (
            <div className="Product-page" >
                <form onSubmit={this.handleSubmit} className="product-form" >
                    <h2>{this.props.title}</h2>
                    <div className="progress-container">
                        <ProgressBar now={this.state.percentUpLoad} label={`${this.state.percentUpLoad}%`} />
                    </div>
                    <p className="error">{this.state.error}</p>
                    <div className="product-input" >
                        <p className="title">Name</p>
                        <input
                            name="name"
                            type="text"
                            maxLength={15}
                            placeholder="Product name with only 15 character"
                            onChange={this.handleChange}
                            value={this.state.name}
                        />
                    </div>
                    <div className="product-input">
                        <p className="title" >price</p>
                        <input
                            name="price"
                            type="text"
                            placeholder="price only 8 digit"
                            onChange={this.handleChange}
                            value={this.state.price}
                        />
                    </div>
                    <div className="product-input">
                        <p className="title" >image:
                        {this.props.title == "Edit Product"
                                && <span> Select new product`s image</span>}</p>
                        <input
                            type="file"
                            placeholder="image"
                            onChange={this.addFile}
                        />
                    </div>
                    <div className="product-input">
                        <p className="title" >description</p>
                        <textarea
                        maxLength={80}
                            rows={3}
                            cols={35}
                            className="descrip"
                            name="description"
                            placeholder="Write product description with only 80 character or less"
                            onChange={this.handleChange}
                            value={this.state.description}


                        />
                    </div>
                    {!this.state.loading ?
                        <div className="product-submit">
                            <button type="submit" className="form_button">Submit</button>
                            {this.props.children}
                        </div> : <div >
                            <Spinner animation="border" variant="primary" />
                        </div>}
                </form>
            </div>
        )
    }
}

export default ProductForm