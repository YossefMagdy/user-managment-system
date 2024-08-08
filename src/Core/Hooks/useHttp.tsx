import axios, { AxiosError } from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import StoreContext from "../../store/StoreContext";

interface HttpConfig extends RequestInit {
  method?: string;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sendHttpRequest(url: string, config: any) {
  const response = await axios(url, config);
  if (!(response.statusText === "OK")) {
    const errorData = await response.data();
    throw new Error(errorData.message || "Request failed");
  }
  return response;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useHttp<T>(url: string, config: HttpConfig) {
  const { setHttpLoading } = useContext(StoreContext);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState<T>();
  const sendRequest = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function sendRequest(formData?: any) {
      setIsLoading(true);
      setHttpLoading(true);
      try {
        const response = await sendHttpRequest(url, {
          ...config,
          data: formData,
        });
        setData(response.data);
      } catch (err) {
        const error = err as AxiosError;
        if (error.response && error.response.data) {
          const errorMessage = (error.response.data as { message: string })
            .message;
          toast(errorMessage, {
            type: "error",
            autoClose: 2000,
            closeOnClick: true,
          });
        }
      }

      setIsLoading(false);
      setHttpLoading(false);
    },
    [url, config, setHttpLoading],
  );

  useEffect(() => {
    if (config.method === "get") {
      sendRequest();
    }
  }, [sendRequest, config]);
  return {
    data,
    isLoading,
    sendRequest,
  };
}
