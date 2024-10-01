"use client";
import React, { useState, useEffect, use } from "react";

import { getQueries } from "@/actions/ai";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import { Loader2Icon, Search } from "lucide-react";

export interface QueryResponse {
  queries: [];
  totalPages: number;
  totalQueries: number;
}

export default function page() {
  const [queries, setQueries] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [loading, setLoading] = useState(false);

  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress || "";

  useEffect(() => {
    if (page === 1 && email) fetchQueries();
  }, [page, email]);

  useEffect(() => {
    if (page > 1 && email) loadMore();
  }, [page]);

  const fetchQueries = async () => {
    setLoading(true);

    try {
      const res = (await getQueries(email, page, perPage)) as QueryResponse;

      setQueries(res.queries);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    setLoading(true);

    try {
      const res = (await getQueries(email, page, perPage)) as QueryResponse;

      setQueries([...queries, ...res.queries]);
      setTotalPages(res.totalPages);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!queries.length) {
    return (
      <div className="flex justify-center items-center h-screen">
        {loading ? (
          <Loader2Icon size={48} className="animate-spin" />
        ) : (
          <p className="text-lg text-gray-500">No queries found</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="p-8 pb-0 w-full flex">
        <div className="flex w-full justify-left border items-center rounded-xl pl-4 gap-4">
          <Search />
          <input
            className="w-full bg-transparent border-none focus:outline-none focus:border-none py-4 rounded-xl"
            placeholder="Search Template"
          />
        </div>

        <div className="flex justify-end w-full">
          <Button
            onClick={() => setPage(page + 1)}
            className="w-fit py-6 mt-2 flex gap-2 rounded-xl"
            variant="outline">
            {loading ? (
              <Loader2Icon size={16} className="animate-spin" />
            ) : (
              "Load More"
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
