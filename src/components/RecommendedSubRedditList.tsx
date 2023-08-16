// Required imports
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import {
    Post,
    searchSubredditPosts,
    searchSubreddits,
    searchSubredditsByUser
} from "../commons/queries";
import RecommendedSubRedditTable from "./RecommendedSubRedditTable";

// RecommendedSubRedditList component definition
export const RecommendedSubRedditList = () => {

    // State for the current subreddit
    const [subReddit, setSubReddit] = useState<string>('');

    // State for the occurrences of recommended subreddits
    const [subRedditOccurrences, setSubRedditOccurrences] = useState<[string, number][]>([]);

    // Effect to fetch recommended subreddits whenever the subreddit changes
    useEffect(() => {
        if (subReddit.trim() !== '') {

            // Function to fetch subreddit data and process it
            const fetchData = async () => {
                try {
                    // Fetch top authors for the given subreddit
                    let topAuthors = await searchSubredditPosts(subReddit, 'top');

                    // Fetch subreddits by each top author
                    const subRedditMatrix = await Promise.all(
                        topAuthors.map(author => searchSubredditsByUser(author))
                    );

                    // Object to track the occurrences of each subreddit
                    const subRedditOccurrencesMap: { [key: string]: number } = {};

                    // Populate the occurrences map
                    subRedditMatrix.forEach((list) => {
                        list.forEach((str) => {
                            // exclude input subreddit from the map
                            if(str.toLowerCase() != subReddit.toLowerCase()) {
                                console.log(str);
                                if (subRedditOccurrencesMap[str]) {
                                    subRedditOccurrencesMap[str] += 1;
                                } else {
                                    subRedditOccurrencesMap[str] = 1;
                                }
                            }
                        });
                    });

                    // Order the subreddits by their occurrences
                    const orderedSubRedditOccurrences = Object.entries(subRedditOccurrencesMap).sort(
                        (a, b) => b[1] - a[1]
                    );

                    // Set the ordered occurrences to state
                    setSubRedditOccurrences(orderedSubRedditOccurrences);



                } catch (error) {
                    console.error("There was an error fetching the data", error);
                }
            };

            // Invoke the fetchData function
            fetchData().catch(error => {
                console.error("Unexpected error in fetchData:", error);
            });;
        }
    }, [subReddit]); // The effect depends on the subReddit state

    // Render the component
    return (
        <div>
            {/* SearchBar to input subreddit and fetch recommendations */}
            <SearchBar onInputSubmit={setSubReddit}></SearchBar>

            {/* Table displaying the recommended subreddits */}
            <RecommendedSubRedditTable recommendedSubRedditList={subRedditOccurrences}></RecommendedSubRedditTable>
        </div>
    );
};
