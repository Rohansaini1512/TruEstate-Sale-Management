import { useEffect, useState } from "react";
import { api } from "../services/api";

export function useSales() {
  const [data, setData] = useState([]);
  const [meta, setMeta] = useState({});
  const [params, setParams] = useState({
    page: 1,
    pageSize: 10,
    search: "",
    sortBy: "date",
  });

  useEffect(() => {
    async function fetchSales() {
      try {
        const res = await api.get("/sales", { params });

        // SAFETY CHECKS
        if (res?.data?.data && res?.data?.meta) {
          setData(res.data.data);
          setMeta(res.data.meta);
        } else {
          console.error("Invalid API structure:", res.data);
          setData([]);
          setMeta({});
        }
      } catch (err) {
        console.error("API ERROR:", err);
        setData([]);
        setMeta({});
      }
    }

    fetchSales();
  }, [params]);

  return { data, meta, params, setParams };
}


cd backend
npm run dev