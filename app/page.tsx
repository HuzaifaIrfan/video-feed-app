"use client";

import { getVideos } from "./actions/videoActions";
import { useState, useEffect, useRef } from "react";

export default function HomePage() {
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  const loadMore = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    const lastCreatedAt = videos.length > 0 ? videos[videos.length - 1].created_at : undefined;
    const newVideos = await getVideos(lastCreatedAt);

    if (newVideos.length === 0) {
      setHasMore(false);
    } else {
      setVideos((prev) => [...prev, ...newVideos]);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadMore(); // Load first videos
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "100px" }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [loaderRef.current]);

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


      {/* Invisible loader div */}
      {hasMore && <div ref={loaderRef} className="h-10"></div>}

      {/* Load More button */}
      <div className="flex justify-center mt-8">
        {hasMore ? (
          <button
            onClick={loadMore}
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Loading..." : "Load More"}
          </button>
        ) : (
          <p className="text-gray-500">No more videos.</p>
        )}
      </div>
    </main>
  );
}
