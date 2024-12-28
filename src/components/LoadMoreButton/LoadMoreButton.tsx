import { Button } from "antd";

export default function LoadMoreButton({
    loadMoreClickHandler
}: {
    loadMoreClickHandler: () => void;
}) {
    return (
        <div
            style={{
                textAlign: "center",
                marginBottom: 32,
                height: 32,
                lineHeight: "32px"
            }}
        >
            <Button onClick={loadMoreClickHandler}>loading more</Button>
        </div>
    );
}
