// External imports
import React, { useState } from 'react';
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid"

// Define the prop types for the component
interface Props {
    onInputSubmit: (input: string) => void;
}

/**
 * SearchBar component for searching subreddits.
 * @param onInputSubmit - A callback function triggered on submission of the search input.
 */
const SearchBar: React.FC<Props> = ({ onInputSubmit }) => {
    const [input, setInput] = useState('');

    return (
        <div className="flex flex-row mt-5 justify-center">
            <input
                className="block rounded-lg outline outline-4 outline-blue-700 basis-1/4 pl-10"
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Search Similar Subreddits"
            />
            <button
                className="basis-0.5/4 ml-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                onClick={() => onInputSubmit(input)}
            >
                Submit
            </button>
        </div>
        // TODO: Add search icon before padding
    );
};

export default SearchBar;
