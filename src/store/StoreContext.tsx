import {  createContext, useCallback, useReducer } from "react";

type state = {
  userInfo: unknown;
  token: string;
};

const StoreContext = createContext({
  userInfo: {},
  token: "",
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addUserInfo:(_data:unknown)=>{}
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function storeReducer(state: state, action: any) {
  if (action.type === "addUserInfo") {
    console.log(action)
    localStorage.setItem('userToken',action.payload.token)
    return {
      ...state,
      userInfo: action.payload,
      token:action.payload.token
    };
  }

  return state;
}

export function StoreContextProvider({ children }) {
  const [storeState, setStoreState] = useReducer(storeReducer, {
    userInfo: {},
    token: "",
  });

  const addUserInfo =  useCallback(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function addUserInfo(userInfo:any){
      setStoreState({
          type:"addUserInfo",
          payload:userInfo    
      })
    },[]
  )
 

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ctxValue: any = {
    userInfo: storeState.userInfo,
    // token: storeState.userInfo.token,
    addUserInfo,
  };
  return (
    <StoreContext.Provider value={ctxValue}>{children}</StoreContext.Provider>
  );
}

export default StoreContext;
