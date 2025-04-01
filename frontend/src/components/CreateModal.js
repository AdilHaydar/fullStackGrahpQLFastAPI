// components/Modal.js
import React, { useState } from 'react'
import styles from '../styles/Modal.module.css'
import StarRating from './StarRating'
import SelectYear from './SelectYear'
import { useQuery, gql } from '@apollo/client';

const CreateModal = ({ showModal, handleCloseModal }) => {
    // const [isInvalidRating, setIsInvalidRating] = useState(false)
    const [rating, setRating] = useState(0)
    const [title, setTitle] = useState("")
    const [isInvalidYear, setIsInvalidYear] = useState(false)
    const [description, setDescription] = useState("")
    const [year, setYear] = useState("")

    const handleSubmitButton = () => {
        const token = localStorage.getItem('token')
        const CHECK_TOKEN = gql`
        `
        const GET_DATA = gql`
        mutation createMovie {
            movieData(title: "${title}", description: "${description}", year: ${year}, rating: ${rating}) 
        }
        `;
        console.log(year)
        console.log(title)
        console.log(description)
        console.log(rating)
        console.log(isInvalidYear)
        handleCloseModal()
    }

    if (!showModal) return null; // Eğer modal gösterilmiyorsa, render etmiyoruz.

    return (
        <div className={`bg-opacity-50 ${styles.backdropBlur} modal show`} tabIndex="-1" style={{ display: 'block' }} aria-hidden="true">
            <div className="modal-dialog">
                <div className="bg-dark modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Create Movie/Series Review</h5>
                        <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                    </div>
                    <div className="modal-body">
                        <label>Title</label>
                        <input type="text" className="form-control" placeholder="Enter title" onChange={(e) => setTitle(e.target.value)}/>
                    </div>
                    <div className="modal-body">
                        <label>Description</label>
                        <textarea className="form-control" placeholder="Enter description" onChange={(e) => setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="modal-body">
                        <label>Year</label>
                        <SelectYear onYearChange={setYear}/>
                    </div>
                    <div className="modal-body">
                        <label>Rating</label>
                        <StarRating onRatingChange={setRating} />
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleSubmitButton}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateModal;
