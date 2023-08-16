import React, {useState} from "react";


interface Props {
    recommendedSubRedditList: string[];
}

const RecommendedSubRedditTable: React.FC<Props> = ({ recommendedSubRedditList }) => {

    return (
        <div>
            {recommendedSubRedditList.map(subreddit => (
                <div key={subreddit}>{subreddit}</div>
            ))}
        </div>
    );
};

export default RecommendedSubRedditTable;
