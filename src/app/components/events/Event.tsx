import React from "react";
import EventButton from "./EventButton";

interface EventProps {
    name: string;
    description: string;
    icon?: string;
}

export default function Event({ name, description, icon }: EventProps) {
    return (
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 p-5 rounded-lg bg-gray-900/75 w-96 z-50">
            <div className="items-center justify-center text-white">
                <h1 className="text-bold text-center text-2xl pb-2">
                    { name } { icon }
                </h1>
                <hr className="p-2" />
                <p className="text-center text-lg pb-2">{ description }</p>
                <hr className="p-2" />

                <div className="flex items-center justify-center">
                    <EventButton text="Accept" />
                    <EventButton text="Decline" />
                </div>
            </div>
        </div>
    );
}
