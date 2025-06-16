import {
  BrowserRouter,
  Route,
  Routes,
  Link
} from 'react-router-dom';
import Home from '../pages/Home';
import ReshapeFix from '../pages/ReshapeFix';

const AppRoutes = () => {
  return (
    <BrowserRouter>
      {/* Navigation */}
      <nav className="bg-indigo-900 text-white p-4">
        <ul className="flex space-x-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/reshape">Visualize FIX Msg</Link></li>
        </ul>
      </nav>
      {/* Definition for routing */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reshape" element={<ReshapeFix />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
