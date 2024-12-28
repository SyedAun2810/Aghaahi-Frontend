export default function Description({ about }: { about: string }) {
    return (
        <div className="mb-8">
            <p className="font-[600] text-base text-dark-main mb-2">Description</p>
            <p className="text-light-text font-[400] text-sm">{about}</p>
        </div>
    );
}
