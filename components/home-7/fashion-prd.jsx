import Link from "next/link";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectProducts,
  single_product,
} from "../../redux/features/product-slice";
import ProductModal from "../common/modal/product-modal";
import Image from "next/image";

const FashionProduct = () => {
  const products = useSelector(selectProducts);
  const fashion_products = products
    .map((item) => item.product)
    .flat()
    .filter((item) => item.bestSelling);
  return (
    <>
      <div className="product__view-area pt-60 pb-60">
        <div className="container custom-container-2">
          <div className="row">
            <div className="col-xl-12">
              <div className="section__wrapper text-center">
                <h3 className="section__title-2">
                  <span>BESTSELLER PRODUCTS</span>
                </h3>
                <p>Eodem modo typi, qui nunc nobis videntur parum clari</p>
              </div>
            </div>
          </div>
          <div className="row mt-40">
            <div className="col-xl-6 col-lg-6">
              <div className="row">
                <div className="col-lg-12">
                  <div className="row">
                    {fashion_products.slice(0, 2).map((prd) => (
                      <SingleFashionPrd key={prd.id} prd={prd} />
                    ))}
                  </div>
                </div>
                <div className="col-lg-12">
                  <FashionBigProduct prdNumber={0} />
                </div>
              </div>
            </div>

            <div className="col-lg-6 col-lg-6">
              <div className="row">
                <div className="col-lg-12">
                  <FashionBigProduct prdNumber={1} />
                </div>
                <div className="col-lg-12">
                  <div className="row">
                    {fashion_products.slice(2, 4).map((prd) => (
                      <SingleFashionPrd key={prd.id} prd={prd} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FashionProduct;

const SingleFashionPrd = ({ prd }) => {
  const dispatch = useDispatch();
  return (
    <>
      <div className="col-xl-6 col-lg-12 col-md-6">
        <div className="product__item mb-40">
          <div className="product__wrapper">
            <div className="product__thumb">
              <Link href={`/product-details/${prd.id}`}>
                <a className="w-img">
                  <Image
                    src={prd.image}
                    width="200"
                    height="200"
                    layout="responsive"
                    alt={prd.name}
                  />
                </a>
              </Link>
              <div className="product__action-3 transition-3">
                <Link href={`/product-details/${prd.id}`}>
                  <a className="action-btn">
                    <i className="fal fa-plus"></i> Select Option
                  </a>
                </Link>

                <a
                  className="action-btn"
                  onClick={() => dispatch(single_product(prd.id))}
                  href="#"
                  data-bs-toggle="modal"
                  data-bs-target="#productModalId"
                >
                  <i className="fal fa-eye"></i>
                </a>
              </div>
              {prd.new && (
                <div className="product__sale product__sale-3">
                  <span className="new">new</span>
                </div>
              )}
            </div>
            <div className="product__content product__content-2 p-relative text-center">
              <div className="product__content-inner">
                <div className="rating">
                  <a href="#">
                    <i className="fal fa-star"></i>
                  </a>
                  <a href="#">
                    <i className="fal fa-star"></i>
                  </a>
                  <a href="#">
                    <i className="fal fa-star"></i>
                  </a>
                  <a href="#">
                    <i className="fal fa-star"></i>
                  </a>
                  <a href="#">
                    <i className="fal fa-star"></i>
                  </a>
                </div>
                <h4>
                  <Link href={`/product-details/${prd.id}`}>
                    <a>{prd.name}</a>
                  </Link>
                </h4>
                <div className="product__price-3">
                  <span>${prd.price}.00</span>
                  {prd.old_price && (
                    <span className="old-price">
                      <del> ${prd.old_price}.00</del>
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* product modal start */}
      <ProductModal />
      {/* product modal end */}
    </>
  );
};

const FashionBigProduct = ({ prdNumber }) => {
  const products = useSelector((state) => state.products.products);
  const fashion_big_prd = products
    .map((item) => item.product)
    .flat()
    .filter((item) => item.bestSelling);
  return (
    <div className="product__big-image effectThree mb-40">
      <Link href={`/product-details/${fashion_big_prd[prdNumber].id}`}>
        <a>
          <Image
            src={`${fashion_big_prd[prdNumber].image}`}
            width="200"
            height="200"
            layout="responsive"
            alt={`${fashion_big_prd[prdNumber].name}`}
          />
        </a>
      </Link>
    </div>
  );
};
