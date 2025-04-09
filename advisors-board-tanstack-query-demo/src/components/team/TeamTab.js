import axios from 'axios'
import { Link } from 'react-router-dom'

//GET method
const fetchPosts = () => {
    return axios.get("http://localhost:4000/posts");
}


const TeamTab = () => {

    const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts
    })

    if (isLoading) {
        return <div>Page is loading...</div>
    }

    if (isError) {
        return <div>{error.message}</div>
    }


    return (
        <div className='post-list'>
            {data?.data.map(post => (
                <Link key={post.id} to={`/rq-posts/${post.id}`}>
                    <div className='post-item' key={post.id}>
                        <h3 className='post-title'>{post.title}</h3>
                        <p className='post-body'>{post.body}</p>
                    </div>
                </Link>
            ))}
        </div>
    );
}

export default TeamTab