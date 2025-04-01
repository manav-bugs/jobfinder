import React from "react";

function HeroSection() {
    const details = [
        {
            id: 1,
            title: "1,23,441",
            subTitle: "Live Job",
            icon: "https://img.icons8.com/ios-filled/50/youtube-live.png"
        },
        {
            id: 2,
            title: "91,220",
            subTitle: "Companies",
            icon: "https://img.icons8.com/color/48/group-of-companies.png"
        },
        {
            id: 3,
            title: "2,34,200",
            subTitle: "Job Seekers",
            icon: "https://img.icons8.com/color/48/administrator-male-skin-type-1.png"
        },
        {
            id: 4,
            title: "1,03,761",
            subTitle: "Employers",
            icon: "https://img.icons8.com/color/48/permanent-job.png"
        },
    ];

    return (
        <div className="flex flex-col items-center p-6 text-center">
            <div className="flex flex-col justify-center items-center mb-8">
                <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">Find a job that suits</h1>
                <h1 className="font-bold text-2xl sm:text-3xl md:text-4xl">your interests and skills!</h1>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 w-full max-w-6xl">
                {details.map((element) => (
                    <div key={element.id} className="flex flex-col items-center p-4 border-2 border-gray-300 rounded-lg bg-white shadow-md">
                        <img src={element.icon} alt={element.subTitle} className="w-12 h-12 mb-2" />
                        <p className="text-xl font-bold">{element.title}</p>
                        <p className="text-gray-700 font-semibold">{element.subTitle}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default HeroSection;