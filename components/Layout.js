import React from 'react'
import { Container } from 'react-bootstrap'
import MainNav from '@/components/MainNav'

export default function Layout(props) {
    return (
        <>
        <MainNav />
            <Container>
            <br />
                {props.children}
            <br />
            </Container>
            <br />
        </>
    )
}