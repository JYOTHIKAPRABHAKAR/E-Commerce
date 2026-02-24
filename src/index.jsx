import axios from "axios";
import React from "react";
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import './bookindex.css';

const Index = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:3005/index');
                setData(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className="load">Loading...</div>;
    }
    
    return (
        <div className="container">
            <h1 className="Available">Available Courses</h1>
            <div className="grid">
                {data && data.works ? (
                    data.works.map((work) => (
                        <div key={work.key} className="card">
                            {/* <img src={work.cover_id ? `https://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg` : 'https://via.placeholder.com/150'} alt={work.title} className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">{work.title}</h3>
                                <p className="text-gray-600 mb-4">{work.authors ? work.authors.map(a => a.name).join(', ') : 'Unknown Author'}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-xl font-bold text-blue-600">${work.price}</span>
                                    <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                                        Add to Cart
                                    </button>
                                </div>
                            </div> */}
                                <div className="box">
                                {work.cover_id ? (
                                    <img
                                        src={`https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`}
                                        alt={work.title}
                                        className="image"
                                    />
                                ) : (
                                    <span className="alt">No Image</span>
                                )}
                            </div>
                            <div className="p-4">
                                <h3 className="title">{work.title}</h3>
                                <p className="sub">{work.subject[0]}</p>
                                <Link
                                    to={`/course/${work.key.replace("/works", "")}`}
                                    state={{ work }}
                                    className="button"
                                >
                                    Start Learning
                                </Link>
                        </div>
                        </div>
                        
                        // <div key={work.key}>
                        //     <h2>{work.title}</h2>
                        //     <p>{work.authors ? work.authors.map(a => a.name).join(', ') : 'Unknown Author'}</p>
                        // </div>
                        // console.log(work)
                    ))
                ) : (
                    <p>No works found.</p>
                )}
                {console.log(data.works)}
            </div>
        </div>
    )
}

export default Index