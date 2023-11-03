"use client";
import { Select, SelectItem } from "@nextui-org/select";
import { useFilterStore } from "@/store/zustand";

export default function SelectComponent() {
  const { orderByLower, orderByHigher, resetFilter } = useFilterStore();

  function handleChange(value: any) {
    if (value === "lower") {
      orderByLower();
    } else if (value === "higher") {
      orderByHigher();
    } else {
      resetFilter();
    }
  }

  return (
    <Select
      color="primary"
      placeholder="Order by"
      className="w-[150px] pb-2"
      labelPlacement="outside-left"
      aria-label="order by"
      onChange={(e) => handleChange(e.target.value)}
    >
      <SelectItem key="lower" value="lower">
        Lower Price
      </SelectItem>
      <SelectItem key="higher" value="higher">
        Higher Price
      </SelectItem>
    </Select>
  );
}
