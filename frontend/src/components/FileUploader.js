import { useState } from "react";

const FileUploader = ({ onFileChange }) => {

    const handleFileChange = (e) => {
        const file = e.target.files?.[0]; 
        if (file) {
            const reader = new FileReader();
            reader.readAsDataURL(file); 
            reader.onload = () => {
                onFileChange(reader.result.split(",")[1])
            };
            reader.onerror = (error) => {
                console.error("File reading error:", error);
            };
        }
    };

    return (
        <div>
            <input type="file" className="form-control" onChange={handleFileChange} />
        </div>
    );
};

export default FileUploader;
