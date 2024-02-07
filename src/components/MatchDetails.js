import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const MatchDetails = () => {
  const { matchId } = useParams();
  const [matchDetails, setMatchDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchMatchDetails = async () => {
      try {
        const url = `https://cricketapp-1-c4753567.deta.app/v2/get-match-score/${matchId}`;
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch match details');
        const { status, response: matchData } = await response.json();
        console.log(matchData)
        if (isMounted && status === 'ok') {
          setMatchDetails(matchData);
        } else {
          throw new Error('Match details not found');
        }
      } catch (error) {
        if (isMounted) setError(error.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchMatchDetails();
    // Update interval to 1 second (1000 milliseconds)
    const intervalId = setInterval(fetchMatchDetails, 1000);

    return () => {
      clearInterval(intervalId);
      isMounted = false; // Cleanup to prevent setting state after component unmount
    };
  }, [matchId]);

  if (loading) return <p>Loading match details...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!matchDetails) return <p>Match details are not available.</p>;

  return (
    <div>
      <h2>Match Details - {matchDetails.team_batting} vs {matchDetails.team_bowling}</h2>
      <p>Status: {matchDetails.status_str}</p>
      <p>{matchDetails.status_note}</p>
      <div>
        <h3>Live Score</h3>
        <p>Runs: {matchDetails.live_score.runs}</p>
        <p>Overs: {matchDetails.live_score.overs}</p>
        <p>Wickets: {matchDetails.live_score.wickets}</p>
        <p>Target: {matchDetails.live_score.target}</p>
        <p>Run Rate: {matchDetails.live_score.runrate}</p>
        <p>Required Run Rate: {matchDetails.live_score.required_runrate}</p>
      </div>
      {/* Add more details as needed */}
    </div>
  );
};

export default MatchDetails;
