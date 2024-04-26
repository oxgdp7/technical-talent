function BlobList(props) {
    const showBlob = (blob) => {
        return (
            <tr key={blob.name()}>
                <th scope="row">{blob.name()}</th>
                <td>{props.showStatus ? blob.status().toString() : null}</td>
                <td>{blob.parent() ? blob.parent().name() : null}</td>
            </tr>
        );
    };

    return (
        <div className="container">
            <h2>Blobs</h2>
            <div className="row">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col-2">Name</th>
                            <th scope="col-2">
                                {props.showStatus ? "Status" : null}
                            </th>
                            <th scope="col-2">Parent</th>
                        </tr>
                    </thead>
                    <tbody>{props.blobs.map((blob) => showBlob(blob))}</tbody>
                </table>
                <div className="col-8"></div>
            </div>
        </div>
    );
}

export default BlobList;
