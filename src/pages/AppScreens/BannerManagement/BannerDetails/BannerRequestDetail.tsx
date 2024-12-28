import useBannerRequestContainer from "./useBannerRequestContainer";

import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";
import GridView from "@Components/GridView";
import tableColumnsDetails from "../Columns/tableColumnsDetails";
import DetailsHeader from "../Components/DetailsHeader";
import ProgressLoader from "@Components/ProgressLoader/ProgressLoader";

import PlaceholderColorful from "@Assets/images/placeholder-colorful.png";

const downloadImage = async (imageUrl: string) => {
    const a = document.createElement("a");
    a.href = await toDataURL(imageUrl);
    a.download = "myImage.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};
async function toDataURL(url: string) {
    return fetch(url)
        .then((response) => {
            return response.blob();
        })
        .then((blob) => {
            return URL.createObjectURL(blob);
        });
}
const BannerRequestDetail = () => {
    const { requestDetailsData, isRequestDataFetchingOrLoading } = useBannerRequestContainer();

    if (isRequestDataFetchingOrLoading) {
        return <ProgressLoader />;
    }

    return (
        <>
            <RoundedContainer>
                <DetailsHeader orderId={requestDetailsData?.id} />
                <GridView
                    showPagination={false}
                    columns={tableColumnsDetails()}
                    isLoading={isRequestDataFetchingOrLoading}
                    isFetching={isRequestDataFetchingOrLoading}
                    data={[requestDetailsData] || []}
                    totalCount={1}
                />
                <RenderImage data={requestDetailsData?.image} />
            </RoundedContainer>
            {/* <Divider /> */}
        </>
    );
};

const RenderImage = ({ data }) => {
    const imageUrl = data?.url || PlaceholderColorful;

    return (
        <div className="mt-3">
            <p className="font-[600] my-2 color-[#202224[">Banner Image</p>
            <div className="relative inline-flex">
                <img
                    src={imageUrl}
                    alt="banner image"
                    width={350}
                    height={250}
                    style={{
                        objectFit: "cover",
                        border: "1px dashed",
                        borderColor: "#f38001",
                        borderRadius: 8
                    }}
                />
                {/* <CenteredBox
            position={"absolute"}
            px={2}
            py={0}
            zIndex={100}
            bottom={10}
            right={10}
            sx={{
              backgroundColor: "#FFFFFFCC",
              borderRadius: 12,
            }}
          >
            <Typography color={"primary"} sx={{ cursor: "pointer" }}>
              Download Image
            </Typography>
            <IconButton
              onClick={() => {
                downloadImage(imageUrl);
              }}
            >
              <DownloadIcon />
            </IconButton>
          </CenteredBox> */}
            </div>
        </div>
    );
};

export default BannerRequestDetail;
