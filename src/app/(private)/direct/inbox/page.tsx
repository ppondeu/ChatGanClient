export default function Page() {
    return (
        <div className="flex flex-col justify-center items-center flex-[0.67] gap-4 border-l-2">
            <div className="flex flex-col items-center">
                <h3>Your Inbox</h3>
                <p>Send a message to your friends</p>
            </div>
            <button type="button" className="bg-blue-400 px-4 py-2 rounded-md hover:bg-blue-500">Send Message</button>
        </div>
    )
}