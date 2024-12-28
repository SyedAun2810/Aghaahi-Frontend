import { Card, Col, Row } from "antd";
const { Meta } = Card;

const DocumentCard = ({ attachment }) => {
    const getDocumentIcon = (mediaType) => {
        switch (mediaType) {
            case "pdf":
                return <></>;
            // return <PdfIcon className="w-3 h-5" />;

            case "doc":
            case "docx":
                return <></>;
            // return <WordIcon className="w-4 h-5" />;

            case "xlsx":
            case "xls":
                return <></>;
            // return <ExcelIcon className="w-4 h-5" />;

            default:
                // return <FileOutlined className="w-3 h-5" />;
                return <></>;
        }
    };
    return (
        <a download={attachment?.name}>
            <Card
                hoverable
                cover={getDocumentIcon(attachment?.extension)}
                className="chat-document-card "
                bordered={false}
            >
                <Meta
                    avatar={getDocumentIcon(attachment?.extension)}
                    title={
                        <Row gutter={[8]}>
                            <Col>
                                <h1 className="m-0">Document</h1>
                            </Col>
                            <Col>
                                <p className={"text-sm font-thin text-gray-400"}>
                                    {Math.round(attachment?.size)} kb
                                </p>
                            </Col>
                        </Row>
                    }
                    description={attachment?.name}
                />
            </Card>
        </a>
    );
};

export default DocumentCard;
