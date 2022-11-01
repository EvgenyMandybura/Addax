import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { Launch } from "../types/launch";

export const useAsyncLaunches = (offset: number, query: string) => {
  const [list, setList] = useState<Launch[]>([]);

  const [loaded, setLoaded] = useState<Boolean>(false);

  const sendQuery = useCallback(
    async (offset: number) => {
      try {
        await setLoaded(true);
        const response = await axios.post(
          "https://api.spacexdata.com/v5/launches/query",
          {
            options: {
              offset: offset,
              limit: 12,
            },
            query: query,
          }
        );

        setList((prev: Launch[]) => [...prev, ...response.data.docs]);
        setLoaded(false);
      } catch (error) {
        console.log("error", error);
      }
    },
    [query]
  );

  useEffect(() => {
    sendQuery(offset);
  }, [sendQuery, offset]);

  return { list, loaded };
};
/*
query: !!query
    ? {
        $text: {
            $search: query,
        },
    }
    : null,*/
