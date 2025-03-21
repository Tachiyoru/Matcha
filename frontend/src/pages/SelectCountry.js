// SelectCountry.js
import React, { useState } from 'react';
import { useUser } from '../context/UserContext'; // Importer le hook pour accéder au contexte
import { useNavigate } from 'react-router-dom';
import { IoChevronBack, IoSearch } from 'react-icons/io5';
import './SelectCountry.css';
import GetLocation from '../components/GetLocation';

const countries = [
    { code: 'US', name: 'United States' },
    { code: 'CN', name: 'China' },
    { code: 'JP', name: 'Japan' },
    { code: 'DE', name: 'Germany' },
    { code: 'GB', name: 'United Kingdom' },
    { code: 'IN', name: 'India' },
    { code: 'FR', name: 'France' },
    { code: 'CA', name: 'Canada' },
    { code: 'IT', name: 'Italy' },
    { code: 'BR', name: 'Brazil' },
    { code: 'KR', name: 'South Korea' },
    { code: 'AU', name: 'Australia' },
    { code: 'MX', name: 'Mexico' },
    { code: 'ES', name: 'Spain' },
    { code: 'ID', name: 'Indonesia' },
    { code: 'SA', name: 'Saudi Arabia' },
    { code: 'NL', name: 'Netherlands' },
    { code: 'CH', name: 'Switzerland' },
    { code: 'TR', name: 'Turkey' },
    { code: 'SE', name: 'Sweden' }
];

const SelectCountry = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const { userData, setUserData } = useUser(); // Utiliser le contexte pour accéder et modifier les données
    const navigate = useNavigate();
    const location = GetLocation();

    const handleNext = () => {
        if (selectedCountry) {
            setUserData({ ...userData, country: selectedCountry, city: location.city, suburb: location.suburb }); // Mettre à jour les données utilisateur
            navigate('/complete-profile');
        }
    };

    const filteredCountries = countries.filter(country =>
        country.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="country-selector">
            <header className="country-header">
                <button className="back-button" onClick={() => navigate(-1)}>
                    <IoChevronBack />
                </button>
                <h2>Select Your Country</h2>
            </header>

            <div className="search-container">
                <IoSearch className="search-icon" />
                <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="search-input"
                />
            </div>

            <div className="countries-list">
                {filteredCountries.map((country) => (
                    <button
                        key={country.code}
                        className={`country-item ${selectedCountry === country.name ? 'selected' : ''}`}
                        onClick={() => setSelectedCountry(country.name)}
                    >
                        <div className="country-info">
                            <img
                                src={`https://flagcdn.com/w40/${country.code.toLowerCase()}.png`}
                                alt={`${country.name} flag`}
                                className="country-flag"
                            />
                            <span className="country-code">{country.code}</span>
                            <span className="country-name">{country.name}</span>
                        </div>
                        <div className={`select-circle ${selectedCountry === country.name ? 'selected' : ''}`} />
                    </button>
                ))}
            </div>

            <button
                className="continue-button"
                onClick={handleNext}
                disabled={!selectedCountry}
            >
                Continue
            </button>
        </div>
    );
};

export default SelectCountry;
