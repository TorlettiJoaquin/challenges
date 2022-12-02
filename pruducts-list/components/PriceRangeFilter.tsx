import { Filter } from "../types";
import { useState } from "react";

type Props = {
  onChange: (filter: Filter) => void;
};

const PriceRangeFilter: React.FC<Props> = ({ onChange }) => {
  const [min, setMin] = useState<number>(0);
  const [max, setMax] = useState<number>(0);

  const [selected, setSelected] = useState<Set<number>>(() => new Set());

  function handleChangeMin(value: number) {
    setMin(value);

    onChange(
      value ? (product) => product.price >= value && product.price <= max : null
    );
  }

  function handleChangeMax(value: number) {
    setMax(value);

    onChange(
      value ? (product) => product.price >= min && product.price <= value : null
    );
  }

  return (
    <div
      style={{
        border: "1px solid white",
        padding: "12px",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <h4>Price</h4>
      <ul>
        <li style={{ listStyle: "none" }}>
          <label style={{ display: "flex", gap: 12 }}>
            Minimo:
            <input
              onChange={(e) => handleChangeMin(Number(e.target.value))}
              type="number"
              name="price"
              value={min}
            />
          </label>
        </li>
        <li style={{ listStyle: "none" }}>
          <label style={{ display: "flex", gap: 12 }}>
            Maximo:
            <input
              onChange={(e) => handleChangeMax(Number(e.target.value))}
              type="number"
              name="price"
              value={max}
            />
          </label>
        </li>
      </ul>
    </div>
  );
};

export default PriceRangeFilter;
