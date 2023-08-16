import React from "react";

interface Props {
    recommendedSubRedditList: [string, number][];
}

const RecommendedSubRedditTable: React.FC<Props> = ({ recommendedSubRedditList }) => {
    // Sort the list based on occurrences.
    const sortedList = [...recommendedSubRedditList].sort((a, b) => b[1] - a[1]);
    const segmentSize = Math.floor(sortedList.length / 5);

    const getStarRating = (index: number) => {
        if (index < segmentSize) return 5;
        if (index < segmentSize * 2) return 4;
        if (index < segmentSize * 3) return 3;
        if (index < segmentSize * 4) return 2;
        return 1;
    };

    return (
        <div className="bg-darkblue p-4">
            <table className="min-w-full divide-y divide-gray-600">
                <thead>
                <tr>
                    <th className="px-6 py-3 bg-gray-700 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                        SubReddit
                    </th>
                    <th className="px-6 py-3 bg-gray-700 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                        Rating
                    </th>
                </tr>
                </thead>

                <tbody className="bg-gray-800 divide-y divide-gray-600">
                {sortedList.map((item, index) => {
                    const starRating = getStarRating(index);

                    return (
                        <tr key={index}>
                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white">
                                {item[0]}
                            </td>
                            <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white flex items-center">
                                {"★".repeat(starRating)}{"☆".repeat(5 - starRating)}
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
