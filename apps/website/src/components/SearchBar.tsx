import React from "react";
import { atom, useAtom } from "jotai";

export const SearchTermAtom = atom("Calgary");

export const SearchBar: React.FC = () => {
  const [term, setTerm] = useAtom(SearchTermAtom);
  return (
    <form className="m-0 w-96">
      <div className="">
        <input
          defaultValue={term}
          onChange={(e) => setTerm(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          id="search"
          type="text"
          placeholder="Search for meals..."
        ></input>
      </div>
    </form>
  );
};
