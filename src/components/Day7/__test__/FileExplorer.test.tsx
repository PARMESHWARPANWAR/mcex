import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FileExplorer } from '../FileExplorer';
import '@testing-library/jest-dom'

describe('FileExplorer', ()=>{
    const mockData = [
        {
            id: '1',
            name: 'Documents',
            type:'folder' as const,
            children:[
                {
                    id:'2',
                    name:'work.txt',
                    type:'file' as const,
                }
            ]
        }
    ];

    it('renders the file explorer with initial data', ()=>{
        render(<FileExplorer initialData={mockData}/>)

        expect(screen.getByText('Documents')).toBeInTheDocument();
        expect(screen.getByText('work.txt')).toBeInTheDocument();
    });

    it('creates a new file at root level', async ()=>{
        render(<FileExplorer initialData={mockData}/>);
        const createFileButton = screen.getByTestId('addfile');
        await userEvent.click(createFileButton);
        expect(screen.getByText('New File')).toBeInTheDocument();
    })

    it('creates a new folder at root level', async ()=>{
        render(<FileExplorer initialData={mockData}/>)
        const createFolderButton = screen.getByTestId('addfolder');
        await userEvent.click(createFolderButton);
        expect(screen.getByText('New Folder')).toBeInTheDocument();
    });

    // it('deletes a file when using context menu', async ()=>{
    //     render(<FileExplorer initialData={mockData}/>);
    //     const fileElement = screen.getByText('work.txt');

    //     // Open context menu
    //     fireEvent.contextMenu(fileElement);

    //     // Click delete option
    //     const deleteOption = screen.getByText('Delete');
    //     await userEvent.click(deleteOption);

    //     expect(screen.queryByText('work.txt')).not.toBeInTheDocument();
    // });

    // it('supports drag and drop between folders', async ()=>{
    //     const complexMockData = [
    //         {
    //             id: '1',
    //             name: 'Folder 1',
    //             type: 'folder' as const,
    //             children: [
    //               {
    //                 id: '2',
    //                 name: 'test.txt',
    //                 type: 'file' as const,
    //               },
    //             ],
    //           },
    //           {
    //             id: '3',
    //             name: 'Folder 2',
    //             type: 'folder' as const,
    //             children: [],
    //           },
    //     ]

    //     render(<FileExplorer initialData={complexMockData}/>);

    //     const sourceFile = screen.getByText('test.txt');
    //     const targetFolder = screen.getByText('Folder 2');
    //     fireEvent.dragStart(sourceFile);
    //     fireEvent.dragOver(targetFolder);
    //     fireEvent.drop(targetFolder);
        
    //     // The file should now be under Folder 2
    //     expect(targetFolder.parentElement?.textContent).toContain('test.txt');
    // })
})