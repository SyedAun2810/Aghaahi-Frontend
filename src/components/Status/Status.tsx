const Status = ({ active }: { active: boolean }) => {
    return (
        <>
            {active ? (
                <div
                    style={{
                        padding: "4px 10px 4px 10px",
                        color: "#F38001",
                        borderRadius: "4px",
                        background: "#F380011A",
                        width: "fit-content",
                        margin: "auto"
                    }}
                >
                    Active
                </div>
            ) : (
                <div
                    style={{
                        padding: "4px 10px 4px 10px",
                        color: "#FA513A",
                        borderRadius: "4px",
                        background: "#FA513A33",
                        width: "fit-content",
                        margin: "auto"
                    }}
                >
                    In-Active
                </div>
            )}
        </>
    );
};

export default Status;
