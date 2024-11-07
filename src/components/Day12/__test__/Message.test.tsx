import React from 'react'
import { render,screen } from "@testing-library/react"
import "@testing-library/jest-dom";
import { Message } from '../Message';

const mockData = {
    id: 1,
    name: 'Test Name',
    content: 'Test Message',
    profileUrl: 'https://img.freepik.com/premium-photo/stylish-man-flat-vector-profile-picture-ai-generated_606187-310.jpg'
}
describe('Message Test',()=>{
    it("Should render user name",()=>{
        render(<Message {...mockData}/>)
        const nameText = screen.getByText('Test Name')

        expect(nameText).toBeInTheDocument();
    })
})