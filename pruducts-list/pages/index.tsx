import type { GetStaticProps, NextPage } from "next";
import type { Product } from "../types";

import api from "../api";
import ProductCard from "../components/ProductCard";
import PriceRangeFilter from "../components/PriceRangeFilter";
import ColorFilter from "../components/ColorFilter";
import RatingFilter from "../components/RatingFilter";
import { useState, useMemo } from 'react';
import { Filter } from '../types';

type Props = {
  products: Product[];
};

export const getStaticProps: GetStaticProps<Props> = async () => {
  const products = await api.product.list();

  return {
    props: {
      products,
    },
  };
};

const Home: NextPage<Props> = ({ products }) => {
  const [filters, setFilters] = useState<Record<string, Filter>>({
    price: null,
    color: null,
    rating: null,
  });

  const matches = useMemo(() => {})

  console.log(filters)

  return (
    <main style={{ display: "flex", gap: 12 }}>
      <aside>
        <PriceRangeFilter />
        <ColorFilter
          products={products}
          onChange={(filter: Filter) =>
            setFilters((filters) => ({ ...filters, color: filter }))
          }
        />
        <RatingFilter />
      </aside>
      <section
        style={{
          flex: 1,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
          gap: "12px",
        }}
      >
        {products.map((product) => (
          <article key={product.id}>
            <ProductCard product={product} />
          </article>
        ))}
      </section>
    </main>
  );
};

export default Home;
