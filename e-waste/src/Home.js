import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from './context/AuthContext.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Home.css';
import { faIndianRupee, faRupee, faRupeeSign } from '@fortawesome/free-solid-svg-icons';
function Home() {
  const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDJwCqtrlb0nXvEM48gh_mUs8jpfvpA0-w&libraries=places,directions`;
    script.async = true;

  useEffect(() => {
    

    script.onerror = () => {
        // Handle script loading error here
        console.error("Error loading Google Maps script.");
    };
    
    script.onload = initMap;

    document.head.appendChild(script);

    return () => {
        document.head.removeChild(script);
    }
}, []);



    const handleLogout = async () => {
        try {
            await logout();
            navigate('/');
            console.log('You are logged out')
        } catch (e) {
            console.log(e.message);
        }
    };

    const searchLocation = () => {
        const locationSearch = document.getElementById('location-search').value;

        const geocoder = new window.google.maps.Geocoder();

        geocoder.geocode({ address: locationSearch }, (results, status) => {
            if (status === window.google.maps.GeocoderStatus.OK && results[0]) {
                const location = results[0].geometry.location;

                map.setCenter(location);
                map.setZoom(15);

                if (userMarker) {
                    userMarker.setMap(null);
                }
                userMarker = new window.google.maps.Marker({
                    position: location,
                    map: map,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                    title: 'Searched Location'
                });

                findNearbyEwasteCenters(location);
            } else {
                alert('Location not found. Please try again.');
            }
        });
    };

    const findNearbyEwasteCenters = (location) => {
        const request = {
            location: location,
            radius: 10000,
            keyword: 'e-waste recycling center'
        };

        const placesService = new window.google.maps.places.PlacesService(map);

        placesService.nearbySearch(request, (results, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                displayEwasteCentersOnMap(results);
                displayEwasteCentersList(results);
            } else {
                alert('No nearby e-waste recycling centers found.');
            }
        });
    };

    const displayEwasteCentersOnMap = (centers) => {
        clearEwasteMarkers();

        centers.forEach((center) => {
            const centerLocation = center.geometry.location;

            const ewasteMarker = new window.google.maps.Marker({
                position: centerLocation,
                map: map,
                icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
                title: center.name
            });

            ewasteMarker.addListener('click', () => {
                calculateAndDisplayRoute(userMarker.getPosition(), centerLocation);
            });

            ewasteMarkers.push(ewasteMarker);
        });
    };

    const clearEwasteMarkers = () => {
        ewasteMarkers.forEach((ewasteMarker) => {
            ewasteMarker.setMap(null);
        });
        ewasteMarkers = [];
    };
    const showOnMap = (index) => {
      const center = ewasteMarkers[index];
      if (center) {
          calculateAndDisplayRoute(userMarker.getPosition(), center.getPosition());
          const mapContainer = document.getElementById('map');
          if (mapContainer) {
              mapContainer.scrollIntoView({ behavior: 'smooth' });
          }
      }
  };
  

  const displayEwasteCentersList = (centers) => {
    const ewasteCentersList = document.getElementById('center-list-container');
    ewasteCentersList.innerHTML = '';

    centers.forEach((center, index) => {
        const centerName = center.name;
        const centerAddress = center.vicinity;
        const centerRating = center.rating || 'N/A';

        const placeId = center.place_id;
        const request = {
            placeId: placeId,
            fields: ['name', 'formatted_address', 'photos', 'formatted_phone_number']
        };

        const service = new window.google.maps.places.PlacesService(map);

        service.getDetails(request, (place, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                const centerDetails = document.createElement('div');
                centerDetails.innerHTML = `
                    <div class="center-item">
                        <div class="center-image">
                            <img src="${place.photos ? place.photos[0].getUrl({ maxWidth: 200 }) : 'placeholder-image.jpg'}" alt="${centerName}">
                        </div>
                        <div class="details">
                            <h2>${centerName}</h2>
                            <p><strong>Address:</strong> <a href="#" data-index="${index}" class="map-link">${centerAddress}</a></p>
                            <p><strong>Phone:</strong> ${place.formatted_phone_number || 'N/A'}</p>
                            <p><strong>Rating:</strong> ${centerRating}</p>
                        </div>
                    </div>
                `;

                ewasteCentersList.appendChild(centerDetails);

                // Add event listener for map link
                const mapLink = centerDetails.querySelector('.map-link');
                mapLink.addEventListener('click', (event) => {
                    event.preventDefault();
                    showOnMap(event.target.dataset.index);
                });
            }
        });
    });
};

    

    const calculateAndDisplayRoute = (origin, destination) => {
        const request = {
            origin: origin,
            destination: destination,
            travelMode: 'DRIVING'
        };

        directionsService.route(request, (response, status) => {
            if (status === 'OK') {
                directionsDisplay.setDirections(response);
            } else {
                alert('Directions request failed due to ' + status);
            }
        });
    };

    const toggleDropdown = () => {
        const dropdown = document.querySelector('.dropdown-content');
        const dropbtn = document.querySelector('.dropbtn');

        if (dropdown.style.display === 'block') {
            dropdown.style.display = 'none';
            dropbtn.classList.remove('active');
        } else {
            dropdown.style.display = 'block';
            dropbtn.classList.add('active');
        }
    };

    let map;
    let userMarker;
    let ewasteMarkers = [];
    let directionsService;
    let directionsDisplay;

    const { user, logout } = UserAuth();
    const navigate = useNavigate();

    function initMap() {
        map = new window.google.maps.Map(document.getElementById('map'), {
            zoom: 11,
            center: { lat: 0, lng: 0 }
        });

        directionsService = new window.google.maps.DirectionsService();
        directionsDisplay = new window.google.maps.DirectionsRenderer();
        directionsDisplay.setMap(map);

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const userLocation = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    userMarker = new window.google.maps.Marker({
                        position: userLocation,
                        map: map,
                        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
                        title: 'Your Location'
                    });
                    map.setCenter(userLocation);
                    findNearbyEwasteCenters(userLocation);
                },
                () => {
                    alert('Geolocation service failed. Please enable it in your browser settings.');
                }
            );
        } else {
            alert('Your browser does not support geolocation.');
        }
    }

    return (
        <div className='cosa'>
            <header>
                <nav className="navbar">
                    <div className="navbar-left">
                        <h1>WattRebirth</h1>
                    </div>
                    <div className="user-account">
                        <ul className="navbar-menu">
                            <li><a href="#">Devices</a></li>
                            <li><a href="#contact">Contact</a></li>
                        </ul>
                        <div className="dropdown">
                            <button className="account-button">Account</button>
                            <div className="dropdown-content">
                                <a href="#">Profile</a>
                                <a href="#" onClick={handleLogout}>Log Out</a>
                            </div>
                        </div>
                    </div>
                </nav>
            </header>

            <div className="search-container">
                <input id="location-search" type="text" placeholder="Search for a location" />
                <button id="search-button" onClick={searchLocation}>Search</button>
            </div>

            <main>
                <div className="map-container">
                    <section id="map"></section>
                </div>
                <div className="info-container">
                    <div className="price-section" id="estimated-price">
                        <div className="section-header1"><div className="estm">Estimated Price for Your E-Waste</div><div className="rupee"><FontAwesomeIcon icon={faIndianRupee} style={{color: "#000000",fontWeight:'lighter'}} /> 500/-</div></div>
                        <p className="price-info">Did you know that recycling your old electronic devices can earn you some extra
                            cash? The estimated price for your e-waste depends on the type and condition of the devices you
                            have. Contact your nearest recycling center for a personalized quote.</p>
                    </div>
                    <div className="info-section" id="facts">
                        <div className="section-header">Fascinating E-Waste Facts</div>
                        <ul className="fact-t">
                            <li>Electronic waste, or e-waste, is the fastest-growing waste stream in the world.</li>
                            <li>Recycling one million laptops saves enough energy to power 3,500 American homes for a year.</li>
                            <li>It's estimated that only 20% of global e-waste is formally recycled, leading to environmental
                                and health hazards.</li>
                            <li>E-waste contains valuable materials like gold, silver, and copper that can be recovered through
                                recycling.</li>
                            <li>Improper disposal of e-waste can lead to soil and water pollution due to hazardous materials.
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="info-section" id="ewaste-centers-list">
                    <div className="section-header">E-Waste Recycling Centers List</div>
                    <div id="center-list-container" className="center-list">
                        {/* Dynamic content will be added here */}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;
