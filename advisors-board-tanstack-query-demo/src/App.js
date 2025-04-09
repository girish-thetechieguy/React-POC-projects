import './App.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PostsRQ from './components/PostsRQ';
import PostDetailsRQ from './components/PostDetailsRQ';
import PaginatedQueries from './components/PaginatedQueries';
import InfiniteQueries from './components/InfiniteQueries';

function App() {

  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/rq-posts">RQ Posts</Link>
            </li>
          </ul>
        </nav>
        <Routes>
        <Route exact path='/rq-posts' element={<PostsRQ />} />
        <Route exact path='/advisors' element={<Advisors />} />
        <Route exact path='/teams' element={<Teams />} />
        <Route exact path='/offices' element={<Offices />} />
          
          <Route exact path='/rq-posts/:postId' element={<PostDetailsRQ />} />
          <Route exact path='/paginated-fruits' element={<PaginatedQueries />} />
          <Route exact path='/infinite-fruits' element={<InfiniteQueries />} />
        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App;
