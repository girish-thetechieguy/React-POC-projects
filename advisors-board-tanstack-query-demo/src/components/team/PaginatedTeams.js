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

const fetchTeams = (pageId) => {
    return axios.get(`http://localhost:4000/teams/?_limit=3&_page=${pageId}`);
}

const PaginatedTeams = () => {

    const [page, setPage] = useState(1);


    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["teams", page],
        queryFn: () => fetchTeams(page),
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
                {data?.data.map(team => (
                    <Col>
                        <Card style={{ width: '20rem' }} key={team.id} to={`/teams/${team.id}`}>
                            <Card.Body>
                                <Card.Title>Name: {team.name}</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>Address: {team.address.city}, {team.address.line1}, {team.address.line2},
                                    {team.address.region}, {team.address.countryCode},
                                    {team.address.postalCode} </ListGroup.Item>
                                <ListGroup.Item>Phone: {team.mainPhone}</ListGroup.Item>
                                {/* <ListGroup.Item>Quote: {advisor.c_advisorQuote}</ListGroup.Item> */}
                            </ListGroup>
                            <Card.Body>
                                {/* <Button variant="primary" href = mailto:{advisor.c_heroCTA.link}>CONNECT WITH ME</Button> */}
                                <Button variant="primary" onClick={() => window.location.href = `mailto:${team.c_heroCTA.link}`}>MAIL US</Button>
                                <Button variant="info" href={team.website}>Visit Our Website</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <center>
                <button onClick={() => setPage(prev => prev - 1)} disabled={page === 0 ? true : false}>Prev Page</button>
                <button onClick={() => setPage(prev => prev + 1)} disabled={page === 39 ? true : false}>Next Page</button>
            </center>
        </Container>
    );
}

export default PaginatedTeams
