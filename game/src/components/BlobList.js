function BlobList(props) {
    const showBlob = (blob) => {
        return (
            <tr key={blob.name()}>
                <th scope="row">{blob.name()}</th>
                <td>{blob.status().toString()}</td>
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
                            <th scope="col-2">Status</th>
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
