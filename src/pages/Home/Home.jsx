import HeroCarousel from "../../components/Carousel/HeroCarousel";
import Categories from "../../components/Categories/Categories";
import DiscountSection from "../../components/Discount/DiscountSection";
import Features from "../../components/Features";
import Product from "../Product/Product";

const Home = () => {
    return (
        <div>
            <HeroCarousel />
            <Features />
            <Categories />
            <Product />
            <DiscountSection />
        </div>
    );
};

export default Home;