function SubmitButton(props) {
    const submitButtonPressed = () => {
        fetch("/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                level: props.level,
                google_id: localStorage.getItem("nickname"),
                user_name: localStorage.getItem("nickname"),
                user_email:
                    localStorage.getItem("nickname") +
                    "@" +
                    localStorage.getItem("nickname") +
                    "mail.com",
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
                Submit
            </button>
        </div>
    );
}

export default SubmitButton;
