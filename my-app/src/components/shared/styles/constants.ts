export const TYPOGRAPHY = {
    // Big, bubbly headers (e.g. "TOTAL GAMES")
    headerTitle: "text-2xl md:text-4xl font-bold text-white mb-2 drop-shadow-md",

    // Subheaders (e.g. "Your year in review")
    subHeader: "text-[#989795] text-lg font-medium mb-1",

    // Massive stats (e.g. "2,400")
    bigStat: "text-6xl md:text-7xl font-bold text-white drop-shadow-[0_4px_0_rgba(0,0,0,0.2)] my-2",

    // Fun commentary quotes
    comment: "text-l font-bold text-[#81b64c] bg-white px-4 py-2 rounded-xl shadow-sm rotate-[-1deg] inline-block mt-4 border-2 border-[#81b64c]/20",

    // The bubble container for text at the bottom
    cardMessage: "w-full max-w-[280px] bg-white/10 backdrop-blur-md p-4 rounded-3xl border-2 border-white/10 mt-6",
};

export const CONTAINERS = {
    // The round icon circles
    iconWrapper: "mb-4 bg-white/10 p-4 rounded-[2rem] text-[#ffc800] shadow-inner",

    // Main layout
    slideContainer: "w-full h-full flex flex-col items-center justify-center relative z-20",

    // The slide itself
    slideCard: "relative w-full h-full flex flex-col items-center",

    // Main content area with padding
    slideContent: "w-full px-6 z-10",
};
