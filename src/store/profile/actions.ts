import { ACTION_TYPES } from './types';
import { request } from '../http';

const {REACT_APP_API_FULLNAME } = process.env;

// export const fetchProfile = ()  => ({
//   type: ACTION_TYPES.FETCH_PROFILE
// });

//redux-thunk!!
// можно просто на прямую задавать фетч не черех мид http
export const fetchProfile = () => async (dispatch:any, getState: any) =>{
  dispatch( request({
        path: `/1/members/${REACT_APP_API_FULLNAME}?fields=id,avatarUrl,email,fullName,url,username`,
        authRequired: true,
        onSuccess: data => {
          dispatch(setBoards(data));
        },
        onError: error => {
          console.log(error);
        }
      })
  );
};


export const setBoards = (data: Array<any>) => ({
  type: ACTION_TYPES.SET_PROFILE,
  payload: data
});


