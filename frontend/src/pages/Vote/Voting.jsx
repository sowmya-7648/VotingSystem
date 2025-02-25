import { useState, useEffect } from "react";
import axios from "axios";

const Voting = () => {
    const [candidates, setCandidates] = useState([]);
    const token = localStorage.getItem("token");

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/vote/candidates", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setCandidates(response.data);
            } catch (err) {
                console.error("Failed to fetch candidates");
            }
        };
        fetchCandidates();
    }, []);

    const handleVote = async (candidateId) => {
        try {
            await axios.post(
                `http://localhost:8080/api/vote/${candidateId}`,
                {},
                { headers: { Authorization: `Bearer ${token}` } }
            );
            alert("Vote cast successfully!");
        } catch (err) {
            console.error("Voting failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold">Vote for a Candidate</h2>
            <ul>
                {candidates.map((candidate) => (
                    <li key={candidate._id} className="flex justify-between w-64 p-2 border-b">
                        <span>{candidate.name}</span>
                        <button onClick={() => handleVote(candidate._id)} className="bg-blue-500 text-white px-4 py-1 rounded">Vote</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Voting;
