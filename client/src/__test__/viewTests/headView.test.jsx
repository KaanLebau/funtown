import { render, screen } from "@testing-library/react"
import '@testing-library/jest-dom';
import HeadView from "../../views/headView/HeadView"

describe('Head view renders', ()=>{
    test('Funtown on the page', () => { 
        render(<HeadView/>)
        expect(screen.getByText('Funtown')).toBeInTheDocument()
    })

    test('Logout when there is a user', () => {
        const theUser = {name: "kaan"};
        render(<HeadView user ={theUser} />)
        expect(screen.getByTitle('logout')).toBeInTheDocument()
    })

    test('Logout is absent when there is no user logged in', () => {
        
        render(<HeadView />)
        expect(screen.queryByTestId('logout-icon')).toBeNull()
    })
})
    
