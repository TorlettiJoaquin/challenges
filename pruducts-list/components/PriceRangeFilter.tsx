import { Filter } from "../types";
import { useState } from "react";

type Props = {
  onChange: (filter: Filter) => void;
};

const PriceRangeFilter: React.FC<Props> = ({ onChange }) => {
  const [selected, setSelected] = useState<Set<number>>(() => new Set());

  function handleChange(rating: number, isChecked: boolean) {
    const draft = structuredClone(selected);

    if (isChecked) {
      draft.add(rating);
    } else {
      draft.delete(rating);
    }

    onChange(draft.size ? (product) => draft.has(product.rating) : null);

    setSelected(draft);
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
        {[1, 2, 3, 4, 5].map((rating) => (
          <li style={{ listStyle: "none" }} key={String(rating)}>
            <label style={{ display: "flex", gap: 12, color: "gold" }}>
              <input
                onChange={(e) => handleChange(rating, e.target.checked)}
                type="number"
                name="rating"
                value={rating}
              />
              {"★".repeat(rating).padEnd(5, "☆")}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PriceRangeFilter;
