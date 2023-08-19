import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import {
    Post,
    searchSubredditPosts,
    searchSubreddits,
    searchSubredditsByUser
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
                    // Fetch top authors for the given subreddit
                    let topAuthors = await searchSubredditPosts(subReddit, 'hot');

                    // Fetch subreddits by each top author
                    const subRedditMatrix = await Promise.all(
                        topAuthors.map(author => searchSubredditsByUser(author))
                    );

                    // Object to track the occurrences and author overlap of each subreddit
                    const subRedditOccurrencesMap: { [key: string]: { count: number, authorOverlap: number } } = {};

                    // Populate the occurrences map
                    subRedditMatrix.forEach((list, authorIndex) => {
                        let uniqueSubredditsForAuthor = new Set<string>();  // To ensure we don't double-count for one author

                        list.forEach((str) => {
                            if(str.toLowerCase() !== subReddit.toLowerCase() && !uniqueSubredditsForAuthor.has(str)) {
                                if (!subRedditOccurrencesMap[str]) {
                                    subRedditOccurrencesMap[str] = { count: 1, authorOverlap: 1 };
                                } else {
                                    subRedditOccurrencesMap[str].count += 1;
                                    subRedditOccurrencesMap[str].authorOverlap += 1;
                                }
                                uniqueSubredditsForAuthor.add(str);
                            }
                        });
                    });

                    // Convert authorOverlap into a percentage
                    const totalAuthors = topAuthors.length;
                    Object.values(subRedditOccurrencesMap).forEach(value => {
                        value.authorOverlap = (value.authorOverlap / totalAuthors) * 100;
                    });

                    // Order the subreddits by their occurrences
                    const orderedSubRedditOccurrences = Object.entries(subRedditOccurrencesMap).sort(
                        (a, b) => b[1].count - a[1].count
                    ).map(([subreddit, data]) => ({ subreddit, occurrence: data.count, authorOverlap: data.authorOverlap }));

                    // Set the ordered occurrences to state
                    setSubRedditOccurrences(orderedSubRedditOccurrences);

                } catch (error) {
                    console.error("There was an error fetching the data", error);
                }
            };

            // Invoke the fetchData function
            fetchData().catch(error => {
                console.error("Unexpected error in fetchData:", error);
            });
        }
    }, [subReddit]); // The effect depends on the subReddit state

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
