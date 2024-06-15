import BasketPageStyle from "./basketPage.module.scss";
import { Header } from "../header/header";
import { ProductWindow } from "../productWindow/productWindow";
import { useTypedSelector } from "../../hooks/userTypedSelector";

export const BasketPage = () => {
  const { products } = useTypedSelector((state) => state.favorites);
  return (
    <>
      <div className="wrapperMain">
        <Header />
        <div className={BasketPageStyle.body}>
          {products.map((e) => (
            <ProductWindow product={e} key={e.id} />
          ))}
        </div>
      </div>
    </>
  );
};
