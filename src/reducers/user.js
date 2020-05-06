export const initalState = { // default값 세팅
    isLoggedIn: false,
    user: {},
    signupData: {},
};

export const LOG_IN = 'LOG_IN'; // 액션의 이름
export const LOG_OUT = 'LOG_OUT';
export const SIGN_UP = 'SIGN_UP';

export const loginAction = {
    type: LOG_IN,
    data: {
        nickname: "hanogo",
    },
};
export const logoutAction = {
    type: LOG_OUT,
};
export const signupAction = (data) => {
    return {
        type: SIGN_UP,
        data: data,
    };
};

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case LOG_IN: {
            return {
                ...state,
                isLoggedIn: true,
                user: action.data,
            };
        }
        case LOG_OUT: {
            return {
                ...state,
                isLoggedIn: false,
                user: null,
            };
        }
        case SIGN_UP: {
            return {
                ...state,
                signupData: action.data,
            };
        }
        default : {
            return {
                ...state,
            };
        }
    }
}

export default reducer;