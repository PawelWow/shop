

export const SIGNUP = 'SIGNUP'
export const LOGIN = 'LOGIN'

export const signup = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC2kGGGsUJFq7Z5uGHoiGdhEWvCXSbftWg',
            {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  email: email,
                  password: password,
                  returnSecureToken: true
                })
            }
        );


        if(!response.ok) {
            const errorResData = await response.json();

            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';
            if(errorId === 'EMAIL_EXISTS') {
                message = 'This email exists in our database.';
            }  

            throw new Error(message);
        }

        const resData = await response.json();
        console.log(resData);

        dispatch({ type: SIGNUP, token: resData.idToken , userId: resData.localId  });
    };
};

export const login = (email, password) => {
    return async dispatch => {
        const response = await fetch(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC2kGGGsUJFq7Z5uGHoiGdhEWvCXSbftWg',
            {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  email: email,
                  password: password,
                  returnSecureToken: true
                })
            }
        );


        if(!response.ok) {
            const errorResData = await response.json();
            console.log(errorResData);

            const errorId = errorResData.error.message;
            let message = 'Something went wrong!';
            if(errorId === 'EMAIL_NOT_FOUND') {
                message = 'Could not find given email.';
            }  else if(errorId === 'INVALID_PASSWORD') {
                message = 'Invalid password.';
            }

            throw new Error(message);
        }

        const resData = await response.json();
        console.log(resData);

        dispatch({ type: LOGIN, token: resData.idToken , userId: resData.localId  });
    };
};