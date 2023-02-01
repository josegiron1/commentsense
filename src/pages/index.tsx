import Head from "next/head";
import { Inter } from "@next/font/google";
import { useState } from "react";
import { getCommentsAnalyze } from "@/fetch.service"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {

  const [videoLink, setVideoLink] = useState<string>("");

  const handleVideoLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVideoLink(e.target.value);
  };

  const handleSubmit = async () => {
    if(!videoLink) return;
    const videoId = videoLink.split("=")[1];
    console.log(videoId);
    const res = await getCommentsAnalyze(videoId)
    console.log(res);
  }

    return (
        <>
            <Head>
                <title>CommentSense</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className="h-screen flex flex-col justify-between">
                <h1 className="text-2xl text-center mx-auto">Comment Sense</h1>
                <div className="flex flex-col justify-center items-center gap-2">
                    <div className="flex justify-center items-center gap-1">
                        <label className="text-lg">Add youtube video link: </label>
                        <input onChange={handleVideoLinkChange} type="text" className="border-2 rounded border-black" />
                    </div>
                    <button onClick={handleSubmit} className="bg-black text-white rounded px-2 py-1">Submit</button>
                </div>

                <div></div>
            </main>
        </>
    );
}
