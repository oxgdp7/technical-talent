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
                            <th scope="col-2">Blob color</th>
                            <th scope="col-2">Cost</th>
                        </tr>
                    </thead>
                    <tbody>{props.blobs.map((blob) => showBlob(blob))}</tbody>
                </table>
                <div className="col-8"></div>
            </div>
        </div>
    );
}

export default DisplayBlobCosts
