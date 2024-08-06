import { AxiosError } from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-toastify";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function sendHttpRequest(url: string, config: any) {
  const response = await fetch(url, config);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Request failed");
  }
  return response.json();
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function useHttp(url: string, config: any) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [data, setData] = useState();
  const sendRequest = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async function sendRequest(formData?: any) {
      setIsLoading(true);
      try {
        const response = await sendHttpRequest(url, {
          ...config,
          body: formData,
        });
        setData(response);
       
      } catch (err) {
        const error = err as AxiosError;
        toast(error.message, {
          type: "error",
          autoClose: 2000,
          closeOnClick: true,
        });
      }

      setIsLoading(false);
    },
    [url, config]
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
