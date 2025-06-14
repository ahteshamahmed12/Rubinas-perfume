"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { client } from "../../sanity/lib/client";

const Searchs = ({ onSearchResults }: { onSearchResults: (results: any[]) => void }) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);
    return () => clearTimeout(handler);
  }, [query]);

  useEffect(() => {
    if (debouncedQuery.trim().length < 2) {
      setResults([]);
      onSearchResults([]);
      return;
    }

    const fetchData = async () => {
      const groqQuery = `*[_type == "product" && title match "${debouncedQuery}*"]{
        _id,
        title,
        price,
        brand,
        image
      }`;

      try {
        const data = await client.fetch(groqQuery);
        setResults(data);
        onSearchResults(data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchData();
  }, [debouncedQuery, onSearchResults]);

  return (
    <main className="flex justify-center items-center mt-10">
      <form onSubmit={(e) => e.preventDefault()} className="flex">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-[300px] md:w-[400px] lg:w-[600px] px-4 py-3 rounded-l-xl border border-black outline-none"
          type="text"
          placeholder="Search"
          aria-label="Search products"
        />
        <button
          type="submit"
          className="px-3 py-3 bg-[#db4444] rounded-r-xl border border-[#db4444] flex items-center justify-center"
        >
          <Search className="text-white" />
        </button>
      </form>
    </main>
  );
};

export default Searchs;
