import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BottomNavBar from '../components/BottomNavBar';
import PageHeader from '../components/PageHeader';
import axios from '../config/axios';
import '../styles/pages/shared.css';
import '../styles/pages/Profile.css';

const UsersProfile = () => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const { userId } = useParams();
    const navigate = useNavigate();

    // Available interests for selection (same as Profile.js)
    const availableInterests = [
        { id: 'gaming', name: 'Gaming' },
        { id: 'dancing_singing', name: 'Dancing & Singing' },
        { id: 'language', name: 'Language' },
        { id: 'movie', name: 'Movie' },
        { id: 'book_novel', name: 'Book & Novel' },
        { id: 'architecture', name: 'Architecture' },
        { id: 'photography', name: 'Photography' },
        { id: 'fashion', name: 'Fashion' },
        { id: 'writing', name: 'Writing' },
        { id: 'nature_plant', name: 'Nature & Plant' },
        { id: 'painting', name: 'Painting' },
        { id: 'football', name: 'Football' },
        { id: 'animals', name: 'Animals' },
        { id: 'people_society', name: 'People & Society' },
        { id: 'gym_fitness', name: 'Gym & Fitness' },
        { id: 'food_drink', name: 'Food & Drink' },
        { id: 'travel_places', name: 'Travel & Places' },
        { id: 'art', name: 'Art' }
    ];

    const calculateAge = (birthdate) => {
        const birth = new Date(birthdate);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    };

    useEffect(() => {
        const loadUserProfile = async () => {
            try {
                const response = await axios.get(`/api/user/${userId}/profile`);
                setUser(response.data);
            } catch (error) {
                console.error('Error loading user profile:', error);
                navigate('/viewers');
            } finally {
                setLoading(false);
            }
        };
        loadUserProfile();
    }, [userId, navigate]);

    const nextPhoto = () => {
        if (user?.photos?.length) {
            setCurrentPhotoIndex((prev) => (prev + 1) % user.photos.length);
        }
    };

    const prevPhoto = () => {
        if (user?.photos?.length) {
            setCurrentPhotoIndex((prev) => (prev - 1 + user.photos.length) % user.photos.length);
        }
    };

    const handleBackClick = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="page-container">
                <PageHeader />
                <div className="content">
                    <div className="profile-info">
                        <p>Loading...</p>
                    </div>
                </div>
                <BottomNavBar />
            </div>
        );
    }

    return (
        <div className="page-container">
            <PageHeader />
            <div className="content">
                <div className="edit-profile-header" style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '1rem',
                    padding: '1rem 2rem',
                    marginBottom: '1rem',
                    width: '100%',
                    justifyContent: 'flex-start'
                }}>
                    <i 
                        className="fas fa-arrow-left" 
                        onClick={handleBackClick}
                        style={{ 
                            cursor: 'pointer',
                            fontSize: '1.5rem'
                        }}
                    ></i>
                    <h1 style={{ margin: 0, fontSize: '1.5rem' }}>User Profile</h1>
                </div>

                <div className='photo-gallery-container'>
                    {user.photos && user.photos.length > 0 ? (
                        <>
                            <div className='photo-gallery'>
                                <img 
                                    src={`../shared/uploads` + user.photos[currentPhotoIndex]} 
                                    alt="user pics" 
                                    className='profile-photos'
                                />
                                <button className="gallery-nav prev" onClick={prevPhoto}>
                                    <i className="fas fa-chevron-left"></i>
                                </button>
                                <button className="gallery-nav next" onClick={nextPhoto}>
                                    <i className="fas fa-chevron-right"></i>
                                </button>
                            </div>
                            <div className="photo-indicators">
                                {user.photos.map((_, index) => (
                                    <span 
                                        key={index}
                                        className={`photo-indicator ${index === currentPhotoIndex ? 'active' : ''}`}
                                        onClick={() => setCurrentPhotoIndex(index)}
                                    />
                                ))}
                            </div>
                        </>
                    ) : (
                        <p>No photos available</p>
                    )}
                </div>

                {user && (
                    <div className="profile-info">
                        <div className="profile-header">
                            <h1>
                                {user.username}, {user.firstname}
                                <span>, {calculateAge(user.birthdate)} ans</span>
                            </h1>
                        </div>

                        <h2 className="profile-header">About</h2>
                        <p>{user.job}, {user.country}</p>
                        {user.bio && <p>{user.bio}</p>}

                        <h2 className="profile-header">Interests</h2>
                        <div className='interest-array'>
                            {user.interests && user.interests.length > 0 ? (
                                user.interests.map((interestId) => {
                                    const interest = availableInterests.find(i => i.id === interestId);
                                    return (
                                        <p key={interestId} className='interest'>
                                            {interest ? interest.name : interestId}
                                        </p>
                                    );
                                })
                            ) : (
                                <p>No interest available</p>
                            )}
                        </div>
                    </div>
                )}
            </div>
            <BottomNavBar />
        </div>
    );
};

export default UsersProfile; 