import firebase from "../firebase"

export const addProduct = (product) => ({
  type: 'ADD_PRODUCT',
  product
});

export const startAddProduct = (productData = {}) => {
  return (dispatch, getState) => {
    const userId = getState().auth.userId;
    const {
      description = '',
      name = '',
      price = 0,
      url = null
    } = productData;
    const product = { description, price, name, url };
    return firebase.database().ref(`products/${userId}`).push(product).then((ref) => {
      dispatch(addProduct({
        id: ref.key,
        ...product
      }));
    });
  };
};

export const removeProduct = ({ id } = {}) => ({
  type: 'REMOVE_PRODUCT',
  id
});

export const startRemoveProduct = ({ id } = {}) => {
  return (dispatch, getState) => {
    const userId = getState().auth.userId;
    return firebase.database().ref(`products/${userId}/${id}`).remove().then(() => {
      dispatch(removeProduct({ id }));
    });
  };
};


export const editProduct = (id, updates) => ({
  type: 'EDIT_PRODUCT',
  id,
  updates
});

export const startEditProduct = (id, updates) => {
  return (dispatch, getState) => {
    const userId = getState().auth.userId;
    return firebase.database().ref(`products/${userId}/${id}`).update(updates).then(() => {
      dispatch(editProduct(id, updates));
    });
  };
};

export const setProducts = (products) => ({
  type: 'SET_PRODUCTS',
  products
});

export const startSetProducts = () => {
  return (dispatch, getState) => {
    const userId = getState().auth.userId;
    return firebase.database().ref(`products/${userId}`).once('value').then((snapshot) => {
      const products = [];

      snapshot.forEach((childSnapshot) => {
        products.push({
          id: childSnapshot.key,
          ...childSnapshot.val()
        });
      });
      console.log(products)
      console.log(userId)
      dispatch(setProducts(products));
    });
  };
};