import { useEffect, useState } from "react";
import axios from "axios";

const Results = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/results", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setResults(response.data);
            } catch (err) {
                console.error("Failed to fetch results");
            } finally {
                setLoading(false);
            }
        };
        fetchResults();
    }, []);

    // Get total votes for percentage calculation
    const totalVotes = results.reduce((sum, candidate) => sum + candidate.votes, 0);

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">📊 Election Results</h2>

            {loading ? (
                <p className="text-lg text-gray-600 animate-pulse">Loading results...</p>
            ) : (
                <div className="bg-white text-gray-800 p-6 rounded-xl shadow-lg w-full max-w-2xl">
                    {results.length > 0 ? (
                        <ul className="space-y-4">
                            {results.map((candidate) => {
                                const votePercentage = totalVotes > 0 ? (candidate.votes / totalVotes) * 100 : 0;
                                return (
                                    <li key={candidate._id} className="flex flex-col bg-gray-50 p-4 rounded-lg shadow-sm border hover:shadow-md transition">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold">{candidate.name}</span>
                                            <span className="font-bold text-rose-600">{candidate.votes} votes</span>
                                        </div>
                                        <div className="w-full bg-gray-300 rounded-full h-2.5 mt-2">
                                            <div
                                                className="bg-rose-500 h-2.5 rounded-full"
                                                style={{ width: `${votePercentage}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-sm text-gray-500 mt-1">{votePercentage.toFixed(1)}% of total votes</p>
                                    </li>
                                );
                            })}
                        </ul>
                    ) : (
                        <p className="text-center text-lg font-semibold text-gray-600">No results available yet.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Results;
