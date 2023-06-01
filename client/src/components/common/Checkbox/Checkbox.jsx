import { useState } from "react";
import "./checkbox.scss";

const Checkbox = ({ checked, onChange }) => {
    return (
        <div className="checkbox">
            <input type="checkbox" value={checked} onChange={onChange} />
            <img className={`checkbox__checkmark ${checked ? "checkbox__checkmark--active" : ""}`} src="/icons/check-dark.svg" alt="checkmark icon" />
        </div>
    );
};

export default Checkbox;
