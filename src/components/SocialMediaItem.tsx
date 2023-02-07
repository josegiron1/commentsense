import Image from "next/image";

export default function SocialMediaItem({ alt, src, href, text }: { alt: string; src: string; href: string; text: string }) {
    return (
        <a href={href} target="_blank" rel="noreferrer" className="flex sm:flex-row flex-col items-center gap-2 hover:underline">
            <Image src={src} width={24} height={24} alt={alt} /> <span>{text}</span>
        </a>
    );
}

