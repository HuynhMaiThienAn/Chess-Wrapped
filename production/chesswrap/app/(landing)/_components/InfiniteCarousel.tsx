import { UserFeedback } from "@/app/(landing)/_data/website-stats";
import { ReviewCard } from "./ReviewCard";

interface InfiniteCarouselProps {
    feedbackData: UserFeedback[];
    reverse?: boolean;
}

export function InfiniteCarousel({ feedbackData, reverse = false }: InfiniteCarouselProps) {
    return (
        <div className="relative overflow-hidden">
            <div className={`flex gap-4 ${reverse ? 'animate-scroll-right' : 'animate-scroll-left'}`}>
                {feedbackData.map((feedback, index) => (
                    <div key={`first-${index}`}
                         className="w-[300px] md:w-[350px] lg:w-[400px] flex-shrink-0">
                        <ReviewCard {...feedback} />
                    </div>
                ))}

                {feedbackData.map((feedback, index) => (
                    <div key={`second-${index}`}
                        className="w-[300px] md:w-[350px] lg:w-[400px] flex-shrink-0">
                        <ReviewCard {...feedback} />
                    </div>
                ))}
            </div>

            <div className="absolute left-0 top-0 bottom-0 w-32 from-background to-transparent pointer-events-none z-10" />

            <div className="absolute right-0 top-0 bottom-0 w-32 from-background to-transparent pointer-events-none z-10" />
        </div>
    );
}
