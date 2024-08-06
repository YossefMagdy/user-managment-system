import axios, { AxiosError } from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

// apiType:string,url:string,initalValue:any,formdata:any
export function useFetch() {
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<AxiosError>();
  const [Data, setFetchedData] = useState();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async function fetchData(apiType: string, url: string, formdata: any) {
    try {
      setIsFetching(true);
      if (apiType === "get") {
        const data = (await axios.get(url)).data;
        setFetchedData(data);
      }
      if (apiType === "post") {
        const data = (await axios.post(url, formdata)).data;
        setFetchedData(data);
      }
      toast("Welcome Back ... ", {
        autoClose: 1000,
        type: "success",
        closeOnClick: true,
        theme: "colored",
      });
    } catch (err) {
      const error = err as AxiosError;
      setError(error);
      toast(error.message, { autoClose: 2000, closeOnClick: true });
    }
  }

  return {
    isFetching,
    fetchData,
    error,
    Data,
  };
}
