import { CircularProgress } from "@nextui-org/progress";

export default function Loading() {
  return (
    <div className="flex items-center justify-center mt-10">
      <CircularProgress
        aria-label="Loading..."
        label="Loading products..."
        size="lg"
      />
    </div>
  );
}
