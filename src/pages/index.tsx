import Head from "next/head";
import { useState } from "react";
import { getCommentsAnalyze } from "@/fetch.service";
import Image from "next/image";
import DataPagination from "@/components/DataPagination";
import SocialMediaItem from "@/components/SocialMediaItem";
import { Open_Sans } from "@next/font/google";

const openSans = Open_Sans({
    weight: "500",
    subsets: ["latin"],
});

export default function Home() {
    const [videoLink, setVideoLink] = useState<string>("");
    const [commentsAnalyze, setCommentsAnalyze] = useState<any>();
    const [classifications, setClassifications] = useState<any>({ positive: 0, negative: 0, neutral: 0 });
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const handleVideoLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setVideoLink(e.target.value);
        setError("");
    };

    const handleSubmit = async () => {
        setClassifications({ positive: 0, negative: 0, neutral: 0 });
        setCommentsAnalyze(null);
        if (!videoLink) return;
        const videoId = videoLink.includes("youtu.be") ? videoLink.split("be/")[1] : videoLink.split("v=")[1];
        setIsLoading(true);
        if (!videoId) {
            setIsLoading(false);
            setError("Please enter a valid YouTube video link.");
            return;
        }
        const res = await getCommentsAnalyze(videoId);
        if (res?.message) {
            setIsLoading(false);
            setError(res.message);
            return;
        }

        if (res?.items) {
            setIsLoading(false);
            setCommentsAnalyze(res?.items);

            for (const item of res?.items) {
                if (item.prediction === "positive") {
                    setClassifications((prev: any) => ({ ...prev, positive: prev.positive + 1 }));
                } else if (item.prediction === "negative") {
                    setClassifications((prev: any) => ({ ...prev, negative: prev.negative + 1 }));
                } else {
                    setClassifications((prev: any) => ({ ...prev, neutral: prev.neutral + 1 }));
                }
            }
        } else {
            setError("Something went wrong. Please try again.");
        }

        setIsLoading(false);
    };

    return (
        <>
            <Head>
                <title>CommentSense</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main
                className={`${openSans.className} min-h-screen flex flex-col justify-between 
            p-6 gap-6 bg-[#dfe9f3]`}>
                <div className="flex justify-center">
                    <Image
                        src="/comment-sense-high-resolution-logo-black-on-transparent-background.png"
                        alt="logo"
                        width={300}
                        height={300}
                        className="w-auto h-auto"
                    />
                </div>
                {!commentsAnalyze && (
                    <div className="flex flex-col gap-3 max-w-[600px] mx-auto">
                        <h1 className="text-[24px] text-center">What is CommentSense?</h1>
                        <p className="text-[16px]">
                            This app allows users to input a YouTube video URL and partially retrieve the comments associated with that video. The app
                            then performs sentiment analysis on each comment to determine the overall sentiment expressed in the comment. This
                            sentiment analysis classifies the comment as positive, negative, or neutral based on the language used in the comment.
                            This app can be useful for content creators and marketers to better understand their audience and the sentiment toward
                            their content. It can also be used by researchers to gather and analyze data on public opinion on various topics. The app
                            is designed to work exclusively with the English language, providing a professional and highly accurate solution for
                            sentiment analysis.
                        </p>
                    </div>
                )}
                <div className="flex flex-col justify-center items-center gap-3">
                    <label htmlFor="error" className="text-lg">
                        Add youtube video link:{" "}
                    </label>
                    <input
                        onChange={handleVideoLinkChange}
                        type="text"
                        className={`${
                            !error
                                ? "border-2 rounded-lg block bg-inherit border-black w-full sm:w-[500px] text-sm"
                                : "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 dark:bg-gray-700 focus:border-red-500 block w-full sm:w-[500px] p-2.5 dark:text-red-500 dark:placeholder-red-500 dark:border-red-500"
                        }`}
                    />
                    {error && <p className="text-red-500">{error}</p>}
                    <button
                        type="button"
                        onClick={handleSubmit}
                        className="py-2.5 px-5 mr-2 text-sm font-medium text-white bg-black rounded-lg border border-gray-200 hover:bg-gray-900 hover:text-gray-300 focus:z-10 focus:ring-2 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center">
                        {isLoading ? (
                            <svg
                                aria-hidden="true"
                                role="status"
                                className="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="#1C64F2"
                                />
                            </svg>
                        ) : null}
                        Submit
                    </button>
                </div>
                {commentsAnalyze && (
                    <>
                        <div className="text-center">
                            Comments - Positive: {classifications.positive} ???? | Negative: {classifications.negative} ???? | Neutral:{" "}
                            {classifications.neutral} ???
                        </div>
                        <DataPagination data={commentsAnalyze} />
                        <p className="max-w-[600px] mx-auto">
                            ***Disclaimer: This app provides sentiment analysis of comments on YouTube videos based on data from OpenAI&apos;s ChatGPT
                            model. Please note that the video author and YouTube have the right to remove comments at their discretion, which may
                            affect the accuracy of the sentiment analysis. The results generated by the app should be used for informational purposes
                            only and should not be considered as a substitute for professional judgement.
                        </p>
                    </>
                )}

                <div></div>
                <div>
                    <div className="flex gap-6 justify-center">
                        <SocialMediaItem
                            text="@gdevmaster"
                            href="https://twitter.com/gdevmaster"
                            src="/52tweet_twitter_twitter logo_icon.svg"
                            alt="twitter logo"
                        />
                        <SocialMediaItem
                            text="gironjose5"
                            href="https://www.linkedin.com/in/gironjose5/"
                            src="/linkedin_logo_icon.svg"
                            alt="linkedin logo"
                        />
                        <SocialMediaItem text="josegiron1" href="https://github.com/josegiron1" src="/social_github_icon.svg" alt="linkedin logo" />
                    </div>
                </div>
            </main>
        </>
    );
}
