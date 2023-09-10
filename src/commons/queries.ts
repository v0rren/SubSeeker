import axios from 'axios';

const BASE_URL = 'http://localhost:3000/subreddit';

export async function getRecommendedSubreddits(subreddit: string): Promise<any[]> {
    try {
        const response = await axios.get(`${BASE_URL}/getRecommendedSubreddits/${subreddit}`);
        return response.data;
    } catch (error) {
        console.error('Error getting recommended subreddits:', error);
        throw error;
    }
}
