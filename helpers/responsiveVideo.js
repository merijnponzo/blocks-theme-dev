// fix
export default function ResponsiveVideo(props) {
  const { media, imageClass, extraClass } = props;
  const { url, alt } = media;

  let videoUrl = url;

  return (
    <video className="responsive-video" id="player" playsinline controls autoplay muted loop>
      <source src={videoUrl} type="video/mp4" />
    </video>
  );
}
