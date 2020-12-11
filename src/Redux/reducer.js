const initialState = {
    username: null,
    userid: null,
    profilePicture: null
  };

 const GET_USER = 'GET_USER'

export const getUser = (userid,username, profilePicture) => {
    return {
        type: GET_USER,
        payload: {
            username,
            userid,
            profilePicture
        }
    }
}

export default function (state = initialState, action){
    let {payload} = action
    switch (action.type){
    case GET_USER:
        return {...state, payload}
        default: return state
    }
}