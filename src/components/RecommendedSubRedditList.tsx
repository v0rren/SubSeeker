import {useState} from "react";
import SearchBar from "./SearchBar";

export const RecommendedSubRedditList = () => {

    const [input, setInput] = useState<string>('');

    return (

        <SearchBar onInputSubmit={setInput}></SearchBar>
    );
};
