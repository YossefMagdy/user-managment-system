import { createContext, ReactNode, useCallback, useReducer } from "react";
import { User } from "../Core/model/userInfo.model";

interface StoreContextProviderProps {
  children: ReactNode;
}

type state = {
  userInfo: User | undefined;
  token: string;
  loading: boolean;
};
const userInfo = {
  username: "",
  image: "",
};
let authToken = "";

if (localStorage.getItem("userToken") != null) {
  authToken = localStorage.getItem("userToken")!;
  const info = JSON.parse(localStorage.getItem("userInfo")!);
  userInfo.image = info.image;
  userInfo.username = info.username;
}
const StoreContext = createContext({
  userInfo: userInfo,
  token: authToken,
  loading: false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addUserInfo: (_data: unknown) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setHttpLoading: (_data: unknown) => {},
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function storeReducer(state: state, action: any) {
  if (action.type === "addUserInfo") {
    localStorage.setItem("userToken", action.payload.token);
    localStorage.setItem("userInfo", JSON.stringify(action.payload));
    return {
      ...state,
      userInfo: action.payload,
      token: action.payload.token,
    };
  }

  if (action.type === "setLoading") {
    return {
      ...state,
      loading: action.payload,
    };
  }

  return state;
}

export function StoreContextProvider({ children }: StoreContextProviderProps) {
  const [storeState, setStoreState] = useReducer(storeReducer, {
    userInfo: userInfo,
    token: authToken,
    loading: false,
  });

  function setHttpLoading(loading: boolean) {
    setStoreState({
      type: "setLoading",
      payload: loading,
    });
  }
  const addUserInfo = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function addUserInfo(userInfo: any) {
      setStoreState({
        type: "addUserInfo",
        payload: userInfo,
      });
    },
    []
  );

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ctxValue: any = {
    userInfo: storeState.userInfo,
    token: storeState.userInfo.token,
    loading: storeState.loading,
    addUserInfo,
    setHttpLoading,
  };
  return (
    <StoreContext.Provider value={ctxValue}>{children}</StoreContext.Provider>
  );
}

export default StoreContext;
