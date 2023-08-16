import React from "react";

// Define the prop types for this component
interface Props {
    recommendedSubRedditList: [string, number][];
}

const RecommendedSubRedditTable: React.FC<Props> = ({ recommendedSubRedditList }) => {
    return (
        <div className="bg-darkblue p-4">

            <table className="min-w-full divide-y divide-gray-600">

                <thead>
                <tr>
                    <th className="px-6 py-3 bg-gray-700 text-left text-xs leading-4 font-medium text-white uppercase tracking-wider">
                        Recommended SubReddit List
                    </th>
                </tr>
                </thead>

                <tbody className="bg-gray-800 divide-y divide-gray-600">

                {recommendedSubRedditList.map((item, index) => (
                    <tr key={index}>
                        <td className="px-6 py-4 whitespace-no-wrap text-sm leading-5 text-white">
                            {item[0]} {}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

export default RecommendedSubRedditTable;
