import {
  BrowserRouter as Router,
  Switch,
  Route,
  useHistory,
  withRouter
} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage"
import Dashboard from "./pages/Dashboard/Dashboard"
import Login from "./pages/Login/Login"
import firebase from "./firebase"
import './index.css';
import { useEffect } from "react";
import ReactDOM from 'react-dom';
import productReducer from "./store/reducer"
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider, useDispatch } from 'react-redux';
import EditProduct from "./pages/EditProduct/EditProduct"
import AddProduct from "./pages/AddProduct/AddProduct"
import { login, logout } from "./store/authActions"
import authReducer from "./store/authReducer"
import PrivateRoute from "./Routes/PrivateRoute"
import PublicRoute from "./Routes/PublicRoute"

const store = createStore(
  combineReducers({
    auth: authReducer,
    products: productReducer,
  }),
  applyMiddleware(thunk)
);

function App() {

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userData = JSON.stringify(user)
        localStorage.setItem("user", userData)

        dispatch(login(user.uid))

        if (history.location.pathname === "/Login") {
          history.push("/")
        }
      } else {
        dispatch(logout())
        history.push("/Login")
      }
    })
  }, [])
  return (
    <div className="App">
      <Switch>
        <PrivateRoute path="/" exact={true} >
          <Dashboard />
        </PrivateRoute>
        <PublicRoute path="/Login">
          <Login />
        </PublicRoute >
        <PrivateRoute path="/edit/:id">
          <EditProduct />
        </PrivateRoute>
        <PrivateRoute path="/add">
          <AddProduct />
        </PrivateRoute>
        <Route >
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  );
}
const RootWithAuth = withRouter(App)

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <RootWithAuth />
    </Router>
  </Provider>, document.getElementById('root'))