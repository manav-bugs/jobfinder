import React, { useState } from "react";
import Input from "../utils/Input";
import axios from "axios";

function PostJob() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [location, setLocation] = useState("");
    const [salaryFrom, setSalaryFrom] = useState(0);
    const [salaryTo, setSalaryTo] = useState(0);
    const [fixedSalary, setFixedSalary] = useState(0);
    const [salaryType, setSalaryType] = useState("default");

    const postJob = async (e) => {
        e.preventDefault();

        try {
            await axios.post(
                `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/job/create-a-job`,
                { title, description, category, country, city, location, fixedSalary, salaryFrom, salaryTo },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );

            setTitle("");
            setCategory("");
            setCity("");
            setCountry("");
            setDescription("");
            setFixedSalary("");
            setSalaryTo("");
            setSalaryFrom("");
            setLocation("");
            setSalaryType("default");
        } catch (err) {
            console.log("Error posting this job: ", err);
        }
    }

    return (
        <>
            <h1 className="text-2xl font-bold text-center m-4 bg-sky-400 p-2 rounded-md text-white">POST NEW JOB</h1>
            <div className="flex justify-center p-4">
                <form className="bg-slate-300 rounded-md p-4 w-full max-w-lg" onSubmit={postJob}>
                    <div className="mb-2">
                        <Input
                            type="text"
                            id="title"
                            name="title"
                            label="Job Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="w-full p-2 border rounded-md text-black"
                        >
                            <option value="">Select Category</option>
                            <option value="Graphics & Design">Graphics & Design</option>
                            <option value="Mobile App Development">Mobile App Development</option>
                            <option value="Frontend Web Development">Frontend Web Development</option>
                            <option value="MERN Stack Development">MERN STACK Development</option>
                            <option value="Account & Finance">Account & Finance</option>
                            <option value="Artificial Intelligence">Artificial Intelligence</option>
                            <option value="Video Animation">Video Animation</option>
                            <option value="MEAN Stack Development">MEAN STACK Development</option>
                            <option value="MEVN Stack Development">MEVN STACK Development</option>
                            <option value="Data Entry Operator">Data Entry Operator</option>
                        </select>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <Input
                            type="text"
                            id="country"
                            name="country"
                            label="Country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                        />
                        <Input
                            type="text"
                            id="city"
                            name="city"
                            label="City"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                        />
                    </div>
                    <Input
                        type="text"
                        id="location"
                        name="location"
                        label="Location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        className="w-full"
                    />
                    <div className="mb-2">
                        <select
                            value={salaryType}
                            onChange={(e) => setSalaryType(e.target.value)}
                            className="w-full p-2 border rounded-md text-black"
                        >
                            <option value="default">Select Salary Type</option>
                            <option value="Fixed Salary">Fixed Salary</option>
                            <option value="Ranged Salary">Ranged Salary</option>
                        </select>
                        <div className="mt-2">
                            {salaryType === "default" ? (
                                <p className="text-sm text-red-500">Please provide Salary Type *</p>
                            ) : salaryType === "Fixed Salary" ? (
                                <Input
                                    type="number"
                                    id="fixedsalary"
                                    name="fixedsalary"
                                    label="Enter Fixed Salary"
                                    value={fixedSalary}
                                    onChange={(e) => setFixedSalary(e.target.value)}
                                />
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                    <Input
                                        type="number"
                                        id="salaryfrom"
                                        name="salaryfrom"
                                        label="Salary From"
                                        value={salaryFrom}
                                        onChange={(e) => setSalaryFrom(e.target.value)}
                                    />
                                    <Input
                                        type="number"
                                        id="salaryto"
                                        name="salaryto"
                                        label="Salary To"
                                        value={salaryTo}
                                        onChange={(e) => setSalaryTo(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    <textarea
                        rows="5"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Job Description"
                        className="w-full p-2 border rounded-md text-black"
                    />
                    <button type="submit" className="w-full mt-4 py-2 bg-sky-500 text-white rounded-md font-bold">Post Job</button>
                </form>
            </div>
        </>
    );
}

export default PostJob;