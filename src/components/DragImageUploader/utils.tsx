export const calculateImageStyles = (data) => {
    let dataLength = Object.keys(data).length;
    if (dataLength) {
        switch (dataLength) {
            case 1:
                return { width: "431px", height: "334px", maxHeight: "334px", padding: "10px" };
            case 2:
                return {
                    width: "215px",
                    height: "167px",
                    maxHeight: "167px",
                    marginTop: "auto",
                    marginBottom: "auto",
                    padding: "10px"
                };
            case 3:
            case 4:
                return {
                    width: "215px",
                    height: "167px",
                    maxHeight: "167px",
                    padding: "10px"
                };
        }
    }
};

export const calculateImagePadding = (idx: number) => {
    switch (idx) {
        case 0:
            return;
        case 1:
            return "pl-[0px]";
        case 2:
            return "pt-[0px]";
        case 3:
            return "pl-[0px] pt-[0px]";
    }
};
