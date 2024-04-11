import { useNavigate } from "react-router-dom";
import { useState } from "react";

function UserDetails() {
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    let navigate = useNavigate();
    const startButtonPressed = () => {
        navigate("/level1", {
            state: {
                email: email,
                name: name,
            },
        });
    };

    return (
        <div className="container">
            <div className="row">
                <label htmlFor="email-field">Email:</label>
                <input
                    id="email-field"
                    type="string"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="row">
                <label htmlFor="name-field">Name:</label>
                <input
                    id="name-field"
                    type="string"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="row mt-3">
                <button
                    type="button"
                    className="btn btn-dark"
                    onClick={startButtonPressed}
                >
                    Start
                </button>
            </div>
        </div>
    );
}

export default UserDetails;
