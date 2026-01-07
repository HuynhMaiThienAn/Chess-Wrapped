export default function WrappedWelcomePage({ params }: { params: { username: string } }) {
    return <div>Welcome {params.username}</div>
}
