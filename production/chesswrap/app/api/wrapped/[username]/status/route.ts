export async function GET(req: Request) {
    return Response.json({ status: 'processing', progress: 50 })
}
