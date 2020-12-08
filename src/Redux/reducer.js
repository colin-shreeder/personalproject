const initialState = {
    username: null,
    id: null,
    profilePicture: null
  };

 const GET_USER = 'GET_USER'

export const getUser = (id,username, profilePicture) => {
    return {
        type: GET_USER,
        payload: {
            username,
            id,
            profilePicture
        }
    }
}

// export const requestUserData = () => {
//   let data = axios.get('/auth/user-data').then(res => res.data)
//   return {
//     type: REQUEST_USER_DATA,
//     payload: {

//     }
//   }
// }

export default function (state = initialState, action){
    let {payload} = action
    switch (action.type){
    case GET_USER:
        return {...state, payload}
    }
}