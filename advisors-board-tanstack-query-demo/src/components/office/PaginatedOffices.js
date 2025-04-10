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

const fetchOffices = (pageId) => {
    return axios.get(`http://localhost:4000/offices/?_limit=3&_page=${pageId}`);
}

const PaginatedOffices = () => {

    const [page, setPage] = useState(1);


    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["offices", page],
        queryFn: () => fetchOffices(page),
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
                {data?.data.map(office => (
                    <Col>
                        <Card style={{ width: '20rem' }} key={office.id} to={`/offices/${office.id}`}>
                            <Card.Body>
                                <Card.Title>Name: {office.name} {office.id}</Card.Title>
                            </Card.Body>
                            <ListGroup className="list-group-flush">
                                <ListGroup.Item>Address: {office.address.city}, {office.address.line1}, {office.address.line2},
                                    {office.address.region}, {office.address.countryCode},
                                    {office.address.postalCode} </ListGroup.Item>
                                <ListGroup.Item>Phone: {office.mainPhone}</ListGroup.Item>
                                {/* <ListGroup.Item>Quote: {advisor.c_advisorQuote}</ListGroup.Item> */}
                            </ListGroup>
                            <Card.Body>
                                {/* <Button variant="primary" href = mailto:{advisor.c_heroCTA.link}>CONNECT WITH ME</Button> */}
                                <Button variant="primary" onClick={() => window.location.href = `mailto:${office.c_heroCTA.link}`}>MAIL US</Button>
                                <Button variant="info" href={office.website}>Visit Our Website</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
            <center>
                <button onClick={() => setPage(prev => prev - 1)} disabled={page === 0 ? true : false}>Prev Page</button>
                <button onClick={() => setPage(prev => prev + 1)} disabled={page === 12 ? true : false}>Next Page</button>
            </center>
        </Container>
    );
}

export default PaginatedOffices
