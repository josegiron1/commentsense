// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Data } from "@/type";
import type { NextApiRequest, NextApiResponse } from "next";

// This examples were generated with chatgpt
export const examples = [
    { text: "I loved the way you explained that concept!", label: "positive" },
    { text: "Great job on the pacing of this video.", label: "positive" },
    { text: "Your tips were really helpful, thanks!", label: "positive" },
    { text: "I appreciate the time and effort you put into making this video.", label: "positive" },
    { text: "I learned so much from your video, thank you.", label: "positive" },
    { text: "Your advice was spot on, I'll be trying that out.", label: "positive" },
    { text: "I laughed out loud at your sense of humor.", label: "positive" },
    { text: "Your video inspired me to try something new.", label: "positive" },
    { text: "The visuals in your video were amazing.", label: "positive" },
    { text: "I can tell you put a lot of thought into this video.", label: "positive" },
    { text: "This video was just okay.", label: "neutral" },
    { text: "I didn't have a strong reaction to your video.", label: "neutral" },
    { text: "Your video was informative, but nothing special.", label: "neutral" },
    { text: "I didn't find your tips particularly helpful.", label: "neutral" },
    { text: "I can't say I loved or hated your video.", label: "neutral" },
    { text: "Your video was just average.", label: "neutral" },
    { text: "I have mixed feelings about your advice.", label: "neutral" },
    { text: "I didn't find your video particularly entertaining.", label: "neutral" },
    { text: "Your video was informative, but not memorable.", label: "neutral" },
    { text: "I don't have a strong opinion on your video.", label: "neutral" },
    { text: "I was really disappointed with your video.", label: "negative" },
    { text: "Your tips were not useful at all.", label: "negative" },
    { text: "Your video was a waste of time.", label: "negative" },
    { text: "I was let down by the quality of your video.", label: "negative" },
    { text: "Your video was poorly made.", label: "negative" },
    { text: "I didn't find your video to be helpful.", label: "negative" },
    { text: "Your video was not interesting.", label: "negative" },
    { text: "I was bored by your video.", label: "negative" },
    { text: "Your advice was misguided.", label: "negative" },
    { text: "Your video was not well-received.", label: "negative" },
    { text: "You did a fantastic job with this video!", label: "positive" },
    { text: "Your tips were exactly what I needed to hear.", label: "positive" },
    { text: "I loved your sense of humor in this video.", label: "positive" },
    { text: "Your video was a great source of inspiration.", label: "positive" },
    { text: "I learned so much from your tips.", label: "positive" },
    { text: "Your video was highly entertaining.", label: "positive" },
    { text: "I appreciated the time you took to make this video.", label: "positive" },
    { text: "Your video was a real eye-opener.", label: "positive" },
    { text: "I can tell you put a lot of heart into this video.", label: "positive" },
    { text: "I had no strong reaction to your video.", label: "neutral" },
    { text: "Your video was just average.", label: "neutral" },
    { text: "I didn't find your advice particularly useful.", label: "neutral" },
    { text: "I have mixed feelings about your video.", label: "neutral" },
    { text: "Your video was not particularly noteworthy.", label: "neutral" },
    { text: "I didn't find your video to be very interesting.", label: "neutral" },
    { text: "Your video was just okay.", label: "neutral" },
    { text: "I have no strong opinions on your advice.", label: "neutral" },
    { text: "Your video was not memorable.", label: "neutral" },
    { text: "The video is mediocre.", label: "neutral" },
    { text: "I didn't have a strong reaction to this video.", label: "neutral" },
    { text: "The video is just average.", label: "neutral" },
    { text: "This video didn't leave much of an impression on me.", label: "neutral" },
    { text: "I have no opinion on this video.", label: "neutral" },
    { text: "This video is nothing special.", label: "neutral" },
    { text: "The video is just okay.", label: "neutral" },
    { text: "This video is not particularly noteworthy.", label: "neutral" },
    { text: "I found the video to be just average.", label: "neutral" },
    { text: "I had no emotional response to this video.", label: "neutral" },
];

const refetchIfNextPageToken = async (id: string, nextPageToken: string, items: any[]) => {
    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/commentThreads?videoId=${id}&part=snippet&key=${
                process.env.YOUTUBE_API as string
            }&maxResults=100&pageToken=${nextPageToken}`
        );

        if (!response.ok) {
            console.error("something went wrong");
            return items;
        }
        const data = (await response.json()) as Data;

        data?.items.forEach((item) => {
            items.push(item.snippet.topLevelComment.snippet.textOriginal);
        });

        if (data.nextPageToken) {
            await refetchIfNextPageToken(id, data.nextPageToken, items);
        }
        return items;
    } catch (error) {
        console.log(error);
    }
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    const items: any[] = [];
    let allItems;
    let dataAnalysis;

    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/commentThreads?videoId=${id}&part=snippet&key=${process.env.YOUTUBE_API as string}&maxResults=100`
        );
        if (!response.ok) {
            console.log(await response.text());
            return;
        }
        const data = (await response.json()) as Data;
        data.items.forEach((item) => {
            items.push(item.snippet.topLevelComment.snippet.textOriginal);
        });
        if (data?.nextPageToken) {
            allItems = await refetchIfNextPageToken(id as string, data.nextPageToken, items);
            if (allItems) {
                console.log(allItems);
                console.log(allItems.length);
            }
        }

        const res = await fetch("https://api.cohere.ai/classify", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.COHERE_API as string}`,
            },
            body: JSON.stringify({
                inputs: allItems ? allItems : items,
                examples: examples,
                model: "large",
                truncate: "END",
                outputIndicator: "Classify this video comments",
                taskDescription: "Classify these video comments as positive, negative, or neutral",
            }),
        });

        dataAnalysis = await res.json();
    } catch (error) {
        console.log(error);
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        return;
    }
    res.status(200).json({ items: dataAnalysis.classifications });
    return;
}
