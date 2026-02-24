import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import './course.css'

const Course = () => {
    const {state} = useLocation();
    const { id } = useParams();
    //console.log(state)
    //console.log(id)
    const work = state?.work;
    console.log(work)
    if(!work){
        return <div>Course Not Found</div>
    }
    return (
        <div className='container mx-auto p-4'>
            <h1 className='coursetitle mb-4'>{work.title}</h1>
            <div className='d-flex flex-column flex-md-row gap-3'>
                <div className='col-md-9'>
                    <div className='ratio ratio-16x9 bg-dark rounded shadow overflow-hidden'>
                        {/* <iframe
                            className="w-full h-[500px]"
                            src={`https://www.youtube.com/embed/${work.video_id || 'dQw4w9WgXcQ'}`}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe> */}
                        <img src={work.cover_id ? `https://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg` : 'https://via.placeholder.com/150'} alt={work.title} className="w-full h-48 object-cover" />
                    </div>
                    <div className='desc-con mt-4 bg-white p-4 rounded shadow'>
                        <h3 className='h4 fw-bold mb-2'>Description</h3>
                        <p>{work.description} {work.subject}</p>
                        <p>{work.authors.map(a => a.name).join(', ')}</p>
                        <p>Edition Count: {work.edition_count}</p>
                        <p>Published Date: {work.publish_date}</p>
                        <p>Public Scan: {work.public_scan}</p>
                        <p>Availability Status: {work.availability.status}</p>
                    </div>
                </div>
                
            <div className="col-md-3 bg-white p-4 rounded shadow">
                <h3 className="fs-4 fw-bold mb-4">Course Content</h3>

                <ul className="list-unstyled">
                    <li className="p-2 bg-primary bg-opacity-10 rounded mb-2" style={{ cursor: "pointer" }}>
                        1. Introduction
                    </li>
                    <li className="p-2 rounded mb-2 hover-bg-light" style={{ cursor: "pointer" }}>
                        2. Getting Started
                    </li>
                    <li className="p-2 rounded mb-2 hover-bg-light" style={{ cursor: "pointer" }}>
                        3. Core Concepts
                    </li>
                    <li className="p-2 rounded mb-2 hover-bg-light" style={{ cursor: "pointer" }}>
                        4. Advanced Topics
                    </li>
                    <li className="p-2 hover-bg-light rounded" style={{ cursor: "pointer" }}>
                        5. Conclusion
                    </li>
                </ul>
            </div>
            </div>
        </div>
    );
};

export default Course;