import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserAuth } from './context/AuthContext.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Home.css';
import { faIndianRupee, faRupee, faRupeeSign } from '@fortawesome/free-solid-svg-icons';
function Home() {
    const [unitPrice, setUnitPrice] = useState(0);
    
    
    const devicePrices = {
        'Mobile phone': 400,
        'Mixed E-waste Scrap': 500,
        'Non-Biodegradable monthly elec waste': 1000,
        'Black Inverter Stabilizer Scrap': 250,
        'Old UPS online Scrap': 50,
        'Old/Scrap AC freeze purchase/buyers': 10000,
        'Green Card Scrap': 250,
        'Old TV monitor Scrap': 150,
        'Plastic old electronic scrap': 5000,
        'Motor Scrap': 110,
        'Tin computer CPU Scrap': 100,
        'LED Monitor Scrap': 25,
        'Electric motors scrap': 400,
        'Mild Steel Ahuja Amplifier Scrap': 40,
        'Stainless Steel Electrical Electronic Scrap': 100,
        'Green PCB electronic': 220,
        'Mixed Hips TV Scrap for industrial': 45,
        'Car Industrial Scrap batteries': 95,
        'Copper Motor Scrap': 105,
        'Silver and Black Electronic Waste Scrap': 300,
        'Vehicle Machine Scrap': 50,
        'Electronic Waste Scraps': 60,
        'E-Waste Electronic Recycling waste': 15,
        'Aluminium Silver Jali scrap for melting': 380,
        'Electronic Scrap': 50,
        'Mix Electronic Scrap Buyer': 100,
        'CD-DVD Cutting Scrap': 120,
        'Buyer Copier Scrap': 10,
        'Electronic Board Scrap': 50,
        'Electronic transistor Scrap': 300,
        'Printer': 40,
        'Golden Sim scrap': 25,
        'Electrical motor scrap': 50,
        'Old Electronic Scrap': 40,
        'Telephone Scrap': 30,
        'Panel Scrap': 70,
        'Electronic Circuit Scrap': 40,
        'Electronic Music Player Scrap': 100,
        'Cable Scrap': 40,
        'Copper Scrap': 500,
        'Iron Scrap': 25,
        'Insulated Cable Scrap': 40,
        'Microwave oven Scrap': 700,
        'Silver Electronic Scrap': 102,
        'Metal Waste Scrap': 100,
        'Black E Waste Computer Scrap': 60,
        'Air Cooler': 20,
        'Ovens & mixers': 20,
        'Scrap Motors': 50,
        'Small Appliances': 20,
        'Vacuum Cleaner': 20,
        'Ceiling Fan': 100,
        'Plastic washing machine': 200,
        'Refrigerator Double Door': 1000,
        'Window AC': 3000,
        'Laptop': 1200,
        'Scrap Waste Metal': 100,
        'Battery Electronic Scrap': 50,
        'Stainless Steel Cable Scrap': 300,
      };
    function calunitprice(){
        const selectElement = document.getElementById('itemselected');
        const selectedOptionText = selectElement.options[selectElement.selectedIndex].text;
        setUnitPrice(devicePrices[selectedOptionText])
        console.log(unitPrice)
        
    }
     
    
    

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
            keyword: 'e waste recycling center'
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
                            <img src="${place.photos ? place.photos[0].getUrl({ maxWidth: 200 }) : '../WattRebirth-logos_white.png'}" alt="${centerName}">
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
                        <img src="../WattRebirth-logos_white.png"></img>

                    </div>
                    <div className="user-account">
                        <ul className="navbar-menu">
                        <li>
                <div className='aaa' >
            <select id="itemselected" style={{color:"black"}} onChange={calunitprice} >
            <option value=""   >Device</option>
            <option value="Mobile phone" >Mobile phone</option>
            <option value="Mixed E-waste Scrap" >Mixed E-waste Scrap</option>
            <option value="Non-Biodegradable monthly elec waste">Non-Biodegradable monthly elec waste</option>
            <option value="Black Inverter Stabilizer Scrap">Black Inverter Stabilizer Scrap</option>
            <option value="Old UPS online Scrap">Old UPS online Scrap</option>
            <option value="Old/Scrap AC freeze purchase/buyers">Old/Scrap AC freeze purchase/buyers</option>
            <option value="Green Card Scrap">Green Card Scrap</option>
            <option value="Old TV monitor Scrap">Old TV monitor Scrap</option>
            <option value="Plastic old electronic scrap">Plastic old electronic scrap</option>
            <option value="Motor Scrap">Motor Scrap</option>
            <option value="Tin computer CPU Scrap">Tin computer CPU Scrap</option>
            <option value="LED Monitor Scrap">LED Monitor Scrap</option>
            <option value="Electric motors scrap">Electric motors scrap</option>
            <option value="Mild Steel Ahuja Amplifier Scrap">Mild Steel Ahuja Amplifier Scrap</option>
            <option value="Stainless Steel Electrical Electronic Scrap">Stainless Steel Electrical Electronic Scrap</option>
            <option value="Green PCB electronic">Green PCB electronic</option>
            <option value="Mixed Hips TV Scrap for industrial">Mixed Hips TV Scrap for industrial</option>
            <option value="Car Industrial Scrap batteries">Car Industrial Scrap batteries</option>
            <option value="Copper Motor Scrap">Copper Motor Scrap</option>
            <option value="Silver and Black Electronic Waste Scrap">Silver and Black Electronic Waste Scrap</option>
            <option value="Vehicle Machine Scrap">Vehicle Machine Scrap</option>
            <option value="Electronic Waste Scraps">Electronic Waste Scraps</option>
            <option value="E-Waste Electronic Recycling waste">E-Waste Electronic Recycling waste</option>
            <option value="Aluminium Silver Jali scrap for melting">Aluminium Silver Jali scrap for melting</option>
            <option value="Electronic Scrap">Electronic Scrap</option>
            <option value="Mix Electronic Scrap Buyer">Mix Electronic Scrap Buyer</option>
            <option value="CD-DVD Cutting Scrap">CD-DVD Cutting Scrap</option>
            <option value="Buyer Copier Scrap">Buyer Copier Scrap</option>
            <option value="Electronic Board Scrap">Electronic Board Scrap</option>
            <option value="Electronic transistor Scrap">Electronic transistor Scrap</option>
            <option value="HP Scrap Printer">HP Scrap Printer</option>
            <option value="Golden Sim scrap">Golden Sim scrap</option>
            <option value="Electrical motor scrap">Electrical motor scrap</option>
            <option value="Old Electronic Scrap">Old Electronic Scrap</option>
            <option value="Telephone Scrap">Telephone Scrap</option>
            <option value="Panel Scrap">Panel Scrap</option>
            <option value="Electronic Circuit Scrap">Electronic Circuit Scrap</option>
            <option value="Electronic Music Player Scrap">Electronic Music Player Scrap</option>
            <option value="Cable Scrap">Cable Scrap</option>
            <option value="Copper Scrap">Copper Scrap</option>
            <option value="Iron Scrap">Iron Scrap</option>
            <option value="Insulated Cable Scrap">Insulated Cable Scrap</option>
            <option value="Panel Scrap">Panel Scrap</option>
            <option value="Microwave oven Scrap">Microwave oven Scrap</option>
            <option value="Silver Electronic Scrap">Silver Electronic Scrap</option>
            <option value="Metal Waste Scrap">Metal Waste Scrap</option>
            <option value="Black E Waste Computer Scrap">Black E Waste Computer Scrap</option>
            <option value="Air Cooler">Air Cooler</option>
            <option value="Ovens & mixers">Ovens & mixers</option>
            <option value="Scrap Motors">Scrap Motors</option>
            <option value="Small Appliances">Small Appliances</option>
            <option value="Vacuum Cleaner">Vacuum Cleaner</option>
            <option value="Ceiling Fan">Ceiling Fan</option>
            <option value="Plastic washing machine">Plastic washing machine</option>
            <option value="Refrigerator Double Door">Refrigerator Double Door</option>
            <option value="Window AC">Window AC</option>
            <option value="E waste Laptop Scrap">E waste Laptop Scrap</option>
            <option value="Scrap Waste Metal">Scrap Waste Metal</option>
            <option value="Battery Electronic Scrap">Battery Electronic Scrap</option>
            <option value="Stainless Steel Cable Scrap">Stainless Steel Cable Scrap</option>
         </select>

        </div>
        </li>
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
                        <div className="section-header1"><div className="estm">Estimated Price for Your E-Waste</div><div className="rupee"><FontAwesomeIcon icon={faIndianRupee} style={{color: "#000000",fontWeight:'lighter'}} /> {unitPrice}/-</div></div>
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