const TrackNeeds = ({ track }) => {
  if (track.needs === []) {
    return <li>No Needs Picked</li>
  } else if (!Array.isArray(track.needs)) {
    return <li>{track.needs.needName}</li>
  } else {
    return track.needs.map((need) => <li key={need.id}>{need.needName}</li>)
  }
}

export default TrackNeeds
