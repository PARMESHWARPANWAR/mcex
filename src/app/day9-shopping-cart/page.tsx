import ProductsPage from "@/components/Day9/Products";
import { BackButton } from "@/components/ui/BackButton";

export default function ShoppingCartPage() {
   
    return (
      <div className="container mx-auto p-4">
        <BackButton />
        <h1 className="text-3xl font-bold mb-8">Day 9: Shopping Cart</h1>
        <ProductsPage/>
      </div>
    );
}