import axios from 'axios';
import SearchBar from "../components/SearchBar";

export type Post = {
    title: string;
    author: string;  // We store the author of the post
};
export async function searchSubreddits(subreddit: string): Promise<any[]> {
    try {
        const response = await axios.get(`https://www.reddit.com/subreddits/search.json?q=${subreddit}&limit=100`);

      // if (response.status === 200) {
      //     const subreddits: any[] = response;
      //         // Add other properties you need
      //     }));
      //     return subreddits;
      // } else {
      //     throw new Error(`Request failed with status: ${response.status}`);
      // }
        return response.data;
    } catch (error) {
        console.error('Error searching subreddits:', error);
        throw error;
    }
}

export async function searchSubredditPosts(subreddit: string, searchType: string): Promise<string[]> {
    try {
        const res = await axios.get(`https://www.reddit.com/r/${subreddit}/${searchType}.json?limit=2`);

        const posts: Post[] = res.data.data.children.map((child: any) => ({
            title: child.data.title,
            author: child.data.author,  // Extract the author of the post
        }));

        const authors = posts.map(post => post.author);

        return authors;
    } catch (error) {
        console.error('Error searching subreddit post:', error);
        throw error;
    }
}

export async function searchSubredditsByUser(user: string): Promise<string[]> {
    try {
        const res = await axios.get(`https://www.reddit.com/user/${user}/comments.json`);

        // The mistake is here. The subreddit name is present in `x.data.subreddit`, not `x.subreddit`.
        const subReddits: string[] = res.data.data.children.map((x : any) => {
            return x.data.subreddit;
        });

        return subReddits;
    } catch (error) {
        console.error('Error searching subreddit post:', error);
        throw error;
    }
}

