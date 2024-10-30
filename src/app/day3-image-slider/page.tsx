import { ImageSlider } from "@/components/Day3/ImageSlider";
import { BackButton } from "@/components/ui/BackButton";

const imageList = [
    "https://img.freepik.com/premium-photo/grainy-gradient-background-red-white-blue-colors-with-soft-faded-watercolor-border-texture_927344-24167.jpg",
    "https://t4.ftcdn.net/jpg/09/09/16/93/360_F_909169323_g3WDMyzG8JvRQ1stqcOuATa3e6Ki7CmI.jpg",
    "https://t4.ftcdn.net/jpg/08/32/30/07/360_F_832300776_E6NKEowvwYvGaYx07xN5Xqhym7UzN479.jpg",
    "https://png.pngtree.com/thumb_back/fh260/background/20220204/pngtree-space-sky-background-image_985633.jpg",
    "https://png.pngtree.com/background/20210714/original/pngtree-realistic-galaxy-background-design-2020-picture-image_1249279.jpg"
]


export default function ImageSliderPage() {
    return (
      <div className="container mx-auto p-4">
        <BackButton />
        <h1 className="text-3xl font-bold mb-8">Day 3: Image Slider</h1>
        <ImageSlider imageList={imageList} autoPlay={true}/>
      </div>
    );
}