// components/Modal.js
import React from 'react';

const CreateModal = ({ showModal, handleCloseModal }) => {
    if (!showModal) return null; // Eğer modal gösterilmiyorsa, render etmiyoruz.

    return (
        <div className="modal show" tabIndex="-1" style={{ display: 'block' }} aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Modal Title</h5>
                        <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                    </div>
                    <div className="modal-body">
                        <p>This is a modal triggered by the Patch Plus icon.</p>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateModal;
