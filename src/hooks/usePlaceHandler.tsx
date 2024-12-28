import { CompleteAddressTypes } from "@Utils/types";
import { useState } from "react";

let MAP_ADDRESS_ENTITIES = {
    city: "locality",
    state: "administrative_area_level_1",
    zipCode: "postal_code",
    country: "country"
};

const FIELDS_TO_VALIDATE = ["city", "state", "country", "zipCode", "route"];

const STORE_ADDRESS_KEY = "fullAddress";
const ADDRESS_KEY = "address";
const STORE_ADDRESS_KEYS = ["store", ADDRESS_KEY];
const CHANGED_AFTER_SELECTION_ERROR = "Kindly enter a valid address from suggestions.";

const usePlaceHandler = (form: any) => {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [streetStateCountryData, setStreetStateCountryData] = useState({
        street: "",
        state: "",
        country: ""
    });
    const [selectedAddress, setSelectedAddress] = useState<string | undefined>(undefined);

    // google autocomplete select handler
    const handlePlaceSelect = (place: any) => {
        const { lat, lng } = place?.geometry.location;
        setLatitude(lat());
        setLongitude(lng());
        if (place?.address_components?.length) {
            const address_cmp = place.address_components;
            const streetStateCountry = {};
            console.log(address_cmp, "addresss");
            const completeAddress: CompleteAddressTypes = {
                city: "",
                state: "",
                zipCode: "",
                country: ""
            };

            address_cmp.forEach((component: any) => {
                const { types, long_name, short_name } = component;
                FIELDS_TO_VALIDATE.forEach((field) => {
                    if (types.includes(MAP_ADDRESS_ENTITIES[field as keyof CompleteAddressTypes])) {
                        completeAddress[field as keyof CompleteAddressTypes] =
                            long_name || short_name || "";
                    }

                    if (types.includes("administrative_area_level_1")) {
                        streetStateCountry.state = short_name;
                    }
                    if (types.includes("country")) {
                        streetStateCountry.country = short_name;
                    }
                    if (types.includes("route")) {
                        streetStateCountry.streetAddress = short_name;
                    }
                });
            });

            form.setFieldValue(
                [...STORE_ADDRESS_KEYS, STORE_ADDRESS_KEY],
                place?.formatted_address
            );

            FIELDS_TO_VALIDATE.forEach((field) =>
                form.setFieldValue(
                    [...STORE_ADDRESS_KEYS, field],
                    completeAddress[field as keyof CompleteAddressTypes]
                )
            );
            form.validateFields([
                ...FIELDS_TO_VALIDATE.map((field) => [...STORE_ADDRESS_KEYS, field])
            ]);
            setStreetStateCountryData(streetStateCountry);
            setSelectedAddress(place?.formatted_address);
        }
    };
    return {
        latitude,
        longitude,
        selectedAddress,
        streetStateCountryData,
        handlePlaceSelect,
        MAP_ADDRESS_ENTITIES,
        FIELDS_TO_VALIDATE,
        STORE_ADDRESS_KEY,
        ADDRESS_KEY,
        STORE_ADDRESS_KEYS,
        CHANGED_AFTER_SELECTION_ERROR
    };
};

export default usePlaceHandler;
