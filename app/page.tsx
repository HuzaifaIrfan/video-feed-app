import { getVideos } from "./actions/videoActions";

export default async function HomePage() {
  const videos = await getVideos();


  return (
    <main className="p-8">
      <h1 className="text-2xl mb-4">Videos</h1>


      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {videos.map((video: any) => (
          <li key={video._id.toString()} className="border rounded-lg p-4 shadow hover:shadow-md transition">
            <iframe width="100%" height="auto"
              src={"https://www.youtube.com/embed/" + video._id.toString()} 
              title="YouTube video player" 
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              referrerPolicy="strict-origin-when-cross-origin" 
              allowFullScreen>
            </iframe>
          </li>
        ))}
      </ul>
    </main>
  );
}
