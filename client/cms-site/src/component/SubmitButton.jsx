export default function SubmitButton({ title }) {
    return (
        <button
            className="btn btn-lg btn-primary rounded-pill w-100 p-2"
            type="submit"
        >
            {title}
        </button>
    )
}