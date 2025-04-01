import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function JobDetails() {
    const [job, setJob] = useState({});
    const { isAuthorized, user } = useContext(AppContext);
    const navigateTo = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        const getJobDetail = async () => {
            try {
                const response = await axios.get(
                    `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/job/${id}`,
                    {
                        withCredentials: true
                    }
                );

                setJob(response.data.job);
            } catch (err) {
                console.log("error getting the job : ", err);
            }
        };

        getJobDetail();
    }, [id]);

    return (
        <section className="p-4 m-2">
            <h1 className="text-2xl font-bold text-center mb-4 bg-sky-400 p-2 rounded-md">
                Job Details
            </h1>
            <div className="flex flex-col sm:flex-row sm:justify-around sm:items-center">
                <div className="sm:w-2/3 space-y-4">
                    <p>
                        <b>Title: </b>
                        <span>{job.title}</span>
                    </p>
                    <p>
                        <b>Category: </b>
                        <span>{job.category}</span>
                    </p>
                    <p>
                        <b>Country: </b>
                        <span>{job.country}</span>
                    </p>
                    <p>
                        <b>City: </b>
                        <span>{job.city}</span>
                    </p>
                    <p>
                        <b>Location: </b>
                        <span>{job.location}</span>
                    </p>
                    <p>
                        <b>Description: </b>
                        <span>{job.description}</span>
                    </p>
                    <p>
                        <b>Job Posted On: </b>
                        <span>{job.jobPostedOn}</span>
                    </p>
                    <p>
                        <b>Salary: </b>
                        {job.fixedSalary ? (
                            <span>{job.fixedSalary}</span>
                        ) : (
                            <span>
                                {job.salaryFrom} - {job.salaryTo}
                            </span>
                        )}
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:w-1/3 flex justify-center">
                    {user && user.role === "Employer" ? (
                        <></>
                    ) : (
                        <Link to={`/application/${job._id}`}>
                            <button className="mt-4 font-bold w-40 p-2 bg-cyan-400 shadow-md rounded-md">
                                Apply Now
                            </button>
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}

export default JobDetails;
