# Create App Route Files

# Landing
"export default function LandingPage() { return <div>Landing Page</div> }" | Out-File -FilePath "app\(landing)\page.tsx" -Encoding UTF8

# About pages
"export default function AboutPage() { return <div>About</div> }" | Out-File -FilePath "app\(about)\about\page.tsx" -Encoding UTF8
"export default function PrivacyPage() { return <div>Privacy</div> }" | Out-File -FilePath "app\(about)\privacy\page.tsx" -Encoding UTF8

# Wrapped pages
"export default function WrappedWelcomePage({ params }: { params: { username: string } }) { return <div>Welcome {params.username}</div> }" | Out-File -FilePath "app\wrapped\[username]\page.tsx" -Encoding UTF8
"export default function GamesPage() { return <div>Games</div> }" | Out-File -FilePath "app\wrapped\[username]\games\page.tsx" -Encoding UTF8
"export default function EloPage() { return <div>ELO</div> }" | Out-File -FilePath "app\wrapped\[username]\elo\page.tsx" -Encoding UTF8
"export default function OpeningsPage() { return <div>Openings</div> }" | Out-File -FilePath "app\wrapped\[username]\openings\page.tsx" -Encoding UTF8
"export default function AccuracyPage() { return <div>Accuracy</div> }" | Out-File -FilePath "app\wrapped\[username]\accuracy\page.tsx" -Encoding UTF8
"export default function StreakPage() { return <div>Streak</div> }" | Out-File -FilePath "app\wrapped\[username]\streak\page.tsx" -Encoding UTF8
"export default function BlundersPage() { return <div>Blunders</div> }" | Out-File -FilePath "app\wrapped\[username]\blunders\page.tsx" -Encoding UTF8
"export default function MatchesPage() { return <div>Matches</div> }" | Out-File -FilePath "app\wrapped\[username]\matches\page.tsx" -Encoding UTF8
"export default function SummaryPage() { return <div>Summary</div> }" | Out-File -FilePath "app\wrapped\[username]\summary\page.tsx" -Encoding UTF8

# Leaderboards
"export default function LeaderboardsPage() { return <div>Leaderboards</div> }" | Out-File -FilePath "app\leaderboards\page.tsx" -Encoding UTF8

# Showcase
"export default function ShowcasePage() { return <div>Showcase</div> }" | Out-File -FilePath "app\showcase\page.tsx" -Encoding UTF8

# API Routes
"export async function GET(req: Request, { params }: { params: { username: string } }) { return Response.json({ status: 'ok' }) }" | Out-File -FilePath "app\api\wrapped\[username]\route.ts" -Encoding UTF8
"export async function POST(req: Request, { params }: { params: { username: string } }) { return Response.json({ status: 'ok' }) }" | Out-File -Append -FilePath "app\api\wrapped\[username]\route.ts" -Encoding UTF8
"export async function GET(req: Request) { return Response.json({ status: 'processing' }) }" | Out-File -FilePath "app\api\wrapped\[username]\status\route.ts" -Encoding UTF8

Write-Host "✅ All app route files created!" -ForegroundColor Green
