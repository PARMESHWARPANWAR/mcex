import Link from 'next/link';

const challenges = [
  {
    Tutorial: 1,
    title: "Accordion Component",
    path: "/day1-accordion",
    description: "Single-level accordion with smooth animations"
  },
  {
    Tutorial: 2,
    title: "Nested Comments",
    path: "/day2-comments",
    description: "Infinitely nested comment system"
  },
  {
    Tutorial: 3,
    title: "Image Slider",
    path: "/day3-image-slider",
    description: "Basic Image Slider"
  },
  {
    Tutorial: 4,
    title: "Infinite Scroll",
    path: "/day4-infinite-scroll",
    description: "Infinite Scroll"
  },
  {
    Tutorial: 5,
    title: 'Shimmer UI',
    path: '/day5-shimmer-ui',
    description: 'Shimmer UI'
  },
  {
    Tutorial: 6,
    title: 'Kanban Board',
    path: '/day6-kanban-board',
    description: 'Kanban Board'
  },
  {
    Tutorial:7,
    title:'File Explorer',
    path:'/day7-file-explorer',
    description:'File Explorer'
  },
  {
    Tutorial:8,
    title:'Auto Search',
    path:'/day8-auto-search',
    description:'Auto Search'
  },
  {
    Tutorial:9,
    title:'Shopping Cart',
    path:'/day9-shopping-cart',
    description:'For Shopping Cart adding and remove product functionality'
  },
  {
    Tutorial:10,
    title:'Star Rating',
    path:'/day10-star-rating',
    description:'Star Rating'
  },
  {
    Tutorial:11,
    title:'Pagination',
    path:'/day11-pagination',
    description:'Pagination'
  },
  {
    Tutorial:12,
    title:'Youtube Live Chat',
    path:'/day12-youtube-livechat',
    description:'Youtube Live chat example '
  },
  {
    Tutorial:13,
    title:'Multi Select',
    path:'/multi-select',
    description:'Multi Select Example'
  },
  {
    Tutorial:14,
    title:'Increase Constration',
    path:'/focus',
    description:'Come Write Text And Focus on That Text to increase constration'
  },{
    Tutorial:15,
    title:'Password Generator',
    path:'/passwordgenerator',
    description:'Password Generator '
  },
  {
    Tutorial:16,
    title:'Login otp',
    path:'/login-otp',
    description:'Login otp Example'
  },
  {
    Tutorial:17,
    title:'Trafic Light',
    path:'/trafic-light',
    description:'Trafic Light'
  },
  {
    Tutorial:18,
    title:'Fetch Web Api',
    path:'/fetch-web-api',
    description:'Fetch Web Api'
  },
  {
    Tutorial:19,
    title:'Multi Modal Api Project',
    path:'/multimodal-api',
    description:'Multi Modal Search Api'
  },
];

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">
          Frontend Machine Coding Challenge
        </h1>
        <p className="text-gray-600">
          Common Frontend Interview Questions
        </p>
        <a href='https://github.com/PARMESHWARPANWAR/machine-coding-interview-questions-examples'>Source Code</a>
      </header>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {challenges.map((challenge) => (
          <Link
            key={challenge.Tutorial}
            href={challenge.path}
            className="block p-6 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition-all duration-200 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">
                Tutorial {challenge.Tutorial}: {challenge.title}
              </h2>
            </div>
            <p className="text-gray-600">{challenge.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}