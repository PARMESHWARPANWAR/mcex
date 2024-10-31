import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom'
import KanbanBoard from "../KanbanBoard";

// Mock localStorage
const localStorageMock = (()=>{
    let store:{ [key: string]: string} = {};
    return {
        getItem: (key:string) => store[key] || null,
        setItem: (key:string, value:string) =>{
            store[key] = value;
        },
        clear: ()=>{
            store={};
        }
    };
})();

Object.defineProperty(window,'localStorage',{value:localStorageMock});

describe('KanbanBoard',()=>{
    beforeEach(()=>{
        localStorageMock.clear();
    });

    it('renders all default columns', ()=>{
        render(<KanbanBoard/>);

        // expect(screen.getByText('To Do')).toBeInTheDocument();
        // expect(screen.getByText('In Progress')).toBeInTheDocument();
        // expect(screen.getByText('Done')).toBeInTheDocument();
    });

    it('adds a new task when clicking the Add Task button', async ()=>{
        render(<KanbanBoard />);

        const input = screen.getByPlaceholderText('Add new task');
        const addButton = screen.getByText('Add Task');

        await userEvent.type(input, 'New test task');
        fireEvent.click(addButton);

        expect(screen.getByText('New test task')).toBeInTheDocument();
    })

    it('adds a new task when pressing Enter', async ()=>{
        render(<KanbanBoard/>);

        const input = screen.getByPlaceholderText('Add new task');

        await userEvent.type(input, 'New test task{enter}');

        expect(screen.getByText('New test task')).toBeInTheDocument();
    });

    it('does not add empty tasks', async () => {
        render(<KanbanBoard/>);

        const addButton = screen.getByText('Add Task');
        const taskCountBefore = screen.queryAllByRole('option').length;

        fireEvent.click(addButton);

        const taskCountAfter = screen.queryAllByRole('option').length;
        expect(taskCountBefore).toBe(taskCountAfter);
    })

    // it('deletes a task when clicking the delete button', async () =>{
    //     render(<KanbanBoard/>);

    //     // Add a task first
    //     const input = screen.getByPlaceholderText('Add new task');
    //     await userEvent.type(input, 'Task to delete{enter}');

    //     const task = screen.getByText('Task to delete');
    //     const taskContainer = task.closest('div');
    //     expect(taskContainer).toBeInTheDocument();

    //     // Hover over task to reveal delete button
    //     if(taskContainer){
    //         fireEvent.mouseEnter(taskContainer);
    //         const deleteButton = taskContainer.querySelector('button');
    //         expect(deleteButton).toBeInTheDocument();

    //         if(deleteButton){
    //             fireEvent.click(deleteButton);
    //         }
    //     }

    //     expect(screen.queryByText('Task to delete')).not.toBeInTheDocument();
    // })

    // it('persists data to localStorage', async () => {
    //     render(<KanbanBoard/>);

    //     // Add a task
    //     const input =  screen.getByPlaceholderText('Add new task');
    //     await userEvent.type(input, 'Persistent task{enter}');

    //     // Wait for localStorage to be updated
    //     await waitFor(()=>{
    //         const savedData = localStorage.getItem('kanbanColumns');
    //         expect(savedData).toBeTruthy();
    //         if(savedData){
    //             const parsedData = JSON.parse(savedData);
    //             expect(parsedData['To Do']).toContainEqual(
    //                 expect.objectContaining({
    //                     text:'Persistend task'
    //                 })
    //             )
    //         }
    //     });
    // });

    it('loads data from localStorage on mount', async ()=>{
        const initialData = {
            'To Do':[{
                id:1,
                text:'Saved task',
                created:new Date().toISOString()
            }],
            'In Progress':[],
            'Done':[]
        };

        localStorage.setItem('kanbanColumns',JSON.stringify(initialData));

        render(<KanbanBoard/>);

        await waitFor(()=>{
            expect(screen.getByText('Saved task')).toBeInTheDocument();
        });
    });

    // it('allows selecting different columns for new tasks', async ()=>{
    //     render(<KanbanBoard/>);

    //     const columnSelect = screen.getByRole('combobox');
    //     const input = screen.getByPlaceholderText('Add new task');

    //     // Select 'In Progress' column
    //     await userEvent.selectOptions(columnSelect, 'In Progress');
    //     await userEvent.type(input, 'Task in progress{enter}');

    //     // The task should be in the 'In Progress' column
    //     const inProgressColumn = screen.getByText('In Progress').closest('div');
    //     expect(inProgressColumn).toContainHTML('Task in progress');
    // });

    // Test drag and drop functionality
    it('handles drag and drop between columns', async () =>{

    })

    it('handles localStorage errors gracefully', () => {})
})