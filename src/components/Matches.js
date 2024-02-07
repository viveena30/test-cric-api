import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMatches = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://cricketapp-1-c4753567.deta.app/v2/get-match/live"
        );
        if (!response.ok) throw new Error("Something went wrong");
        const data = await response.json();
        // Assuming the data structure matches the provided JSON
        if (data.status === "ok" && data.response.items) {
          setMatches(data.response.items);
        } else {
          throw new Error("No matches found");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  if (loading) return <p>Loading matches...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h2>Matches</h2>
      <ul>
        {/* {matches.map(match => (
          <li key={match.match_id}>
            <NavLink to={`/match/${match.match_id}`}>
              {match.teama.name} vs {match.teamb.name} - {match.short_title}
            </NavLink>
            <div>{match.subtitle}</div>
            <div>{match.status_str}: {match.live}</div>
          </li>
        ))} */}

        {matches.map((match) => (
          <li key={match.match_id}>
            <NavLink to={`/match/${match.match_id}`}>
              {match.teama.name} vs {match.teamb.name} - {match.short_title}
            </NavLink>
            <div>{match.subtitle}</div>
            <div>
              {match.status_str}: {match.live}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Matches;
