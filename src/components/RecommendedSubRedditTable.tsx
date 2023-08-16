import React from "react";

interface Props {
    recommendedSubRedditList: [string, number][];
}

const RecommendedSubRedditTable: React.FC<Props> = ({ recommendedSubRedditList }) => {
    // Step 1: Find the maximum occurrence.
    const maxOccurrence = Math.max(...recommendedSubRedditList.map(item => item[1]));
    console.log(recommendedSubRedditList);
    return (
        <div className="bg-darkblue p-4">
            <table className="min-w-full divide-y divide-gray-600">
                <thead>
                <tr>
                    <th className="px-6 py-3 bg-gray-700 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                        SubReddit
                    </th>
                    <th className="px-6 py-3 bg-gray-700 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                        Recommendation Score
                    </th>
                </tr>
                </thead>

                <tbody className="bg-gray-800 divide-y divide-gray-600">
                {recommendedSubRedditList.map((item, index) => {
                    // Step 2: Calculate the percentage score for each subreddit.
                    const percentageScore = (item[1] / maxOccurrence) * 100;

                    return (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white">
                                {item[0]}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white">
                                {/* Step 3: Display the percentage score. */}
                                {percentageScore.toFixed(2)}%
                            </td>
                        </tr>
                    );
                })}
                </tbody>
            </table>
        </div>
    );
};

export default RecommendedSubRedditTable;
