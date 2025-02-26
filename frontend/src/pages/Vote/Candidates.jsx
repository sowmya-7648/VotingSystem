import { useState, useEffect } from "react";
import axios from "axios";

const Candidate = () => {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchCandidates = async () => {
            try {
                const response = await axios.get("http://localhost:8080/api/candidates"); // Adjust URL if needed
                setCandidates(response.data);
                setLoading(false);
            } catch (err) {
                setError("Failed to load candidates");
                setLoading(false);
            }
        };

        fetchCandidates();
    }, []);

    if (loading) return <p>Loading candidates...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Candidates</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {candidates.map((candidate) => (
                    <div
                        key={candidate._id}
                        className="border p-4 rounded-lg shadow-lg hover:shadow-xl hover:scale-105 hover:bg-gray-100 transition-transform duration-300"
                    >
                        <img
                            src={candidate.image}
                            alt={candidate.name}
                            className="h-40 object-cover rounded-md mx-auto block"
                            onError={(e) => (e.target.src = "/placeholder.png")} // Fallback image
                        />

                        <h3 className="text-xl font-semibold mt-2">{candidate.name}</h3>
                        <p className="text-gray-600"><strong>Party:</strong> {candidate.party}</p>
                        <p className="text-gray-600"><strong>Age:</strong> {candidate.age}</p>
                        <p className="text-gray-700">{candidate.bio}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Candidate;
