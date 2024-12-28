import utilService from "@Utils/utils.service";
import DocumentCard from "../DocumentCard/DocumentCard";

const RenderAttachments = ({ attachments }) => {
  return attachments?.map((media, i) => {
    const { attachment } = media || {};
    return mediaComponents(attachment?.type, attachment, i);
  });
};

const mediaComponents = (mediaType, attachment, index) => {
  switch (mediaType) {
    case "DOCUMENT":
      return (
        <DocumentCard
          key={`${attachment?.id}_${index}`}
          attachment={attachment}
        />
      );

    case "VIDEO":
      return (
        <video
          key={`${attachment?.id}_${index}`}
          controls
          preload="auto"
          className="h-36 object-cover max-h-36 rounded-md block relative">
          <source src={utilService.getBlobUrl(attachment)} />
          Your browser does not support the video tag.
        </video>
      );

    default:
      return null;
  }
};

export default RenderAttachments;
