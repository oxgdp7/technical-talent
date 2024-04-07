function DisplayBlobCosts(props) {
    const showBlob = (blob) => {
        return (
            <tr key={blob.color}>
                <th scope="row">{blob.color}</th>
                <td>{blob.cost.describe()}</td>
            </tr>
        );
    };

    return (
        <div className="container">
            <div className="row">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Blob color</th>
                            <th scope="col">Cost</th>
                        </tr>
                    </thead>
                    <tbody>{props.blobs.map((blob) => showBlob(blob))}</tbody>
                </table>
            </div>
        </div>
    );
}

export default DisplayBlobCosts
