import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import LoginPage from '../../views/loginView/LoginView'
import { wait } from '@testing-library/user-event/dist/utils';

const mockSubmit = jest.fn();

describe('Job application view renders', () => {
    test("labels correctly",()=>{
        render(<LoginPage/>);
        expect(screen.getByText('Username:')).toBeInTheDocument()
        expect(screen.getByText('Password:')).toBeInTheDocument()
    })
    test("button correctly", ()=>{
        render(<LoginPage/>);
        expect(screen.getByRole('button')).toBeInTheDocument()
    })


    test("error messages correctly",async ()=>{
        render(<LoginPage onSubmit={mockSubmit} />)
        const userInteract = screen.getByRole('button') 
        
            fireEvent.click(userInteract)
        
        await wait(()=>{
            expect(screen.getByName("username")).not.toBe(null);
            expect(screen.getByName("username")).toHaveTextContent("Username required!");
            expect(screen.getByName("password")).not.toBe(null);
            expect(screen.getByName("password")).toHaveTextContent("Password required!");
        })
    })

    test("user input correctly",async ()=>{
        render(<LoginPage onSubmit={mockSubmit} />)
        const userInteract = screen.getByRole('button') 
        const inputUsername = screen.getByTitle("Username")
        const inputPassword = screen.getByTitle("Password")

        userEvent.type(inputUsername, 'test user')
        userEvent.type(inputPassword, 'test password')
        
        fireEvent.click(userInteract)
        
        await wait(()=>{
            expect(mockSubmit).toHaveBeenCalledWith({
                username: 'test user',
                password: 'test password',
              }, expect.anything());
        })
    })
   

})