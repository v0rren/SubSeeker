import {useEffect, useState} from "react";
import SearchBar from "./SearchBar";
import {Post, searchSubredditPosts, searchSubreddits, searchSubredditsByUser} from "../commons/queries";
export const RecommendedSubRedditList = () => {

    const [subReddit, setSubReddit] = useState<string>('');
    useEffect(() => {

        if (subReddit.trim() !== '') {

            const fetchData = async () => {
                try {
                    let topAuthors  = await searchSubredditPosts(subReddit,'top');

                    const results = await Promise.all(topAuthors.map(author => searchSubredditsByUser(author)));

                    console.log(results);
                } catch (error) {
                    console.error("There was an error fetching the data", error);
                }
            };

            fetchData();

        }
    }, [subReddit]);
    return (

        <SearchBar onInputSubmit={setSubReddit}></SearchBar>
        
    );
};
