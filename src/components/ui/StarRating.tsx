import { FaStar, FaRegStar } from "react-icons/fa";

type StarRatingProps = {
  rating: number;
  max?: number;
};

export default function StarRating({ rating, max = 5 }: StarRatingProps) {
  const safeRating = Math.max(0, Math.min(rating, max));

  return (
    <div
      className="flex items-center gap-1"
      aria-label={`Rating: ${safeRating} ud af ${max}`}
    >
      {Array.from({ length: max }).map((_, index) => {
        const isFilled = index < safeRating;

        return (
          <span
            key={index}
          >
            {isFilled ? <FaStar /> : <FaRegStar />}
          </span>
        );
      })}
    </div>
  );
}
