import { Product, Filter } from "../types";
import { useMemo, useState } from "react";

type Props = {
  products: Product[];
  onChange: (filter: Filter) => void;
};

const ColorFilter: React.FC<Props> = ({ products, onChange }) => {
  const [selected, setSelected] = useState<Set<string>>(() => new Set());
  const colors = useMemo(() => {
    const buffer: Set<string> = new Set();

    for (let product of products) {
      buffer.add(product.color);
    }

    return Array.from(buffer);
  }, [products]);

  function handleChange(color: string, isChecked: boolean) {
    const draft = structuredClone(selected);

    if (isChecked) {
      draft.add(color);
    } else {
      draft.delete(color);
    }

    onChange((product) => draft.has(product.color));
    setSelected(draft);
  }

  return (
    <div
      style={{
        border: "1px solid white",
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      <h4>Colors</h4>
      <ul>
        {colors.map((color) => (
          <li key={color} style={{ display: "flex", gap: 12 }}>
            <input
              onChange={(e) => handleChange(color, e.target.checked)}
              type="checkbox"
              name="color"
              value={color}
            />
            <label>{color}</label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColorFilter;
