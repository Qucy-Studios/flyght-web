import React from 'react';
import {ggsans} from "@/app/_app";

export default function Chat({ children }: { children: React.ReactNode }) {
    return (
        <div className={`w-full px-4 ${ggsans.className} hidden md:flex`}>
            <div className="text-white flex flex-col bg-dischat min-w-full min-h-full px-4 py-4 text-left">
                {children}
            </div>
        </div>
    );
};
