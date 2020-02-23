import React from 'react';
import {
    Form,
    Col,
    Button
} from 'react-bootstrap';
import { useForm } from 'react-hook-form';

import { createLogEntry} from './API';


const LogEntryForm = ( { location }) =>{
    const { register, handleSubmit } = useForm();

    const onSubmit = async (data) => {
        try{
            data.latitude = location.latitude;
            data.longitude = location.longitude;
            const created = await createLogEntry(data);
            console.log(created); 
        } catch (error) {
            console.error(error);
        }
    }

    const reload = () =>{
        window.location.reload()
    }

    return(
        <Form onSubmit={handleSubmit(onSubmit)} >
        <Form.Row>
            <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Title</Form.Label>
            <Form.Control ref={register} type="text" name="title" placeholder="Enter Title" />
            </Form.Group>
        </Form.Row>
        
        <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control ref={register} as="textarea" name="description" rows="3" />
        </Form.Group>
        
        <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Comment</Form.Label>
            <Form.Control ref={register} as="textarea" name="comment" rows="3" />
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Image</Form.Label>
            <Form.Control ref={register} type="text" name="image" placeholder="paste img URL here"/>
        </Form.Group>

        <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Visited at</Form.Label>
            <Form.Control ref={register} type="date" name="visitDate"/>
        </Form.Group>
        
        <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Rating</Form.Label>
            <Form.Control ref={register} type="number" name="rating" placeholder="x/10" />
        </Form.Group>
        
        
        <input onClick={reload} type= "submit"/>
        </Form>
    )
}

export default LogEntryForm;