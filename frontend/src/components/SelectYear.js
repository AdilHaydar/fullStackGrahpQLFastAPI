import { useState, useEffect } from "react";

const SelectYear = ({ onYearChange }) => {
    const [years, setYears] = useState([])

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const yearList = Array.from({ length: currentYear - 1900 + 1 }, (_, i) => currentYear - i);
        setYears(yearList);
    }, []);

    return (
        <select className="form-control" onChange={(e) => onYearChange(e.target.value)}>
            {years.map((year) => (
                <option key={year} value={year} >
                    {year}
                </option>
            ))}
        </select>
    );
};

export default SelectYear;
