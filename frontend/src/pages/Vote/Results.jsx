import { useEffect, useState } from "react";
import axios from "axios";

const Results = () => {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/vote/results", {
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

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold">Election Results</h2>
            {loading ? (
                <p>Loading results...</p>
            ) : (
                <ul className="w-96 p-4 border rounded shadow-lg">
                    {results.length > 0 ? (
                        results.map((candidate) => (
                            <li key={candidate._id} className="flex justify-between py-2 border-b">
                                <span>{candidate.name}</span>
                                <span className="font-bold">{candidate.votes} votes</span>
                            </li>
                        ))
                    ) : (
                        <p>No results available yet.</p>
                    )}
                </ul>
            )}
        </div>
    );
};

export default Results;
