import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import {
    getRecommendedSubreddits,
} from "../commons/queries";
import RecommendedSubRedditTable from "./RecommendedSubRedditTable";

export const RecommendedSubRedditList = () => {
    // State for the current subreddit
    const [subReddit, setSubReddit] = useState<string>('');

    // Updated state for the occurrences and author overlap of recommended subreddits
    const [subRedditOccurrences, setSubRedditOccurrences] = useState<{ subreddit: string, occurrence: number, authorOverlap: number }[]>([]);

    // Effect to fetch recommended subreddits whenever the subreddit changes
    useEffect(() => {
        if (subReddit.trim() !== '') {
            const fetchData = async () => {
                try {
                    // Fetch recommended subreddits using the new API endpoint
                    const recommendedSubReddits = await getRecommendedSubreddits(subReddit);
                    setSubRedditOccurrences(recommendedSubReddits);
                } catch (error) {
                    console.error("There was an error fetching the data", error);
                }
            };

            fetchData().catch(error => {
                console.error("Unexpected error in fetchData:", error);
            });
        }
    }, [subReddit]);

    return (
        <div>
            {/* SearchBar to input subreddit and fetch recommendations */}
            <SearchBar onInputSubmit={setSubReddit}></SearchBar>

            {/* Table displaying the recommended subreddits */}
            <RecommendedSubRedditTable recommendedSubRedditList={subRedditOccurrences}></RecommendedSubRedditTable>
        </div>
    );
};

export default RecommendedSubRedditList;
