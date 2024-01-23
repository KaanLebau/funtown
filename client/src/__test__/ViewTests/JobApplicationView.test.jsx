import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import JobApplicationView from '../../views/jobApplicationView/JobApplicationView';

describe('Job application view renders', () => {
  const position = ["ticket sales","lotteries","roller coaster operation"];
  const experience = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9,
    1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 
    2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9,
    3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 3.8, 3.9,];

    test("Labels correct", ()=>{
        render(<JobApplicationView position={position} experience={experience}/>);
        expect(screen.getByText('Position:')).toBeInTheDocument()
        expect(screen.getByText('Experience:')).toBeInTheDocument()
        expect(screen.getByText('From:')).toBeInTheDocument()
        expect(screen.getByText('To:')).toBeInTheDocument()
        expect(screen.getByTitle('Positions')).toBeInTheDocument()
        expect(screen.getByTitle('Experiences')).toBeInTheDocument()
       

    })
    test('The position and experince selector correct', ()=>{
        render(<JobApplicationView position={position} experience={experience}/>);
        expect(screen.getByTitle('Positions')).toBeInTheDocument()
        expect(screen.getByTitle('Experiences')).toBeInTheDocument()
    })

    test("Date selections correct",()=>{
        render(<JobApplicationView position={position} experience={experience}/>);
        expect(screen.getByTitle('Start date')).toBeInTheDocument()
        expect(screen.getByTitle('End date')).toBeInTheDocument()
        
    })
    test("Buttons correct", ()=> {
        render(<JobApplicationView position={position} experience={experience}/>);
        expect(screen.getByRole('button',{name : 'Apply'})).toBeInTheDocument()
        expect(screen.getByRole('button',{name : 'Cancel'})).toBeInTheDocument()
    })



  test('the position and experience options correctly', () => {
    render(<JobApplicationView position={position} experience={experience} />);
    
    position.forEach((thePostion) => {
      expect(screen.getByText(thePostion)).toBeInTheDocument();
    });

    
    experience.forEach((theExperience) => {
      expect(screen.getByText(theExperience.toString())).toBeInTheDocument();
    });
  });


  test('handles user interaction with position and experince correctly', () => {
    render(<JobApplicationView position={position} experience={experience} />);
    
    fireEvent.change(screen.getByTitle('Positions'), { target: { value: 'ticket sales' } });
    fireEvent.change(screen.getByTitle('Experiences'), { target: { value: '1.9' } });

    expect(screen.getByDisplayValue('ticket sales')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1.9')).toBeInTheDocument();
  });


  test("handles user interactopn with start & end date correctly", ()=>{
    render(<JobApplicationView position={position} experience={experience}/>);
    fireEvent.change(screen.getByTitle('Start date'), { target: { value: '2022-01-01' } });
    fireEvent.change(screen.getByTitle('End date'), { target: { value: '2022-01-11' } });
    expect(screen.getByTitle('Start date').value).toBe('2022-01-01');
    expect(screen.getByTitle('End date').value).toBe('2022-01-11');

  });
  
});
