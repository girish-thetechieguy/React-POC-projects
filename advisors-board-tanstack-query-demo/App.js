import './App.css';
import PostsTraditional from './src/components/PostsTraditional';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import PostsRQ from './src/components/PostsRQ';
import Home from './src/components/Home';
import PostDetailsRQ from './src/components/PostDetailsRQ';
import PaginatedQueries from './src/components/PaginatedQueries';
import InfiniteQueries from './src/components/InfiniteQueries';

function App() {

  return (
    <BrowserRouter>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/posts">Traditional Posts</Link>
            </li>
            <li>
              <Link to="/rq-posts">RQ Posts</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/posts' element={<PostsTraditional />} />
          <Route exact path='/rq-posts' element={<PostsRQ />} />
          <Route exact path='/rq-posts/:postId' element={<PostDetailsRQ />} />
          <Route exact path='/paginated-fruits' element={<PaginatedQueries />} />
          <Route exact path='/infinite-fruits' element={<InfiniteQueries />} />
        </Routes>

      </div>
    </BrowserRouter>
  )
}

export default App;
