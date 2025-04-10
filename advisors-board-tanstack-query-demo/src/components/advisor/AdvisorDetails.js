import { keepPreviousData, useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useParams } from "react-router-dom"

const fetchAdvisorDetails = (postId) => {
    return axios.get(`http://localhost:4000/advisors/${postId}`);
}

const PostDetailsRQ = () => {

    const { postId } = useParams()

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["advisors", postId],
        queryFn: () => fetchAdvisorDetails(postId)
    })


    if (isLoading) {
        return <div>Page is loading...</div>
    }

    if (isError) {
        return <div>{error.message}</div>
    }

    const { title, body } = data?.data || {};


    return (
        <div className="advisor-details-container">
            <div className="advisor-details-title">{title}</div>
            <div className="advisor-details-body">{body}</div>
        </div>
    )
}

export default PostDetailsRQ