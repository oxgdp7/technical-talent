function SubmitButton(props) {
    const submitButtonPressed = () => {
        fetch("/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                level: props.level,
                google_id: 1,
                user_email: props.email,
                user_name: props.name,
                blobs: props.blobs,
            }),
        });
    };

    return (
        <div className="container">
            <button
                type="button"
                className="btn btn-dark"
                onClick={submitButtonPressed}
            >
                submit
            </button>
        </div>
    );
}

export default SubmitButton;
