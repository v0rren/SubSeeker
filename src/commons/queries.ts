// External imports
import axios from 'axios';

// Local imports
import SearchBar from "../components/SearchBar";

// Define the structure of a Post
export type Post = {
    title: string;
    author: string;  // The author of the post
};

/**
 * Searches for subreddits by their name.
 * @param subreddit - The name of the subreddit.
 * @returns An array of search results.
 */
export async function searchSubreddits(subreddit: string): Promise<any[]> {
    try {
        const response = await axios.get(`https://www.reddit.com/subreddits/search.json?q=${subreddit}&limit=100`);

        // Return the search result data directly.
        return response.data;
    } catch (error) {
        console.error('Error searching subreddits:', error);
        throw error;
    }
}

/**
 * Searches for posts within a specific subreddit.
 * @param subreddit - The subreddit to search within.
 * @param searchType - The type of search (e.g., 'new', 'hot', etc.)
 * @returns An array of post authors.
 */
export async function searchSubredditPosts(subreddit: string, searchType: string): Promise<string[]> {
    try {
        const res = await axios.get(`https://www.reddit.com/r/${subreddit}/${searchType}.json?limit=2`);

        // Extract post details from the response
        const posts: Post[] = res.data.data.children.map((child: any) => ({
            title: child.data.title,
            author: child.data.author,  // Extracting the author of the post
        }));

        // Extract and return just the authors from the posts
        const authors = posts.map(post => post.author);
        return authors;

    } catch (error) {
        console.error('Error searching subreddit post:', error);
        throw error;
    }
}

/**
 * Searches for subreddits where a specific user has made comments.
 * @param user - The username to search for.
 * @returns An array of subreddit names.
 */
export async function searchSubredditsByUser(user: string): Promise<string[]> {
    try {
        const res = await axios.get(`https://www.reddit.com/user/${user}/comments.json`);

        // 1. Extract subreddit names from the user's comments
        const subRedditNames: string[] = res.data.data.children.map((x: any) => x.data.subreddit);

        // 2. Convert to a Set to remove duplicates
        const uniqueSubRedditsSet: Set<string> = new Set(subRedditNames);

        // 3. Convert the Set back to an array for the final result
        const subReddits: string[] = Array.from(uniqueSubRedditsSet);
        return subReddits;

    } catch (error) {
        console.error('Error searching subreddit post:', error);
        throw error;
    }
}
