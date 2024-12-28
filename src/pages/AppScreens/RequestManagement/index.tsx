
import GridView from "@Components/GridView";
import { renderBannerColumns } from "./Columns/renderBannerColumns";
import RoundedContainer from "@Components/RoundedContainer/RoundedContainer";

import CustomModal from "@Components/CustomModal/CustomModal";
import CheckoutForm from "../RequestBanner/CheckoutForm/CheckoutForm";
import useBannerManagementContainer from "../BannerManagement/useBannerManagementContainer";
import ListingHeader from "./Components/ListingHeader";
import ListingFilters from "./Components/ListingFilter";

const UserManagement = () => {
    const {
        addValues,
        filtersData,
        clientSecret,
        handleReOrder,
        paymentModalRef,
        pageClickHandler,
        onPaymentSuccess,
        // bannerListingData,
        clearFilterHandler,
        onStatusUpdateClick,
        bannerRequestHandler,
        isBannerListingLoading
    } = useBannerManagementContainer();
    
    const bannerListingData = {
        data: [
            {
                id: 1,
                userName: "John Doe",
                email: "johndoe@example.com",
                role: "Admin",
                dateRequested: "2024-10-01",
                isBoosted: true,
                type: "basic" 
            },
            {
                id: 2,
                userName: "Jane Smith",
                email: "janesmith@example.com",
                role: "User",
                dateRequested: "2024-10-10",
                isBoosted: false,
                type: "premium"
            },
            {
                id: 3,
                userName: "Alice Brown",
                email: "alicebrown@example.com",
                role: "Moderator",
                dateRequested: "2024-10-15",
                isBoosted: true,
                type: "standard"
            },
            {
                id: 4,
                userName: "Bob Green",
                email: "bobgreen@example.com",
                role: "User",
                dateRequested: "2024-11-01",
                isBoosted: false,
                type: "premium"
            },
            {
                id: 1,
                userName: "John Doe",
                email: "johndoe@example.com",
                role: "Admin",
                dateRequested: "2024-10-01",
                isBoosted: true,
                type: "basic" 
            },
            {
                id: 2,
                userName: "Jane Smith",
                email: "janesmith@example.com",
                role: "User",
                dateRequested: "2024-10-10",
                isBoosted: false,
                type: "premium"
            },
            {
                id: 3,
                userName: "Alice Brown",
                email: "alicebrown@example.com",
                role: "Moderator",
                dateRequested: "2024-10-15",
                isBoosted: true,
                type: "standard"
            },
            {
                id: 4,
                userName: "Bob Green",
                email: "bobgreen@example.com",
                role: "User",
                dateRequested: "2024-11-01",
                isBoosted: false,
                type: "premium"
            },
            {
                id: 1,
                userName: "John Doe",
                email: "johndoe@example.com",
                role: "Admin",
                dateRequested: "2024-10-01",
                isBoosted: true,
                type: "basic" 
            },
            {
                id: 2,
                userName: "Jane Smith",
                email: "janesmith@example.com",
                role: "User",
                dateRequested: "2024-10-10",
                isBoosted: false,
                type: "premium"
            },
            {
                id: 3,
                userName: "Alice Brown",
                email: "alicebrown@example.com",
                role: "Moderator",
                dateRequested: "2024-10-15",
                isBoosted: true,
                type: "standard"
            },
            {
                id: 4,
                userName: "Bob Green",
                email: "bobgreen@example.com",
                role: "User",
                dateRequested: "2024-11-01",
                isBoosted: false,
                type: "premium"
            }
        ],
        pagination: {
            totalCount: 4
        }
    };
    
    return (
        <RoundedContainer>
            <ListingHeader bannerRequestHandler={bannerRequestHandler}   selectedStatus={"active"} />
            <ListingFilters clearFilter={() => {}} endDate={null} startDate={null}/>
            <GridView
                showPagination
                columns={renderBannerColumns({ onStatusUpdateClick, handleReOrder })}
                pagination={{
                    total: 89
                }}
                onChange={() => console.log("OnChange")}
                totalCount={98}
                onPaginate={(page) => {
                    
                }}
                selectedPage={1}
                pageSize={10}
                isLoading={false}
                isFetching={false}
                data={bannerListingData.data}
            />

            <CustomModal ref={paymentModalRef} destroyOnClose>
                <CheckoutForm onFinish={onPaymentSuccess} clientSecret={clientSecret} />
            </CustomModal>
        </RoundedContainer>
    );
};

export default UserManagement;
