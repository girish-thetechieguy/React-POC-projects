import { keepPreviousData, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import ListGroup from 'react-bootstrap/ListGroup';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const fetchAdvisors = (pageId) => {
    return axios.get(`http://localhost:4000/advisors/?_limit=3&_page=${pageId}`);
}

const PaginatedAdvisors = () => {

    const [page, setPage] = useState(1);


    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["advisors", page],
        queryFn: () => fetchAdvisors(page),
        placeholderData: keepPreviousData
    })

    if (isLoading) {
        return <h2>Page is Loading...</h2>
    }

    if (isError) {
        return <h1>{error.message}</h1>
    }

    return (
        <Container>
            <Row>
                {data?.data.map(advisor => (
                    <Col>
                        <Card style={{ width: '20rem' }} key={advisor.id} to={`/advisors/${advisor.id}`}>
                            <Card.Img variant="top" src={advisor.headshot.url} />
                            <Card.Body>
                                <Card.Title>Name: {advisor.c_pagesAndAnswersName}</Card.Title>
                                <Card.Text>
                                    Position: {advisor.c_advisorTitle} <br />
                                    {advisor.c_advisorCategory}
                                </Card.Text>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>Address: {advisor.address.city}, {advisor.address.line1}, {advisor.address.line2},
                                    {advisor.address.region}, {advisor.address.countryCode},
                                    {advisor.address.postalCode} </ListGroup.Item>
                                <ListGroup.Item>Phone: {advisor.mainPhone}</ListGroup.Item>
                                {/* <ListGroup.Item>Quote: {advisor.c_advisorQuote}</ListGroup.Item> */}
                            </ListGroup>
                            <Card.Body>
                            <div className="d-flex gap-2">
                                <Button size="sm" variant="primary" onClick={() => window.location.href = `mailto:${advisor.c_heroCTA.link}`}>CONNECT WITH ME</Button>
                                <Button size="sm" variant="info" href={advisor.c_pagesURL}>View Profile</Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <center>
                <button onClick={() => setPage(prev => prev - 1)} disabled={page === 0 ? true : false}>Prev Page</button>
                <button onClick={() => setPage(prev => prev + 1)} disabled={page === 59 ? true : false}>Next Page</button>
            </center>
        </Container>
    );
}

export default PaginatedAdvisors