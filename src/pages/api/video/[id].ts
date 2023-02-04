// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { Data } from "@/type";
import type { NextApiRequest, NextApiResponse } from "next";
// import * as examples from "../../../data";

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
    { text: "The video was uninteresting.", label: "negative" },
    { text: "I was not impressed by this video.", label: "negative" },
    { text: "This video was boring.", label: "negative" },
    { text: "I found the video to be a waste of time.", label: "negative" },
    { text: "The video was not good.", label: "negative" },
    { text: "I did not enjoy this video.", label: "negative" },
    { text: "This video was disappointing.", label: "negative" },
    { text: "I was not entertained by this video.", label: "negative" },
    { text: "The video was not up to my expectations.", label: "negative" },
    { text: "I didn't like this video.", label: "negative" },
    { text: "This video was unsatisfactory.", label: "negative" },
    { text: "I found the video to be poorly made.", label: "negative" },
    { text: "The video was subpar.", label: "negative" },
    { text: "I was not a fan of this video.", label: "negative" },
    { text: "This video was underwhelming.", label: "negative" },
    { text: "I was not impressed with this video.", label: "negative" },
    { text: "The video was not well-made.", label: "negative" },
    { text: "I found the video to be lacking.", label: "negative" },
    { text: "This video was below average.", label: "negative" },
    { text: "I was not pleased with this video.", label: "negative" },
    { text: "The video was poorly executed.", label: "negative" },
    { text: "The video was just okay.", label: "neutral" },
    { text: "I had no strong opinion on this video.", label: "neutral" },
    { text: "This video was nothing exceptional.", label: "neutral" },
    { text: "I didn't have an emotional response to this video.", label: "neutral" },
    { text: "The video was just average.", label: "neutral" },
    { text: "This video didn't make much of an impression on me.", label: "neutral" },
    { text: "I found the video to be average.", label: "neutral" },
    { text: "The video was okay, but not great.", label: "neutral" },
    { text: "I have a neutral opinion on this video.", label: "neutral" },
    { text: "This video was neither good nor bad.", label: "neutral" },
    { text: "I didn't dislike the video, but I didn't love it either.", label: "neutral" },
    { text: "The video was okay, but forgettable.", label: "neutral" },
    { text: "I didn't have a strong reaction to this video.", label: "neutral" },
    { text: "The video was just average, nothing more, nothing less.", label: "neutral" },
    { text: "I don't have a strong opinion either way on this video.", label: "neutral" },
    { text: "This video was just okay, nothing to write home about.", label: "neutral" },
    { text: "I had a neutral response to this video.", label: "neutral" },
    { text: "The video was average, but not very memorable.", label: "neutral" },
    { text: "I didn't feel particularly positive or negative about this video.", label: "neutral" },
    { text: "I found the content to be uninteresting and unengaging.", label: "negative" },
    { text: "The information provided was incorrect and misleading.", label: "negative" },
    { text: "The presentation was poorly organized and difficult to follow.", label: "negative" },
    { text: "The delivery was monotonous and lacked enthusiasm.", label: "negative" },
    { text: "The experience was frustrating due to frequent technical difficulties.", label: "negative" },
    { text: "I was disappointed by the lack of effort put into this project.", label: "negative" },
    { text: "The production value was low and unprofessional.", label: "negative" },
    { text: "The execution was lacking and could have been much better.", label: "negative" },
    { text: "I was underwhelmed by the overall quality of the presentation.", label: "negative" },
    { text: "The tone was inappropriate and offensive to some viewers.", label: "negative" },
    { text: "The pacing was too slow and made it difficult to stay engaged.", label: "negative" },
    { text: "I was unimpressed by the limited creativity and originality.", label: "negative" },
    { text: "The concept was poorly developed and failed to deliver.", label: "negative" },
    { text: "The attention to detail was lacking and resulted in several mistakes.", label: "negative" },
    { text: "The audio quality was poor and made it difficult to hear the speaker.", label: "negative" },
    { text: "The visuals were poorly executed and added little value to the presentation.", label: "negative" },
    { text: "I was unsatisfied by the overall experience and felt it was a waste of time.", label: "negative" },
    { text: "The resource provided was not helpful and added little value to my learning.", label: "negative" },
    { text: "The instructions were confusing and led to several errors.", label: "negative" },
    { text: "The effort put into this project was insufficient and resulted in subpar work.", label: "negative" },
    { text: "I was disappointed by the lack of professionalism and effort.", label: "negative" },
    { text: "The style was outdated and did not align with current trends.", label: "negative" },
    { text: "The approach was too simplistic and failed to address the complexity of the topic.", label: "negative" },
    { text: "The design was cluttered and difficult to navigate.", label: "negative" },
    { text: "I was underwhelmed by the limited scope and depth of the project.", label: "negative" },
    { text: "The accuracy of the information was questionable and needed to be further validated.", label: "negative" },
    { text: "The argument was weak and lacked evidence to support it.", label: "negative" },
    { text: "I was disappointed by the lack of effort to make the project engaging.", label: "negative" },
    { text: "The experience was unfulfilling and left much to be desired.", label: "negative" },
    { text: "The outcome was not what I had expected and fell short of my expectations.", label: "negative" },
    { text: "I was not impressed by the limited skill and expertise demonstrated.", label: "negative" },
    { text: "The collaboration was ineffective and hindered the success of the project.", label: "negative" },
    { text: "The result was unsatisfactory and required significant improvement.", label: "negative" },
    { text: "The presentation was well done, but lacked the depth I was hoping for.", label: "neutral" },
    { text: "The content was informative, but failed to keep my attention for very long.", label: "neutral" },
    { text: "The delivery was smooth, but the material was not as engaging as I would have liked.", label: "neutral" },
    { text: "I appreciated the effort put into the presentation, but it didn't quite hit the mark.", label: "neutral" },
    { text: "The ideas presented were intriguing, but the execution left something to be desired.", label: "neutral" },
    { text: "The discussion was thoughtful, but lacked the passion I was hoping to see.", label: "neutral" },
    { text: "The analysis was thorough, but didn't bring anything new to the table.", label: "neutral" },
    { text: "The speaker was well-prepared, but their approach didn't resonate with me.", label: "neutral" },
    { text: "The visuals were attractive, but not particularly relevant to the topic at hand.", label: "neutral" },
    { text: "The presentation was polished, but the ideas were not particularly groundbreaking.", label: "neutral" },
    { text: "The information was useful, but the presentation was somewhat dry.", label: "neutral" },
    { text: "The speaker was knowledgeable, but the delivery was lacking in energy.", label: "neutral" },
    { text: "The pacing was good, but the content failed to hold my interest for very long.", label: "neutral" },
    { text: "The insights were interesting, but not particularly surprising.", label: "neutral" },
    { text: "The tone was professional, but didn't really connect with me on a personal level.", label: "neutral" },
    { text: "The subject matter was intriguing, but the delivery was a bit lackluster.", label: "neutral" },
    { text: "The ideas were sound, but the presentation lacked the enthusiasm I was hoping for.", label: "neutral" },
    { text: "The approach was well thought-out, but the final product was underwhelming.", label: "neutral" },
    { text: "The speaker had a good command of the subject, but their delivery was somewhat wooden.", label: "neutral" },
    { text: "The data was well-presented, but not particularly insightful.", label: "neutral" },
    { text: "The speaker was articulate, but the message was not particularly memorable.", label: "neutral" },
    { text: "The presentation was neat and organized, but the content was somewhat predictable.", label: "neutral" },
    { text: "The research was extensive, but the findings were not particularly groundbreaking.", label: "neutral" },
    { text: "The speaker was well-spoken, but the content was not as engaging as I had hoped.", label: "neutral" },
    { text: "The arguments were well-made, but not particularly persuasive.", label: "neutral" },
    { text: "The information was accurate, but the presentation was somewhat lackluster.", label: "neutral" },
    { text: "The examples were well-chosen, but not particularly relevant to the topic at hand.", label: "neutral" },
    { text: "The discussion was thorough, but the conclusion was not particularly surprising.", label: "neutral" },
    { text: "The speaker was confident, but the content was not particularly captivating.", label: "neutral" },
    { text: "The analysis was methodical, but the insights were not particularly surprising.", label: "neutral" },
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
        console.log(response);
        if (!response.ok) {
            console.log(await response.text());
            throw new Error("something went wrong getting comments");
        }
        const data = (await response.json()) as Data;
        data.items.forEach((item) => {
            items.push(item.snippet.topLevelComment.snippet.textOriginal);
        });
        if (data?.nextPageToken) {
            allItems = await refetchIfNextPageToken(id as string, data.nextPageToken, items);
        }
     } catch (error) {
            console.log(error);
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("something went wrong");
        }
        res.status(200).json({ items: allItems ? allItems : items });
        return;
    //     const res = await fetch("https://api.cohere.ai/classify", {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //             Authorization: `Bearer ${process.env.COHERE_API as string}`,
    //         },
    //         body: JSON.stringify({
    //             inputs: allItems ? allItems : items,
    //             examples: examples,
    //             model: "large",
    //             truncate: "END",
    //             outputIndicator: "Classify this video comments",
    //             taskDescription: "Classify these video comments as positive, negative, or neutral",
    //         }),
    //     });

    //     dataAnalysis = await res.json();
    // } catch (error) {
    //     console.log(error);
    //     if (error instanceof Error) {
    //         throw new Error(error.message);
    //     }
    //     throw new Error("something went wrong");
    // }
    // res.status(200).json({ items: dataAnalysis.classifications });
}
