import Image from "next/image";
import React from "react";

export default function SocialMediaItem({ alt, src, href, text }: { alt: string; src: string; href: string; text: string }) {
    return (
        <a href={href} target="_blank" rel="noreferrer" className="flex gap-2">
            <Image src={src} width={24} height={24} alt={alt} /> <span>{text}</span>
        </a>
    );
}

