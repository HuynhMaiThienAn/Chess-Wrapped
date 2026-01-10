import { ChessKing } from "lucide-react";

export function BrandLogo() {
    return (
        <span className="flex font-semibold items-center -mt-1 mr-auto text-white gap-2">
            <ChessKing size={20} strokeWidth={2} />
            ChessWrap
        </span>
    )
}