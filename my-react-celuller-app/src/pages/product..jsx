import SideBar from "../components/Layout/sideBar";
import ProductPage from "../components/fragments/productPage";

const Product = () => {
  return (
    <div className="w-full flex">
      <SideBar />
      <ProductPage />
    </div>
  );
};

export default Product;
