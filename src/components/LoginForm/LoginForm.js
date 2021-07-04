import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import "./loginFrom.css"
import firebase from "../../firebase"
import Spinner from 'react-bootstrap/Spinner'
import 'bootstrap/dist/css/bootstrap.css';
import {startLogin} from "../../store/authActions"


const LoginForm = () => {
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
 
    const formik = useFormik({
        initialValues: {
            password: '',
            email: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required("Please enter your password")
                .matches(
                    /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
                    "Password must contain at least 8 characters, one uppercase, one number and one special case character"
                ),
            email: Yup.string().email('Invalid email address').required('Email Required'),
        }),
        onSubmit: values => {
            setError("")
            setLoading(true)
            firebase.auth().signInWithEmailAndPassword(values.email, values.password).then(user => {
                 setLoading(false)
               
            }).catch(error => {
                setError(error.message)
                setLoading(false)
                console.log(error.message)
            })
        },
    });
    return (
        <form onSubmit={formik.handleSubmit} className="login-form" >
            <h1 className="form-header" >Login</h1>
            <div className="input-container" >
                <p className="title">Email</p>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email &&
                    <p className="error">{formik.errors.email}</p>
                }
            </div>
            <div className="input-container">
                <p className="title" >Password</p>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.password}
                />
                {formik.touched.password && formik.errors.password ?
                    <p className="error">{formik.errors.password}</p>:<p className="error"></p>}
            </div>
            {loading ? <div className="spinner"> <Spinner animation="border" variant="primary" /></div>
                : <button type="submit" className="submit_button">Submit</button>}
            <p className="error-message">{error}</p>
        </form>
    );
};
export default LoginForm