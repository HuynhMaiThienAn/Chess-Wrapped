# ChessWrapped 2025
https://chesswrap.vercel.app/

**A "Spotify Wrapped" style experience for Chess.com users, built with Next.js and the Chess.com Public API.**

![ChessWrapped Preview](my-app/public/app-image/homepage.png)
![ChessWrapped Preview](my-app/public/app-image/how-it-work.png)
![ChessWrapped Preview](my-app/public/app-image/key-features.png)


## 🛠️ Tech Stack

- **Framework:** Next.js
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Data Source:** [Chess.com Public API](https://www.chess.com/news/view/published-data-api)
- **Icons:** Lucide React

## ⚙️ Architecture & Data Flow

1. **User Input:** The user enters their username on the landing page (`app/page.tsx`).
2. **Validation:** The app pings the Chess.com API to verify the user exists and has archives for 2025.
3. **Data Fetching:**
    - On success, the user is routed to `/wrapped/[username]`.
    - The `ChessContext` triggers a fetch for all monthly archives (JSON).
    - Games are parsed to calculate Total Games, Win/Loss/Draw ratios, and specific Opening names.
4. **Visualization:**
    - Data is passed into the `<Carousel />` component.
    - Framer Motion handles the slide transitions and entrance animations.
    - Global Audio is managed in `layout.tsx` to persist across route changes.

---

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
