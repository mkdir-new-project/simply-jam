import React from "react";

interface QueueAddProps {
    searchModalRef: React.RefObject<HTMLDivElement>;
}

export const QueueAdd: React.FC<QueueAddProps> = ({ searchModalRef }) => {
    return (<>
        <button className="text-sm text-text-3 border border-text-3 py-4 w-full rounded-xl border-dashed mt-5">
            Add more +
        </button>
    </>)
}