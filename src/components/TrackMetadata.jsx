const TrackMetadata = ({ track }) => {
  if (track.metadata == []) {
    return <li>No Metadata Picked</li>
  } else if (!Array.isArray(track.metadata)) {
    return <li>{track.metadata.metadataName}</li>
  } else {
    return track.metadata.map((data) => (
      <li key={data.id}>{data.metadataName}</li>
    ))
  }
}

export default TrackMetadata
