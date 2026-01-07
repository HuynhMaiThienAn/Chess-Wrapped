export async function GET(
    req: Request,
    { params }: { params: { username: string } }
) {
    return Response.json({ status: 'ok', username: params.username })
}

export async function POST(
    req: Request,
    { params }: { params: { username: string } }
) {
    return Response.json({ status: 'processing' })
}
