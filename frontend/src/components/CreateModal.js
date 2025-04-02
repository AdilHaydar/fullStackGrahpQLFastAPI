// components/Modal.js
import React, { useState } from 'react'
import styles from '../styles/Modal.module.css'
import StarRating from './StarRating'
import SelectYear from './SelectYear'
import FileUploader from './FileUploader'
import { useQuery, gql, useMutation } from '@apollo/client';


const POST_DATA = gql`
        mutation CreateMovie($movieData: MoviesAndSeriesInputType!) {
            createMovie(movieData: $movieData) {
                id
                title
            }
        }
        `;

const CreateModal = ({ showModal, handleCloseModal }) => {
    // const [isInvalidRating, setIsInvalidRating] = useState(false)
    const [rating, setRating] = useState(0)
    const [title, setTitle] = useState("")
    const [isInvalidYear, setIsInvalidYear] = useState(false)
    const [description, setDescription] = useState("")
    const [year, setYear] = useState("")
    const [genre, setGenre] = useState("")
    const [posterBase64, setPosterBase64] = useState(null)
    const [postMovie] = useMutation(POST_DATA)

    const testMethod = (base64) => {
        setPosterBase64(base64)
        console.log(base64)
    }
    const handleSubmitButton = () => {

        try{
            const { data } = postMovie({
                variables: {
                    movieData: {
                        title,
                        description,
                        year,
                        rating,
                        genre,
                        posterBase64,
                        userId
                    }
                }
            })
        } catch (error) {
            console.error("Error creating movie:", error)
            return
        }
        
        
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
                        <label>Genre</label>
                        <input type="text" className="form-control" value={genre} placeholder="Enter Genre" onChange={(e) => setGenre(e.target.value)}/>
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
                    <div className="modal-body">
                        <label>Upload Poster</label>
                        <FileUploader onFileChange={testMethod} />
                        <img src={`data:image/png;base64,${posterBase64}`} alt="Preview" className="img-fluid mt-2" style={{ maxWidth: "100%", maxHeight: "200px" }} />
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
