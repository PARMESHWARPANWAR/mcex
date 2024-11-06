import React, {act} from 'react'
import { render,screen } from "@testing-library/react"
import { Pagination, Product } from "../Pagination"
import "@testing-library/jest-dom";

const mockData : Product[] = [{
    "id": 11,
    "title": "Annibale Colombo Bed",
    "price": 1899.99,
    "description": "The Annibale Colombo Bed is a luxurious and elegant bed frame, crafted with high-quality materials for a comfortable and stylish bedroom.",
    "rating": 4.14,
    "thumbnail": "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Bed/thumbnail.png",
    "discountPercentage": 0.29
  },
  {
    "id": 12,
    "title": "Annibale Colombo Sofa",
    "price": 2499.99,
    "description": "The Annibale Colombo Sofa is a sophisticated and comfortable seating option, featuring exquisite design and premium upholstery for your living room.",
    "rating": 3.08,
    "thumbnail": "https://cdn.dummyjson.com/products/images/furniture/Annibale%20Colombo%20Sofa/thumbnail.png",
    "discountPercentage": 18.54
  },
  {
    "id": 13,
    "title": "Bedside Table African Cherry",
    "price": 299.99,
    "description": "The Bedside Table in African Cherry is a stylish and functional addition to your bedroom, providing convenient storage space and a touch of elegance.",
    "rating": 4.48,
    "thumbnail": "https://cdn.dummyjson.com/products/images/furniture/Bedside%20Table%20African%20Cherry/thumbnail.png",
    "discountPercentage": 9.58
  },
  {
    "id": 14,
    "title": "Knoll Saarinen Executive Conference Chair",
    "price": 499.99,
    "description": "The Knoll Saarinen Executive Conference Chair is a modern and ergonomic chair, perfect for your office or conference room with its timeless design.",
    "rating": 4.11,
    "thumbnail": "https://cdn.dummyjson.com/products/images/furniture/Knoll%20Saarinen%20Executive%20Conference%20Chair/thumbnail.png",
    "discountPercentage": 15.23
  },
  {
    "id": 15,
    "title": "Wooden Bathroom Sink With Mirror",
    "price": 799.99,
    "description": "The Wooden Bathroom Sink with Mirror is a unique and stylish addition to your bathroom, featuring a wooden sink countertop and a matching mirror.",
    "rating": 3.26,
    "thumbnail": "https://cdn.dummyjson.com/products/images/furniture/Wooden%20Bathroom%20Sink%20With%20Mirror/thumbnail.png",
    "discountPercentage": 11.22
  },
  {
    "id": 16,
    "title": "Apple",
    "price": 1.99,
    "description": "Fresh and crisp apples, perfect for snacking or incorporating into various recipes.",
    "rating": 2.96,
    "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Apple/thumbnail.png",
    "discountPercentage": 1.97
  },
  {
    "id": 17,
    "title": "Beef Steak",
    "price": 12.99,
    "description": "High-quality beef steak, great for grilling or cooking to your preferred level of doneness.",
    "rating": 2.83,
    "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Beef%20Steak/thumbnail.png",
    "discountPercentage": 17.99
  },
  {
    "id": 18,
    "title": "Cat Food",
    "price": 8.99,
    "description": "Nutritious cat food formulated to meet the dietary needs of your feline friend.",
    "rating": 2.88,
    "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Cat%20Food/thumbnail.png",
    "discountPercentage": 9.57
  },
  {
    "id": 19,
    "title": "Chicken Meat",
    "price": 9.99,
    "description": "Fresh and tender chicken meat, suitable for various culinary preparations.",
    "rating": 4.61,
    "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Chicken%20Meat/thumbnail.png",
    "discountPercentage": 10.46
  },
  {
    "id": 20,
    "title": "Cooking Oil",
    "price": 4.99,
    "description": "Versatile cooking oil suitable for frying, sautéing, and various culinary applications.",
    "rating": 4.01,
    "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Cooking%20Oil/thumbnail.png",
    "discountPercentage": 18.89
  },
  {
    "id": 21,
    "title": "Cucumber",
    "price": 1.49,
    "description": "Crisp and hydrating cucumbers, ideal for salads, snacks, or as a refreshing side.",
    "rating": 4.71,
    "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Cucumber/thumbnail.png",
    "discountPercentage": 11.44
  },
  {
    "id": 22,
    "title": "Dog Food",
    "price": 10.99,
    "description": "Specially formulated dog food designed to provide essential nutrients for your canine companion.",
    "rating": 2.74,
    "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Dog%20Food/thumbnail.png",
    "discountPercentage": 18.15
  },
  {
    "id": 23,
    "title": "Eggs",
    "price": 2.99,
    "description": "Fresh eggs, a versatile ingredient for baking, cooking, or breakfast.",
    "rating": 4.46,
    "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Eggs/thumbnail.png",
    "discountPercentage": 5.8
  },
  {
    "id": 24,
    "title": "Fish Steak",
    "price": 14.99,
    "description": "Quality fish steak, suitable for grilling, baking, or pan-searing.",
    "rating": 4.83,
    "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Fish%20Steak/thumbnail.png",
    "discountPercentage": 7
  },
  {
    "id": 25,
    "title": "Green Bell Pepper",
    "price": 1.29,
    "description": "Fresh and vibrant green bell pepper, perfect for adding color and flavor to your dishes.",
    "rating": 4.28,
    "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Green%20Bell%20Pepper/thumbnail.png",
    "discountPercentage": 15.5
  },
  {
    "id": 26,
    "title": "Green Chili Pepper",
    "price": 0.99,
    "description": "Spicy green chili pepper, ideal for adding heat to your favorite recipes.",
    "rating": 4.43,
    "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Green%20Chili%20Pepper/thumbnail.png",
    "discountPercentage": 18.51
  },
  {
    "id": 27,
    "title": "Honey Jar",
    "price": 6.99,
    "description": "Pure and natural honey in a convenient jar, perfect for sweetening beverages or drizzling over food.",
    "rating": 3.5,
    "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Honey%20Jar/thumbnail.png",
    "discountPercentage": 1.91
  },
  {
    "id": 28,
    "title": "Ice Cream",
    "price": 5.49,
    "description": "Creamy and delicious ice cream, available in various flavors for a delightful treat.",
    "rating": 3.77,
    "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Ice%20Cream/thumbnail.png",
    "discountPercentage": 7.58
  },
  {
    "id": 29,
    "title": "Juice",
    "price": 3.99,
    "description": "Refreshing fruit juice, packed with vitamins and great for staying hydrated.",
    "rating": 3.41,
    "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Juice/thumbnail.png",
    "discountPercentage": 5.45
  },
  {
    "id": 30,
    "title": "Kiwi",
    "price": 2.49,
    "description": "Nutrient-rich kiwi, perfect for snacking or adding a tropical twist to your dishes.",
    "rating": 4.37,
    "thumbnail": "https://cdn.dummyjson.com/products/images/groceries/Kiwi/thumbnail.png",
    "discountPercentage": 10.32
}]

global.fetch = jest.fn(() =>
   Promise.resolve({
      json : () => Promise.resolve({ products: mockData, total: mockData.length })
   })
)

describe('Paginatin Test', ()=>{
    it("should render",async ()=>{
        await act(()=>render(<Pagination/>))

        const allCards = screen.getAllByTestId('card')
        expect(allCards.length).toBe(20)
    })
})