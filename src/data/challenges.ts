export interface Challenge {
  Tutorial: number;
  title: string;
  description: string;
  path: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  category?: string;
}

export const challenges: Challenge[] = [
  {
    Tutorial: 1,
    title: "Accordion Component",
    path: "/day1-accordion",
    description: "Build a collapsible accordion component with smooth expand/collapse animations. Users can click on headers to reveal or hide content sections with CSS transitions."
  },
  {
    Tutorial: 2,
    title: "Nested Comments",
    path: "/day2-comments",
    description: "Create a Reddit-style comment system with unlimited nesting levels. Features include reply functionality, vote buttons, and proper indentation for threaded conversations."
  },
  {
    Tutorial: 3,
    title: "Image Slider",
    path: "/day3-image-slider",
    description: "Build a responsive image carousel with navigation arrows, dot indicators, and automatic slideshow functionality. Includes smooth transitions between images."
  },
  {
    Tutorial: 4,
    title: "Infinite Scroll",
    path: "/day4-infinite-scroll",
    description: "Implement endless scrolling that automatically loads more content as users reach the bottom of the page. Includes loading states and performance optimization."
  },
  {
    Tutorial: 5,
    title: 'Shimmer UI',
    path: '/day5-shimmer-ui',
    description: 'Create animated loading placeholders that mimic content structure while data loads. Features gradient animations that provide visual feedback during loading states.'
  },
  {
    Tutorial: 6,
    title: 'Kanban Board',
    path: '/day6-kanban-board',
    description: 'Build a Trello-like task management board with drag-and-drop functionality. Features multiple columns, card creation, editing, and status management.'
  },
  {
    Tutorial: 7,
    title: 'File Explorer',
    path: '/day7-file-explorer',
    description: 'Create a Windows/Mac-style file browser with folder navigation, file/folder icons, breadcrumb navigation, and basic file operations like create and delete.'
  },
  {
    Tutorial: 8,
    title: 'Auto Search',
    path: '/day8-auto-search',
    description: 'Build a search component with real-time suggestions, debounced input handling, keyboard navigation, and highlight matching text in results.'
  },
  {
    Tutorial: 9,
    title: 'Shopping Cart',
    path: '/day9-shopping-cart',
    description: 'Create a fully functional e-commerce cart with add/remove items, quantity adjustment, price calculation, and persistent storage using localStorage.'
  },
  {
    Tutorial: 10,
    title: 'Star Rating',
    path: '/day10-star-rating',
    description: 'Build an interactive 5-star rating component with hover effects, click handling, half-star support, and display of average ratings with user feedback.'
  },
  {
    Tutorial: 11,
    title: 'Pagination',
    path: '/day11-pagination',
    description: 'Implement a complete pagination system with page numbers, previous/next buttons, items per page selector, and efficient data handling for large datasets.'
  },
  {
    Tutorial: 12,
    title: 'YouTube Live Chat',
    path: '/day12-youtube-livechat',
    description: 'Create a real-time chat interface similar to YouTube Live with auto-scrolling messages, user avatars, timestamps, and emoji support.'
  },
  {
    Tutorial: 13,
    title: 'Multi Select',
    path: '/multi-select',
    description: 'Build a dropdown component that allows selecting multiple options with checkboxes, search filtering, select all functionality, and custom styling.'
  },
  {
    Tutorial: 14,
    title: 'Focus Enhancement Tool',
    path: '/focus',
    description: 'Create a concentration aid that highlights text as you type, dims surrounding content, and provides a distraction-free writing environment to improve focus.'
  },
  {
    Tutorial: 15,
    title: 'Password Generator',
    path: '/passwordgenerator',
    description: 'Build a secure password generator with customizable options for length, character sets (uppercase, lowercase, numbers, symbols), and strength indicators.'
  },
  {
    Tutorial: 16,
    title: 'OTP Login System',
    path: '/login-otp',
    description: 'Create a one-time password authentication flow with input fields for each digit, auto-focus navigation, resend functionality, and timer countdown.'
  },
  {
    Tutorial: 17,
    title: 'Traffic Light Simulator',
    path: '/trafic-light',
    description: 'Build an interactive traffic light system with automatic timing cycles, manual controls, and realistic color transitions between red, yellow, and green states.'
  },
  {
    Tutorial: 18,
    title: 'Web API Integration',
    path: '/fetch-web-api',
    description: 'Learn to fetch data from external APIs with proper error handling, loading states, data transformation, and displaying results in a user-friendly format.'
  },
  {
    Tutorial: 19,
    title: 'Multimodal Search API',
    path: '/multimodal-api',
    description: 'Build a search interface that handles multiple input types (text, images, voice) and integrates with AI APIs to provide comprehensive search results.'
  },
  {
    Tutorial: 20,
    title: 'Vector Database Comparison',
    path: '/faiss-pinecone',
    description: 'Compare and implement both FAISS and Pinecone vector databases for similarity search, including performance benchmarks and use case analysis.'
  }
];