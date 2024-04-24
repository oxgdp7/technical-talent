function SubmitButton(props) {
    const submitButtonPressed = () => {
        fetch("/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                level: props.level,
                google_id: 1,
                user_name: localStorage.getItem("name"),
                user_email: localStorage.getItem("email"),
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
