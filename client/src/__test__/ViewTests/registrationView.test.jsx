import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import RegistrationView from '../../views/registrationView/RegistrationView'
import { wait } from '@testing-library/user-event/dist/utils';

const mockSubmit = jest.fn();

describe('Registration view renders', () => {
    test("labels correctly",()=>{
        render(<RegistrationView />);
        expect(screen.getByText('First Name:')).toBeInTheDocument()
        expect(screen.getByText('Last Name:')).toBeInTheDocument()
        expect(screen.getByText('Username:')).toBeInTheDocument()
        expect(screen.getByText('Email:')).toBeInTheDocument()
        expect(screen.getByText('Person nr:')).toBeInTheDocument()
        expect(screen.getByText('Password:')).toBeInTheDocument()
    })
    test("button correctly", ()=>{
        render(<RegistrationView/>);
        expect(screen.getByRole('button')).toBeInTheDocument()
    })


    test("error messages correctly",async ()=>{
        render(<RegistrationView onSubmit={mockSubmit} />)
        const userInteract = screen.getByRole('button') 
        
            fireEvent.click(userInteract)
        
        await wait(()=>{
            expect(screen.getByName("firstName")).not.toBe(null);
            expect(screen.getByName("firstName")).toHaveTextContent("First name required!");
            
            expect(screen.getByName("lastName")).not.toBe(null);
            expect(screen.getByName("lastName")).toHaveTextContent("Last name required!");

            expect(screen.getByName("username")).not.toBe(null);
            expect(screen.getByName("username")).toHaveTextContent("Username required!");
            
            expect(screen.getByName("email")).not.toBe(null);
            expect(screen.getByName("email")).toHaveTextContent("Email required!"); 

            expect(screen.getByName("pnr")).not.toBe(null);
            expect(screen.getByName("pnr")).toHaveTextContent("Person number required!"); 

            expect(screen.getByName("password")).not.toBe(null);
            expect(screen.getByName("password")).toHaveTextContent("Password required!");
        })
    })

    test("wrong email err correcly", async()=>{
        render(<RegistrationView onSubmit={mockSubmit} />)
        const userInteract = screen.getByRole('button') 
        const inputEmail = screen.getByTitle("Email")
        userEvent.type(inputEmail, 'test')
        fireEvent.click(userInteract)
        await wait(()=>{
            expect(screen.getByName("email")).not.toBe(null);
            expect(screen.getByName("email")).toHaveTextContent("Invalid email address!");
        })
    })

    test("user input correctly",async ()=>{
        render(<RegistrationView onSubmit={mockSubmit} />)
        const userInteract = screen.getByRole('button') 
        const inputName = screen.getByTitle("First name")
        const inputLastName = screen.getByTitle("Last name")
        const inputUsername = screen.getByTitle("Username")
        const inputEmail = screen.getByTitle("Email")
        const inputPnr = screen.getByTitle("Person number")
        const inputPassword = screen.getByTitle("Password")

        userEvent.type(inputName, 'test name')
        userEvent.type(inputLastName, 'test last name')
        userEvent.type(inputEmail, 'test@email.com')
        userEvent.type(inputPnr, '123456789')
        userEvent.type(inputUsername, 'test user')
        userEvent.type(inputPassword, 'test password')
        
        fireEvent.click(userInteract)
        
        await wait(()=>{
            expect(mockSubmit).toHaveBeenCalledWith({
                firstName: 'test name',
                lastName: 'test last name',
                email: 'test@email.com',
                pnr: '123456789',
                username: 'test user',
                password: 'test password',
              }, expect.anything());
        })
    })
   

})