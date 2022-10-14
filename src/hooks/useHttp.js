import { useState, useCallback } from "react";

/*
 useHttp custom hook
 Used to make Http requests, GET or POST
 Hook has sendHttpRequest function,  that takes two parameters, 
 1. Object with {url, method, headers, body}
 2. Function, to handle the data returned from the request.
 ------
 Returns, 
 error state, loading state and sendRequest function.
*/

const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendHttpRequest = useCallback(async (requestConfig, dataHandler) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(requestConfig.url, {
        // check is values exist or set default values for GET requests
        method: requestConfig.method ? requestConfig.method : "GET",
        headers: requestConfig.headers ? requestConfig.headers : {},
        body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
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
  }, []);

  return {
    isLoading: isLoading,
    error: error,
    sendHttpRequest: sendHttpRequest,
  };
};

export default useHttp;
