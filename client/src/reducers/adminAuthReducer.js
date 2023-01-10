const adminAuthReducer = (
    state = { adminAuthData: null, loading: false, error: false },
    action
) => {
    switch (action.type) {
        case "ADMIN_AUTH_START":
            return { ...state, loading: true, error: false };

        case "ADMIN_AUTH_SUCCESS":
            localStorage.setItem("profile", JSON.stringify({ ...action?.data }));
            return { ...state, adminAuthData: action.data, loading: false, error: false };

        case "ADMIN_AUTH_FAIL":
            return { ...state, loading: false, error: true };

        case "ADMIN_LOGOUT":
            localStorage.clear();
            return { ...state, adminAuthData: null, loading: false, error: false };

        default:
            return state;
    }
};

export default adminAuthReducer
