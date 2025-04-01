import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { AppContext } from "../../context/AppContext";

function AllJobs() {
    const [jobs, setJobs] = useState([]);
    const { isAuthorized } = useContext(AppContext);

    // load all jobs on startup
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/job/get-all-jobs`,
                    {
                        withCredentials: true
                    }
                );

                setJobs(response.data.jobs);
            } catch (err) {
                console.log("error getting all jobs : ", err);
            }
        }

        fetchJobs();
    }, []);

    if(!isAuthorized) {
        return <h1 className="text-2xl font-bold text-center mt-6">Please login to see all jobs.</h1>
    }

    return (
        <div className="w-full h-40 p-4">
            <h1 className="text-2xl font-bold text-center mb-4 bg-sky-400 p-2 rounded-md">Available Jobs</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {
                    jobs && jobs.map((element) => (
                        <div key={element._id} className="flex flex-col bg-slate-300 w-full h-full m-2 p-4 justify-start text-left rounded-md shadow-md">
                            <p><b>Title: </b>{element.title}</p>
                            <p><b>Category: </b>{element.category}</p>
                            <p><b>Location: </b>{element.location}</p>
                            <Link to={`/job/${element._id}`}>
                                <button className="bg-amber-800 p-2 rounded-md shadow-md w-full mt-2 text-white font-bold">
                                    Job Details
                                </button>
                            </Link>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default AllJobs;
