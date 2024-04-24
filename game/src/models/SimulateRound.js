function SimulateRound(blobs, env) {
    // List of blob details objects for the round. Blob details have properties:
    // Color
    // Number
    // Status
    // Phase: only if the blob has phases, -1 if blob is sleeping / waiting
    // Restarted: if the blob can restart multiple blobs, specifies which one was restarted
    // Child: only if the blob has 1 child
    // Children: only if the blob has children
    // Parent: may be null if there is no parent
    const blobDetails = [];

    // Each blob takes its action
    blobs.forEach((blob) => blobDetails.push(blob.act()));

    // Each blob then synchronises, updating its state for the next round
    blobs.forEach((blob) => blob.synchronise());
    // The environment is set up for the next round
    env.synchronise();

    return blobDetails;
}

export default SimulateRound;
