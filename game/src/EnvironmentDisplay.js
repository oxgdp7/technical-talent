function EnvironmentDisplay(props) {
    return (
        <div className="container">
            <h2>Environment</h2>
            <div className="row">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col-2">Property</th>
                            <th scope="col-2">Value</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr key={"Trees"}>
                            <td>{"Trees: "}</td>
                            <td>{props.trees}</td>
                        </tr>
                        <tr key={"Water"}>
                            <td>{"Water flow: "}</td>
                            <td>{props.water}</td>
                        </tr>
                        <tr key={"WoodCollected"}>
                            <td>{"Wood collected: "}</td>
                            <td>{props.woodCollected}</td>
                        </tr>
                        <tr key={"WaterCollected"}>
                            <td>{"Water collected: "}</td>
                            <td>{props.waterCollected}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="col-8"></div>
            </div>
        </div>
    );
}

export default EnvironmentDisplay;
