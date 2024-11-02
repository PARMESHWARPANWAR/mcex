export type SearchResult = {
    id: string;
    title: string;
    description: string;
};

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image?: string;
  }