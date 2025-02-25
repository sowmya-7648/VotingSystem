import { useEffect, useState } from "react";
import axios from "axios";

const Candidate = () => {
    const [candidates, setCandidates] = useState([]);

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/candidates");
                setCandidates(response.data);
            } catch (err) {
                console.error("Failed to fetch candidates");
            }
        };
        fetchCandidates();
    }, []);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h2 className="text-2xl font-bold">Candidates</h2>
            <ul>
                {candidates.map((candidate) => (
                    <li key={candidate._id} className="p-2 border-b">{candidate.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default Candidate;
