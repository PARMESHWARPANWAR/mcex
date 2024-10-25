import { Accordion } from "@/components/Day1/Accordion"

const accordionData = [
    {
        id: 1,
        title: "Section 1",
        content: "Content for section 1. This section discusses important details about topic 1. You can add multiple paragraphs or any other content here."
    },
    {
        id: 2,
        title: "Section 2",
        content: "Content for section 2. Here we explore the various aspects of topic 2. This section can be expanded to show more information."
    },
    {
        id: 3,
        title: "Section 3",
        content: "Content for section 3. The final section covers remaining points about topic 3. Click the header to expand or collapse this section."
    }
];

export default function AccordionPage() {
    return (
        <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-8">Day1: Accordion Component</h1>
            <Accordion items={accordionData} />
        </div>
    )
}