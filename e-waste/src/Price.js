import React from "react";
import  { useState } from 'react'
import './Price.css'
export default function PriceCalculator() {
    const [quantity, setQuantity] = useState(0);
    const [unitPrice, setUnitPrice] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    const devicePrices = {
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
    }
     
    const calculateTotalCost = () => {
      const newTotalCost = quantity * unitPrice;
      setTotalCost(newTotalCost);
    };
  
    return (
      <div id='body'>
        <h1 id='pname'>Price Calculator</h1>
        <div id='dnames'>
            <label>Device</label>
            <select id="itemselected" onClick={calunitprice} >
            <option value="">Select an item</option>
            <option value="Mixed E-waste Scrap">Mixed E-waste Scrap</option>
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
        <div id='quantity'>
          <label htmlFor="quantity">Quantity:</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </div>
        <div id='unitprice'>
          <label htmlFor="unitPrice">Unit Price:</label>
              <p>{unitPrice}</p>
        </div>
        <div id='button'>
        <button  onClick={calculateTotalCost}>Calculate Total Cost</button></div>
        {totalCost > 0 && (
          <div id='totalprice'>
            <h2>Total Cost:</h2>
            <p>{totalCost}</p>
          </div>
        )}
      </div>
    );
  }
  
