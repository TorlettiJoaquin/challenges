import type {Product} from "../types";
type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({product}) => {
  return (
    <div
      style={{
        border: "1px solid black",
        padding: 12,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>Valoracion: {"★".repeat(product.rating).padEnd(5, "☆")}</p>
        <p>{product.price.toLocaleString('es-AR', {style: "currency", currency:"ARS"})}</p>
        </div>
  );
};

export default ProductCard;
