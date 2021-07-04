const authDefaultState = {
    userId: ""
}

const authReducer = (state = authDefaultState, action) => {
    switch (action.type) {
        case "LOGIN":
            return {
                userId: action.userId
            }
            break;
        case "LOGOUT":
            return {
                userId: ""
            }
            break;
        default:
            return state
            break;
    }
}
export default authReducer