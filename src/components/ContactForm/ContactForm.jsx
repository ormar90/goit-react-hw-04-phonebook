// import { useState } from 'react';
import PropTypes from 'prop-types';
import * as yup from 'yup';
import { Formik, ErrorMessage  } from 'formik';
import { nanoid } from 'nanoid'
import { Button, FieldStyled, FormStyled, Label, Message } from './ContactForm.styled';


const initialValues = {
    name: '',
    number: '',
}

let schema = yup.object().shape({
    name: yup
        .string()
        .matches(
            /^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/,
            "Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan")
        .required(),
    number: yup
        .string()
        .matches(
            /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
            "Phone number must be digits and can contain spaces, dashes, parentheses and can start with +")
        .required()  
});

export const ContactForm = ({ onSubmit }) => {

    const handleSubmit = (values, active) => {
        onSubmit({
            name: values.name,
            number: values.number,
            id: nanoid(3),
        })
        active.resetForm();
    }    
    
        return (
            <Formik
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={handleSubmit}
            >                   
                <FormStyled>
                    <Label htmlFor="name">
                        Name
                        <FieldStyled
                            type="text"
                            name="name"
                        />
                        <ErrorMessage name="name"  component={Message}/> 
                    </Label>
                    <Label htmlFor="number">
                        Number
                        <FieldStyled
                            type="tel"
                            name="number"
                        />
                        <ErrorMessage name="number" component={Message} />
                    </Label>
                    <Button type="submit">Add contact</Button>
                </FormStyled>
            </Formik>
        );
    }

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
}

