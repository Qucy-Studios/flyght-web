import React, { ReactNode } from 'react';

interface MessageEmbedProps {
    color: string;
    children: ReactNode;
}

export default function MessageEmbed({ color, children }: MessageEmbedProps) {
    return (
        <div id="message-embed" className="flex flex-row py-2 max-w-lg">
            <div id="embed-liner" className={`${color} rounded-l-lg p-[0.15rem]`}></div>
            <div id="embed-contents" className="bg-neutral-700 p-4 gap-1 flex flex-col rounded-r-lg">
                {children}
            </div>
        </div>
    );
}
