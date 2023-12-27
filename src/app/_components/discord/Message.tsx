import React, { ReactNode } from 'react';

interface MessageItemProps {
    avatar: string;
    name: string;
    time: string;
    color?: string;
    children: ReactNode;
    badge?: React.JSX.Element;
}

export default function Message({ avatar, name, time, color = "text-red-600", badge, children }: MessageItemProps) {
    return (
        <div className="p-1 md:px-4 py-0">
            <div className="flex flex-row py-2">
                <div className="flex flex-row gap-2">
                    <img src={avatar} alt="User's avatar" className="rounded-full flex-shrink-0 object-cover h-11 w-11 hover:cursor-pointer" />
                    <div className="flex flex-col md:px-1">
                        <div className="flex flex-row gap-2">
                            <p className={`${color} font-semibold flex-shrink-0`}>{name}</p>
                            {badge}
                            <div className="pt-1 flex-shrink-0">
                                <p className="text-neutral-500 text-xs">{time}</p>
                            </div>
                        </div>
                        <div className="pr-4">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
