import React from "react";

function Input({ id, name, type, label, value, onChange, className }) {
    return (
        <input 
            type={type} 
            id={id}
            name={name}
            placeholder={label}
            value={value}
            className={`${className} w-full p-2 border-2 border-solid border-cyan-700 outline-none text-black rounded-md sm:w-80 md:w-96 lg:w-full`}
            onChange={onChange}
        />
    );
}

export default Input;
