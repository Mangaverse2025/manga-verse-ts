
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";

interface RatingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mangaId: string;
}

export function RatingDialog({ open, onOpenChange, mangaId }: RatingDialogProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const handleRatingClick = (value: number) => {
    setRating(value);
  };

  const handleSubmit = () => {
    if (rating) {
      console.log(`Submitted rating of ${rating} for manga ${mangaId}`);
      onOpenChange(false);
    }
  };

  const renderStars = () => {
    const stars = [];
    const maxStars = 5;
    const displayRating = hoverRating !== null ? hoverRating : rating;

    for (let i = 1; i <= maxStars; i++) {
      const filled = i <= (displayRating || 0);
      stars.push(
        <button
          key={i}
          className="focus:outline-none"
          onMouseEnter={() => setHoverRating(i)}
          onMouseLeave={() => setHoverRating(null)}
          onClick={() => handleRatingClick(i)}
        >
          <Star
            className={`h-8 w-8 ${
              filled ? "text-yellow-500 fill-yellow-500" : "text-gray-400"
            }`}
          />
        </button>
      );
    }
    return stars;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Rate this Manga</DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-6 py-4">
          <div className="flex space-x-2">
            {renderStars()}
          </div>
          
          <div className="text-lg font-semibold">
            {rating ? `${rating * 2} / 10` : "Select a rating"}
          </div>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!rating}>
            Submit Rating
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
