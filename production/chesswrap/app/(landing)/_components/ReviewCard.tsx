import { UserFeedback } from "@/app/(landing)/_data/website-stats";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Star } from "lucide-react";

export function ReviewCard({ satisfyScore, feedback }: UserFeedback) {
    return (
        <Card className="h-full flex flex-col">
            <CardHeader>
                <div className="flex justify-center items-center w-full">
                    <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                                key={i}
                                className={`w-4 h-4 ${i < satisfyScore
                                    ? "fill-amber-400 text-amber-400"
                                    : "fill-muted text-muted-foreground/20"
                                    }`}

                            />
                        ))}
                    </div>
                </div>
            </CardHeader>

            <CardContent>
                <p className="text-l text-black -mt-5">
                    "{feedback}"
                </p>
            </CardContent>
        </Card>
    );
}