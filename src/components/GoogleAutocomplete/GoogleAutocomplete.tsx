import React, { useEffect, useRef, useState } from "react";
import PropTypes from "prop-types";
import { GoogleApiWrapper } from "google-maps-react";
import LoadingGoogleAPI from "./LoadingGoogleAPI";
import styles from "./GoogleAutocomplete.module.scss";

let LoadingContainer = () => <LoadingGoogleAPI />;
const GoogleAutocomplete = (props) => {
    const {
        className = "hide-default-icon",
        value,
        onChange,
        containerClass,
        inputStyles = "",
        name = "GoogleAutoComplete",
        handleOnBlur = () => {},
        onFocusHandler = () => {},
        onLocationSelect,
        placeholder = "",
        locationTypes = null,
        componentRestrictions = null,
        label = ""
    } = props;
    const placeInputRef = useRef<HTMLInputElement>(null);
    const [focus, setFocus] = useState(false);

    useEffect(() => {
        const initPlaceAPI = () => {
            let autocomplete = new props.google.maps.places.Autocomplete(
                placeInputRef.current,
                componentRestrictions
            );
            new props.google.maps.event.addListener(autocomplete, "place_changed", function () {
                let place = autocomplete.getPlace();
                onLocationSelect(place);
            });
        };

        initPlaceAPI();
    }, []);

    const handleInputFocus = () => {
        onFocusHandler();
        if (placeInputRef.current) {
            placeInputRef.current.setAttribute("autoComplete", "new-password");
        }
    };

    const handleClick = () => {
        if (placeInputRef.current) {
            placeInputRef.current.focus();
        }
    };
    const isOccupied = focus;

    return (
        // <div className={`GoogleAutoComplete ${containerClass} `}>
        <div
            className={`${styles.container} ${isOccupied && styles["active-input"]} `}
            onFocus={() => {
                setFocus(true);
            }}
            onBlur={() => setFocus(false)}
            onClick={handleClick}
        >
            <div className="flex flex-col flex-grow mr-4">
                {label && <p className={`${styles["custom-label"]} `}>{label}</p>}
                {/* <div className={`custom-text-input  ${className} `}> */}
                <input
                    placeholder={placeholder}
                    name={name}
                    ref={placeInputRef}
                    value={value}
                    onChange={onChange}
                    className={`${styles["custom-input"]}`}
                    type="text"
                    autoComplete="new-password"
                    onFocus={handleInputFocus}
                    onBlur={handleOnBlur}
                />
                {/* </div> */}
            </div>
        </div>
    );
};

GoogleAutocomplete.propTypes = {
    value: PropTypes.any,
    onChange: PropTypes.any,
    inputStyles: PropTypes.any,
    name: PropTypes.any,
    handleOnBlur: PropTypes.func,
    onFocusHandler: PropTypes.func,
    containerClass: PropTypes.string,
    google: PropTypes.any,
    onLocationSelect: PropTypes.any,
    placeholder: PropTypes.string,
    locationTypes: PropTypes.any
};

export default GoogleApiWrapper({
    // apiKey: Config.env().GOOGLE_API_KEY,
    apiKey: import.meta.env.VITE_APP_GOOGLE_API_KEY,
    LoadingContainer: LoadingContainer
    // v: "3"
})(GoogleAutocomplete);
