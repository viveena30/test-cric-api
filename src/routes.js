import Matches from './components/Matches';
import MatchDetails from './components/MatchDetails';

const routes = [
  { path: '/', element: Matches, exact: true },
  { path: '/match/:matchId', element: MatchDetails },
];

export default routes;
