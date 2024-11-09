import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useMusicStore } from "@/store/useMusicStore";
import { usePlayerStore } from "@/store/usePlayerStore";
import { Clock, Pause, Play } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export const formatDuration = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};

const AlbumPage = () => {
  const { albumId } = useParams();
  const { fetchAlbumById, currentAlbum, isLoading } = useMusicStore();
  const { currentSong, isPlaying, playAlbum, togglePlay } = usePlayerStore();

  useEffect(() => {
    if (albumId) fetchAlbumById(albumId);
  }, [fetchAlbumById, albumId]);

  if (isLoading) return null;

  const handlePlayAlbum = () => {
    if (!currentAlbum) return;
    const isCurrentAlbumPlaying = currentAlbum?.songs.some(
      (song) => song._id === currentSong?._id,
    );
    isCurrentAlbumPlaying ? togglePlay() : playAlbum(currentAlbum?.songs, 0);
  };

  const handlePlaySong = (index: number) => {
    if (!currentAlbum) return;
    playAlbum(currentAlbum?.songs, index);
  };

  return (
    <div className="h-full bg-gradient-to-b from-zinc-900 to-black">
      <ScrollArea className="h-full">
        <div className="relative min-h-full">
          {/* Dynamic gradient background that changes based on album art */}
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-900/30 via-zinc-900/80 to-black transition-colors duration-1000" />

          {/* Main Content */}
          <div className="relative z-10">
            {/* Album Header Section */}
            <div className="flex flex-col gap-8 p-6 md:flex-row lg:p-8 xl:p-10">
              {/* Album Cover with hover effects */}
              <div className="group relative">
                <img
                  src={currentAlbum?.imageUrl}
                  alt={currentAlbum?.title}
                  className="h-[250px] w-[250px] rounded-md object-cover shadow-[0_32px_44px_-16px_rgba(0,0,0,0.5)] transition-all duration-300 group-hover:shadow-[0_32px_60px_-16px_rgba(0,0,0,0.7)] sm:h-[300px] sm:w-[300px]"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                  <Button
                    onClick={handlePlayAlbum}
                    size="icon"
                    className="h-16 w-16 rounded-full bg-green-500/90 shadow-xl transition-transform hover:scale-105 hover:bg-green-400"
                  >
                    {isPlaying &&
                    currentAlbum?.songs.some(
                      (song) => song._id === currentSong?._id,
                    ) ? (
                      <Pause className="h-8 w-8 text-black" />
                    ) : (
                      <Play className="h-8 w-8 translate-x-0.5 text-black" />
                    )}
                  </Button>
                </div>
              </div>

              {/* Album Info */}
              <div className="flex flex-col justify-end space-y-3">
                <span className="text-sm font-medium tracking-wide text-white/60">
                  Album
                </span>
                <h1 className="text-5xl font-bold tracking-tight text-white md:text-6xl lg:text-7xl">
                  {currentAlbum?.title}
                </h1>
                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm">
                  <span className="font-medium text-white">
                    {currentAlbum?.artist}
                  </span>
                  <span className="text-white/60">•</span>
                  <span className="text-white/60">
                    {currentAlbum?.releaseYear}
                  </span>
                  <span className="text-white/60">•</span>
                  <span className="text-white/60">
                    {currentAlbum?.songs.length} songs
                  </span>
                </div>
              </div>
            </div>

            {/* Songs List Section */}
            <div className="mt-6 rounded-t-lg bg-zinc-900/30 backdrop-blur-md">
              {/* Table Header */}
              <div className="grid grid-cols-[auto_1fr_1fr_auto] gap-4 border-b border-white/5 px-6 py-3 text-sm font-medium text-white/60">
                <div className="pl-2">#</div>
                <div>Title</div>
                <div className="hidden md:block">Released Date</div>
                <div className="pr-2">
                  <Clock className="h-4 w-4" />
                </div>
              </div>

              {/* Songs */}
              <div className="px-4">
                {currentAlbum?.songs.map((song, index) => {
                  const isCurrentSong = currentSong?._id === song._id;
                  return (
                    <div
                      key={song._id}
                      onClick={() => handlePlaySong(index)}
                      className={`group grid grid-cols-[auto_1fr_1fr_auto] gap-4 rounded-md px-2 py-2 transition-colors hover:bg-white/10 ${isCurrentSong ? "bg-white/10" : ""}`}
                    >
                      {/* Song Number/Play Icon */}
                      <div className="flex w-8 items-center justify-center">
                        {isCurrentSong && isPlaying ? (
                          <div className="text-lg text-green-500">♫</div>
                        ) : (
                          <>
                            <span className="group-hover:hidden">
                              {index + 1}
                            </span>
                            <Play className="hidden h-4 w-4 text-white group-hover:block" />
                          </>
                        )}
                      </div>

                      {/* Song Info */}
                      <div className="flex items-center gap-3">
                        <img
                          src={song?.imageUrl}
                          alt={song?.title}
                          className="h-10 w-10 rounded shadow-lg"
                        />
                        <div>
                          <div
                            className={`font-medium ${
                              isCurrentSong ? "text-green-500" : "text-white"
                            }`}
                          >
                            {song?.title}
                          </div>
                          <div className="text-sm text-white/60">
                            {song?.artist}
                          </div>
                        </div>
                      </div>

                      {/* Release Date */}
                      <div className="hidden items-center text-white/60 md:flex">
                        {song?.createdAt?.split("T")[0]}
                      </div>

                      {/* Duration */}
                      <div className="flex items-center text-white/60">
                        {formatDuration(song?.duration)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default AlbumPage;
