import { useState, useEffect } from "react";
import axios from "axios";

const Voting = () => {
    const [candidates, setCandidates] = useState([]);
    const [token, setToken] = useState(localStorage.getItem("token") || "");
    const [voterId, setVoterId] = useState(localStorage.getItem("voterId") || "");

    useEffect(() => {
        const fetchCandidates = async () => {
            if (!token) {
                console.error("No token found. User must log in.");
                return;
            }

            try {
                const response = await axios.get("http://localhost:8080/api/candidates", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCandidates(response.data);
            } catch (err) {
                console.error("Failed to fetch candidates", err.response?.data || err);
            }
        };

        fetchCandidates();
    }, [token]);

    const handleVote = async (candidateId) => {
        // Re-fetch token and voterId in case they were updated
        const currentToken = localStorage.getItem("token");
        const currentVoterId = localStorage.getItem("voterId");

        if (!currentToken || !currentVoterId) {
            alert("You must be logged in to vote.");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:8080/api/votes",
                { voterId: currentVoterId, candidateId },
                { headers: { Authorization: `Bearer ${currentToken}` } }
            );

            alert(response.data.message); // Show success message from server
        } catch (err) {
            console.error("Voting failed", err.response?.data || err);
            alert(err.response?.data?.message || "Failed to cast vote");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold">Vote for a Candidate</h2>
            <ul>
                {candidates.length > 0 ? (
                    candidates.map((candidate) => (
                        <li key={candidate._id} className="flex justify-between w-64 p-2 border-b">
                            <span>{candidate.name}</span>
                            <button
                                onClick={() => handleVote(candidate._id)}
                                className="bg-blue-500 text-white px-4 py-1 rounded"
                            >
                                Vote
                            </button>
                        </li>
                    ))
                ) : (
                    <p>No candidates available</p>
                )}
            </ul>
        </div>
    );
};

export default Voting;
