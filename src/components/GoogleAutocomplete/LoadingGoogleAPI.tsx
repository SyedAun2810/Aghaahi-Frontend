import styles from "./GoogleAutocomplete.module.scss";
export default function LoadingGoogleAPI() {
    return (
        <div className={`${styles.container}  `}>
            <div className="flex flex-col flex-grow mr-4">
                <p className={`${styles["custom-label"]} `}>{"Store Address"}</p>
                <input
                    placeholder={"Enter store address"}
                    type="text"
                    autoComplete="new-password"
                    disabled
                    className={`${styles["custom-input"]}`}
                />
            </div>
        </div>
    );
}
