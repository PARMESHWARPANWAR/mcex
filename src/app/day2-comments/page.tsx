import { CommentList } from "@/components/Day2/Comment";

const commentsData = [
    {
        id: "c1",
        content: "This is an excellent implementation of nested comments!",
        timestamp: "2024-10-26T10:30:00Z",
        author: {
            id: "u1",
            name: "Sarah Chen",
            profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
            role: "Developer"
        },
        likes: 12,
        replies: [
            {
                id: "c2",
                content: "I agree! The recursion handling is particularly elegant.",
                timestamp: "2024-10-26T10:35:00Z",
                author: {
                    id: "u2",
                    name: "Alex Rodriguez",
                    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
                    role: "Senior Engineer"
                },
                likes: 8,
                replies: [
                    {
                        id: "c3",
                        content: "Could you explain more about how the recursion works here?",
                        timestamp: "2024-10-26T10:40:00Z",
                        author: {
                            id: "u3",
                            name: "Maya Patel",
                            profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maya",
                            role: "Student"
                        },
                        likes: 3,
                        replies: []
                    }
                ]
            }
        ]
    },
    {
        id: "c4",
        content: "Has anyone tried implementing this with Redux?",
        timestamp: "2024-10-26T11:00:00Z",
        author: {
            id: "u4",
            name: "Jordan Lee",
            profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jordan",
            role: "Full Stack Developer"
        },
        likes: 6,
        replies: [
            {
                id: "c5",
                content: "Yes! I used Redux Toolkit and it worked great. Here's what I did...",
                timestamp: "2024-10-26T11:15:00Z",
                author: {
                    id: "u5",
                    name: "Emma Wilson",
                    profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emma",
                    role: "Senior Developer"
                },
                likes: 15,
                replies: []
            }
        ]
    },
    {
        id: "c6",
        content: "The performance is impressive even with deeply nested comments",
        timestamp: "2024-10-26T12:00:00Z",
        author: {
            id: "u6",
            name: "Kai Zhang",
            profileImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Kai",
            role: "Performance Engineer"
        },
        likes: 9,
        replies: []
    }
]

export default function NestedComments() {
    return (
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Day 2: Nested Comments</h1>
        <CommentList comments={commentsData} />
      </div>
    );
  }