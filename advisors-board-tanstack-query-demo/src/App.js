import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PaginatedAdvisors from './components/advisor/PaginatedAdvisors';
import PaginatedTeams from './components/team/PaginatedTeams';
import PaginatedOffices from './components/office/PaginatedOffices';


function App() {

  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/advisors">Advisors</Link>
            </li>
            <li>
              <Link to="/teams">Teams</Link>
            </li>
            <li>
              <Link to="/offices">Offices</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path='/advisors' element={<PaginatedAdvisors />} />
          <Route exact path='/teams' element={<PaginatedTeams />} />
          <Route exact path='/offices' element={<PaginatedOffices />} />
        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App;
