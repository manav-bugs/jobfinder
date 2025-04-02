import React from "react";

function Companies() {
    const companies = [
        {
            id: 1,
            title: "Microsoft",
            icon: "https://img.icons8.com/color/48/microsoft.png",
        },
        {
            id: 2,
            title: "Tesla",
            icon: "https://img.icons8.com/color/48/tesla-logo.png",
        },
        {
            id: 3,
            title: "Apple",
            icon: "https://img.icons8.com/ios-filled/50/mac-os.png",
        },
    ];

    return (
        <div className="flex flex-col justify-center items-center p-4">
            <h3 className="text-xl font-bold m-4 border-2 border-red-500 p-2 bg-red-400 text-center w-full max-w-md">
                TOP COMPANIES
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl">
                {companies.map((element) => (
                    <div 
                        key={element.id} 
                        className="flex flex-col sm:flex-row justify-center items-center bg-gray-100 p-4 rounded-lg shadow-md w-full text-center sm:text-left"
                    >
                        <img src={element.icon} alt="Company Logo" className="w-12 h-12 sm:w-16 sm:h-16 mx-auto sm:mx-0" />
                        <div className="text-lg font-bold mt-2 sm:mt-0 sm:ml-4">{element.title}</div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Companies;
