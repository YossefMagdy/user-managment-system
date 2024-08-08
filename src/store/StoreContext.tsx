/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, ReactNode, useCallback, useReducer } from "react";
import { User } from "../Core/model/userInfo.model";

interface StoreContextProviderProps {
  children: ReactNode;
}

type state = {
  userInfo: User | undefined;
  token: string;
  loading: boolean;
  userList: User[];
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
  userList: [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addUserInfo: (_data: unknown) => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleUserLogout: () => {},
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setHttpLoading: (_data: unknown) => {},
  addUsersList: (_data: unknown) => {},
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
  if (action.type === "userLogout") {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userInfo");
    return {
      ...state,
      userInfo: null,
      token: null,
    };
  }

  if (action.type === "setLoading") {
    return {
      ...state,
      loading: action.payload,
    };
  }
  if (action.type === "addUserList") {
    return {
      ...state,
      userList: action.payload,
    };
  }

  return state;
}

export function StoreContextProvider({ children }: StoreContextProviderProps) {
  const [storeState, setStoreState] = useReducer(storeReducer, {
    userInfo: userInfo,
    token: authToken,
    loading: false,
    userList: [],
  });

  const handleUserLogout = useCallback(() => {
    setStoreState({ type: "userLogout" });
  }, []);

  const setHttpLoading = useCallback((loading: boolean) => {
    setStoreState({ type: "setLoading", payload: loading });
  }, []);
  const addUserInfo = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function addUserInfo(userInfo: any) {
      setStoreState({
        type: "addUserInfo",
        payload: userInfo,
      });
    },
    [],
  );

  const addUsersList = useCallback(function addUsersList(usersList: User[]) {
    setStoreState({
      type: "addUserList",
      payload: usersList,
    });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ctxValue: any = {
    userInfo: storeState.userInfo,
    token: storeState.userInfo?.token,
    loading: storeState.loading,
    userList: storeState.userList,
    addUserInfo,
    setHttpLoading,
    handleUserLogout,
    addUsersList,
  };
  console.log(ctxValue);
  return (
    <StoreContext.Provider value={ctxValue}>{children}</StoreContext.Provider>
  );
}

export default StoreContext;
