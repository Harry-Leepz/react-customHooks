import { useState } from "react";

/*
 useHttp custom hook
 Used to make Http requests, GET or POST
 Hook, takes two parameters, 
 1. Object with {url, method, headers, body}
 2. Function, to handle the data returned from the request.
 ------
 Returns, 
 error state, loading state and sendRequest function.
*/

const useHttp = (requestConfig, dataHandler) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendHttpRequest = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        method: requestConfig.method,
        headers: requestConfig.headers,
        body: JSON.stringify(requestConfig.body),
      });

      if (!response.ok) {
        throw new Error("Request failed!");
      }

      const data = await response.json();
      dataHandler(data);
    } catch (err) {
      setError(err.message || "Something went wrong!");
    }
    setIsLoading(false);
  };

  return {
    isLoading: isLoading,
    error: error,
    sendHttpRequest: sendHttpRequest,
  };
};

export default useHttp;
