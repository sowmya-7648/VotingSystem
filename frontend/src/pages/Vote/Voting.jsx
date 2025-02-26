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
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">🗳️ Vote for a Candidate</h2>

            {candidates.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {candidates.map((candidate) => (
                        <div
                            key={candidate._id}
                            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition border w-80 text-center"
                        >
                            <img
                                src={candidate.image || "/placeholder.png"}
                                alt={candidate.name}
                                className="h-24 rounded-full mx-auto object-cover border"
                                onError={(e) => (e.target.src = "/placeholder.png")}
                            />
                            <h3 className="text-xl font-semibold mt-4">{candidate.name}</h3>
                            <p className="text-gray-600"><strong>Party:</strong> {candidate.party}</p>
                            {/* <p className="text-gray-600"><strong>Age:</strong> {candidate.age}</p> */}

                            <button
                                onClick={() => handleVote(candidate._id)}
                                className="mt-4 bg-rose-500 text-white px-5 py-2 rounded-full hover:bg-rose-600 transition"
                            >
                                ✅ Vote
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <p className="text-lg text-gray-600">No candidates available</p>
            )}
        </div>
    );
};

export default Voting;
