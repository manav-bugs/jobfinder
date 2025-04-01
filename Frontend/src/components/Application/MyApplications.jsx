import React, { useEffect } from "react";
import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import ResumeModal from "./ResumeModal";
import axios from "axios";

function MyApplications() {
    const { user } = useContext(AppContext);
    const [applications, setApplications] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [resumeImageUrl, setResumeImageUrl] = useState("");

    useEffect(() => {
        const getApplications = async () => {
            try {
                let response = {};
                if (user && user.role === "Job Seeker") {
                    response = await axios.get(
                        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/application/my-applications`,
                        { withCredentials: true }
                    );
                } else if (user && user.role === "Employer") {
                    response = await axios.get(
                        `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/application/employer/all`,
                        { withCredentials: true }
                    );
                }

                setApplications(response.data.Applications);
            } catch (err) {
                console.log("error in getting the applications : ", err);
            }
        }

        getApplications();
    }, [user]);

    const deleteApplication = (id) => {
        axios.delete(
            `${import.meta.env.VITE_REACT_APP_BACKEND_BASEURL}/api/v1/application/delete/${id}`,
            { withCredentials: true }
        ).then(() => {
            setApplications((prevApplications) => prevApplications.filter((application) => application._id !== id));
        }).catch((err) => {
            console.log("error in deleting the application : ", err);
        });
    }

    const openModal = (imageUrl) => {
        setResumeImageUrl(imageUrl);
        setModalOpen(true);
    }

    const closeModal = () => {
        setModalOpen(false);
    }

    return (
        <section className="p-4">
            {user && user.role === "Job Seeker" ? (
                <>
                    <h1 className="text-2xl font-bold text-center mb-4 bg-sky-400 p-2 rounded-md">My Applications</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {applications.length <= 0 ? (
                            <h4 className="text-2xl font-bold">No Applications Found!</h4>
                        ) : (
                            applications.map((element) => (
                                <JobSeekerCard
                                    element={element}
                                    key={element._id}
                                    deleteApplication={deleteApplication}
                                    openModal={openModal}
                                />
                            ))
                        )}
                    </div>
                </>
            ) : (
                <>
                    <h1 className="text-2xl font-bold text-center mb-4 bg-sky-400 p-2 rounded-md">Applications Received</h1>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {applications.length <= 0 ? (
                            <h4 className="text-2xl font-bold">No Applications Found!</h4>
                        ) : (
                            applications.map((element) => (
                                <EmployerCard
                                    element={element}
                                    key={element._id}
                                    openModal={openModal}
                                />
                            ))
                        )}
                    </div>
                </>
            )}
            {modalOpen && (
                <ResumeModal imageUrl={resumeImageUrl} onClose={closeModal} />
            )}
        </section>
    );
}

const JobSeekerCard = ({ element, deleteApplication, openModal }) => {
    return (
        <div className="bg-slate-300 p-4 flex flex-col items-center shadow-md rounded-md">
            <div className="w-full mb-2">
                <p><b>Name: </b>{element.name}</p>
                <p><b>Email: </b>{element.email}</p>
                <p><b>Phone: </b>{element.phone}</p>
                <p><b>Address: </b>{element.address}</p>
                <p><b>Cover Letter: </b>{element.coverletter}</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-24 h-24 mb-2">
                    <img
                        src={element.resume.url}
                        alt="resume"
                        onClick={() => openModal(element.resume.url)}
                        className="cursor-pointer object-cover"
                    />
                </div>
                <button
                    className="mt-2 bg-red-500 text-white p-2 rounded-md"
                    onClick={() => deleteApplication(element._id)}
                >
                    Delete Application
                </button>
            </div>
        </div>
    );
};

const EmployerCard = ({ element, openModal }) => {
    return (
        <div className="bg-slate-300 p-4 flex flex-col items-center shadow-md rounded-md">
            <div className="w-full mb-2">
                <p><b>Name: </b>{element.name}</p>
                <p><b>Email: </b>{element.email}</p>
                <p><b>Phone: </b>{element.phone}</p>
                <p><b>Address: </b>{element.address}</p>
                <p><b>Cover Letter: </b>{element.coverletter}</p>
            </div>
            <div className="flex flex-col items-center">
                <div className="w-24 h-24 mb-2">
                    <img
                        src={element.resume.url}
                        alt="resume"
                        onClick={() => openModal(element.resume.url)}
                        className="cursor-pointer object-cover"
                    />
                </div>
            </div>
        </div>
    );
}

export default MyApplications;
