/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import { mainUser, User } from "../Core/model/userInfo.model";
import { toast } from "react-toastify";

interface StoreContextProviderProps {
  children: ReactNode;
}

type state = {
  userInfo: User | undefined;
  token: string;
  loading: boolean;
  userList: User[];
  userToEdit: User | undefined;
};
const userInfo = {
  username: "",
  image: "",
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  birthDate: "",
  age: "",
  id: null,
};

const StoreContext = createContext({
  userInfo: userInfo,
  token: "",
  loading: false,
  userList: [],
  userToEdit: null,
  addUserInfo: (_data: unknown) => {},
  handleUserLogout: () => {},
  setHttpLoading: (_data: unknown) => {},
  addUsersList: (_data: unknown) => {},
  deleteUserFromList: (_data: unknown) => {},
  addNewUser: (_data: unknown) => {},
  userNeedToEdit: (_data: unknown) => {},
  editUser: (_data: unknown) => {},
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function storeReducer(state: state, action: any) {
  if (action.type === "appOnInit") {
    const info = JSON.parse(localStorage.getItem("userInfo")!);
    const userList = JSON.parse(localStorage.getItem("userList")!);
    return {
      ...state,
      userInfo: info,
      userList: userList,
    };
  }
  if (action.type === "addUserInfo") {
    let usersList = [];
    localStorage.setItem("userToken", action.payload.token);
    localStorage.setItem("userInfo", JSON.stringify(action.payload));
    if (localStorage.getItem("userList") != null) {
      usersList = JSON.parse(localStorage.getItem("userList")!) || [];
    }
    return {
      ...state,
      userInfo: action.payload,
      token: action.payload.token,
      userList: usersList,
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
    if (action.payload)
      localStorage.setItem("userList", JSON.stringify(action.payload));
    return {
      ...state,
      userList: action.payload,
    };
  }
  if (action.type === "deleteUserFromList") {
    localStorage.setItem(
      "userList",
      JSON.stringify(
        state.userList.filter((user) => user.id != action.payload.id)
      )
    );

    return {
      ...state,
      userList: state.userList.filter((user) => user.id != action.payload.id),
    };
  }
  if (action.type === "addNewUser") {
    localStorage.setItem(
      "userList",
      JSON.stringify([...state.userList, action.payload])
    );
    return {
      ...state,
      userList: [...state.userList, action.payload],
    };
  }
  if (action.type === "userNeedToEdit") {
    return {
      ...state,
      userToEdit: action.payload,
    };
  }
  if (action.type === "editUser") {
    const index = state.userList.findIndex(
      (user) => user.id == action.payload.id
    );
    if (index !== -1) {
      const updatedUserList = [
        ...state.userList.slice(0, index),
        action.payload, // Replace the old user with the new one from action.payload
        ...state.userList.slice(index + 1),
      ];
      localStorage.setItem("userList", JSON.stringify(updatedUserList));

      return {
        ...state,
        userList: updatedUserList,
      };
    }
    return {
      ...state,
    };
  }
  return state;
}

export function StoreContextProvider({ children }: StoreContextProviderProps) {
  const [storeState, setStoreState] = useReducer(storeReducer, {
    userInfo: userInfo,
    token: "",
    loading: false,
    userList: [],
    userToEdit: undefined,
  });

  const handleUserLogout = useCallback(() => {
    setStoreState({ type: "userLogout" });
  }, []);

  const setHttpLoading = useCallback((loading: boolean) => {
    setStoreState({ type: "setLoading", payload: loading });
  }, []);
  const addUserInfo = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function addUserInfo(userInfo?: any) {
      setStoreState({
        type: "addUserInfo",
        payload: userInfo,
      });
    },
    []
  );
  const appOnInit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function appOnInit() {
      setStoreState({
        type: "appOnInit",
      });
    },
    []
  );

  useEffect(() => {
    appOnInit();
  }, [appOnInit]);

  const addUsersList = useCallback(function addUsersList(usersList: User[]) {
    setStoreState({
      type: "addUserList",
      payload: usersList,
    });
  }, []);

  const deleteUserFromList = useCallback(function deleteUserFromList(
    user: User
  ) {
    setStoreState({
      type: "deleteUserFromList",
      payload: user,
    });
    toast(`${user["firstName"] + " " + user["lastName"]} delete successfully`, {
      autoClose: 1000,
      type: "success",
      closeOnClick: true,
      theme: "colored",
    });
  }, []);

  const addNewUser = useCallback(function addNewUser(user: mainUser) {
    setStoreState({
      type: "addNewUser",
      payload: user,
    });
    toast(`${user["firstName"] + " " + user["lastName"]} add successfully`, {
      autoClose: 1000,
      type: "success",
      closeOnClick: true,
      theme: "colored",
    });
  }, []);

  const userNeedToEdit = useCallback(function userNeedToEdit(user: User) {
    setStoreState({
      type: "userNeedToEdit",
      payload: user,
    });
  }, []);
  const editUser = useCallback(function editUser(user: User) {
    setStoreState({
      type: "editUser",
      payload: user,
    });
    toast(`Edit successfully`, {
      autoClose: 1000,
      type: "success",
      closeOnClick: true,
      theme: "colored",
    });
  }, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ctxValue: any = {
    userInfo: storeState.userInfo,
    token: storeState.userInfo?.token,
    loading: storeState.loading,
    userList: storeState.userList,
    userToEdit: storeState.userToEdit,
    addUserInfo,
    setHttpLoading,
    handleUserLogout,
    addUsersList,
    deleteUserFromList,
    addNewUser,
    userNeedToEdit,
    editUser,
  };
  return (
    <StoreContext.Provider value={ctxValue}>{children}</StoreContext.Provider>
  );
}

export default StoreContext;
