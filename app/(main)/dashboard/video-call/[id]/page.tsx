"use client";

import { useSearchParams } from "next/navigation";

const VideoCallPage = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  return <div>VideoCallPage - {id}</div>;
};

export default VideoCallPage;
