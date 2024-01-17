import React, { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import { AgGridReact } from 'ag-grid-react'; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme

const InventoryList = (data) => {
  const defaultColDef = useMemo(() => {
    return {
      flex: 1,
      minWidth: 10,
    };
  }, []);

  const [rowData, setRowData] = useState([
    { ID: 1, serial: 'ABC123', name: 'Laptop', supplier: 'TechMart', date: '2024-01-16T12:00:00.000Z', quantity: 10, notes: 'High-demand product' },
    { ID: 2, serial: 'DEF456', name: 'Printer', supplier: 'OfficeSupplies Inc.', date: '2024-01-16T14:30:00.000Z', quantity: 5, notes: 'Compatible with all operating systems' },
    { ID: 3, serial: 'GHI789', name: 'Desk Chair', supplier: 'Furniture World', date: '2024-01-16T09:45:00.000Z', quantity: 8, notes: 'Ergonomic design for comfort' },
    { ID: 4, serial: 'JKL012', name: 'Smartphone', supplier: 'MobileTech', date: '2024-01-16T16:15:00.000Z', quantity: 15, notes: 'Latest model with advanced features' },
    { ID: 5, serial: 'MNO345', name: 'Coffee Maker', supplier: 'KitchenAppliances Ltd.', date: '2024-01-16T08:30:00.000Z', quantity: 12, notes: 'Brews coffee in minutes' },
    { ID: 6, serial: 'PQR678', name: 'Monitor', supplier: 'TechWorld', date: '2024-01-16T11:00:00.000Z', quantity: 7, notes: 'High-resolution display' },
    { ID: 7, serial: 'STU901', name: 'Backpack', supplier: 'OutdoorGear Co.', date: '2024-01-16T13:45:00.000Z', quantity: 20, notes: 'Durable and spacious' },
    { ID: 8, serial: 'VWX234', name: 'Tablet', supplier: 'ElectronicsHub', date: '2024-01-16T10:30:00.000Z', quantity: 18, notes: 'Compact and lightweight' },
    { ID: 9, serial: 'YZA567', name: 'Desk Lamp', supplier: 'HomeDecor Store', date: '2024-01-16T15:00:00.000Z', quantity: 6, notes: 'Adjustable brightness' },
    { ID: 10, serial: 'BCD890', name: 'External Hard Drive', supplier: 'StorageSolutions', date: '2024-01-16T07:15:00.000Z', quantity: 25, notes: 'Large storage capacity' },
    { ID: 11, serial: 'ABC123', name: 'Wireless Mouse', supplier: 'TechGear Outlet', date: '2024-01-16T14:45:00.000Z', quantity: 30, notes: 'Ergonomic design with customizable buttons' },
    { ID: 12, serial: 'DEF456', name: 'Headphones', supplier: 'AudioEmporium', date: '2024-01-16T10:15:00.000Z', quantity: 15, notes: 'Noise-canceling feature for immersive audio experience' },
    { ID: 13, serial: 'GHI789', name: 'Sofa', supplier: 'Furniture Haven', date: '2024-01-16T16:30:00.000Z', quantity: 8, notes: 'Comfortable and stylish for the living room' },
    { ID: 14, serial: 'JKL012', name: 'Fitness Tracker', supplier: 'HealthTech Solutions', date: '2024-01-16T12:30:00.000Z', quantity: 22, notes: 'Monitors heart rate, steps, and sleep patterns' },
    { ID: 15, serial: 'MNO345', name: 'Gaming Laptop', supplier: 'GameMaster Tech', date: '2024-01-16T09:00:00.000Z', quantity: 5, notes: 'Powerful graphics for high-performance gaming' },
    { ID: 16, serial: 'PQR678', name: 'Microwave Oven', supplier: 'KitchenAppliances Ltd.', date: '2024-01-16T13:00:00.000Z', quantity: 12, notes: 'Quick and efficient cooking' },
    { ID: 17, serial: 'STU901', name: 'Digital Camera', supplier: 'PhotoWorld', date: '2024-01-16T11:45:00.000Z', quantity: 18, notes: 'High-resolution images and video recording' },
    { ID: 18, serial: 'VWX234', name: 'Bluetooth Speaker', supplier: 'AudioTech Hub', date: '2024-01-16T15:15:00.000Z', quantity: 25, notes: 'Portable speaker with long battery life' },
    { ID: 19, serial: 'YZA567', name: 'Smart Thermostat', supplier: 'HomeTech Solutions', date: '2024-01-16T07:30:00.000Z', quantity: 10, notes: 'Energy-efficient temperature control' },
    { ID: 20, serial: 'BCD890', name: 'Wrist Watch', supplier: 'FashionTime', date: '2024-01-16T09:45:00.000Z', quantity: 35, notes: 'Stylish and water-resistant design' },  
    { ID: 21, serial: 'XYZ123', name: 'Smartwatch', supplier: 'WearableTech Co.', date: '2024-01-16T11:30:00.000Z', quantity: 18, notes: 'Tracks fitness and receives notifications' },
    { ID: 22, serial: 'ABC456', name: 'Portable Speaker', supplier: 'AudioTech Hub', date: '2024-01-16T15:45:00.000Z', quantity: 25, notes: 'Wireless and water-resistant' },
    { ID: 23, serial: 'DEF789', name: 'Robot Vacuum Cleaner', supplier: 'SmartHome Solutions', date: '2024-01-16T07:45:00.000Z', quantity: 10, notes: 'Automated cleaning for convenience' },
    { ID: 24, serial: 'GHI012', name: 'Bluetooth Earbuds', supplier: 'AudioEmporium', date: '2024-01-16T09:15:00.000Z', quantity: 15, notes: 'Compact and noise-canceling' },
    { ID: 25, serial: 'JKL345', name: 'Wireless Keyboard', supplier: 'TechGear Outlet', date: '2024-01-16T14:00:00.000Z', quantity: 20, notes: 'Slim design with long battery life' },
    { ID: 26, serial: 'MNO678', name: 'Home Security Camera', supplier: 'SecurityTech Solutions', date: '2024-01-16T12:15:00.000Z', quantity: 12, notes: '24/7 monitoring and motion detection' },
    { ID: 27, serial: 'PQR901', name: 'Cordless Drill', supplier: 'ToolWorld', date: '2024-01-16T16:00:00.000Z', quantity: 8, notes: 'Powerful tool for DIY projects' },
    { ID: 28, serial: 'STU234', name: 'Drones', supplier: 'TechDrone Innovations', date: '2024-01-16T10:45:00.000Z', quantity: 5, notes: 'Capture aerial footage with ease' },
    { ID: 29, serial: 'VWX567', name: 'Electric Toothbrush', supplier: 'DentalCare Store', date: '2024-01-16T13:30:00.000Z', quantity: 15, notes: 'Improves oral health with sonic technology' },
    { ID: 30, serial: 'YZA890', name: 'Power Bank', supplier: 'MobileTech Accessories', date: '2024-01-16T08:45:00.000Z', quantity: 30, notes: 'Portable charger for smartphones and devices' },
    { ID: 31, serial: 'BCD123', name: 'Smart Thermostat', supplier: 'HomeTech Solutions', date: '2024-01-16T09:30:00.000Z', quantity: 10, notes: 'Energy-efficient temperature control' },
    { ID: 32, serial: 'EFG456', name: 'Wrist Watch', supplier: 'FashionTime', date: '2024-01-16T11:00:00.000Z', quantity: 35, notes: 'Stylish and water-resistant design' },
    { ID: 33, serial: 'HIJ789', name: 'Handheld Vacuum Cleaner', supplier: 'CleaningTech', date: '2024-01-16T14:30:00.000Z', quantity: 7, notes: 'Compact and powerful for quick cleanups' },
    { ID: 34, serial: 'KLM012', name: 'Bluetooth Mouse', supplier: 'TechGear Outlet', date: '2024-01-16T16:45:00.000Z', quantity: 18, notes: 'Wireless mouse with precision tracking' },
    { ID: 35, serial: 'NOP345', name: 'Coffee Grinder', supplier: 'KitchenEssentials', date: '2024-01-16T10:15:00.000Z', quantity: 12, notes: 'Grinds coffee beans to perfection' },
    { ID: 36, serial: 'QRS678', name: 'Smart Doorbell', supplier: 'HomeSecurity Solutions', date: '2024-01-16T13:45:00.000Z', quantity: 15, notes: 'Video doorbell with motion detection' },
    { ID: 37, serial: 'TUV901', name: 'Wireless Charging Pad', supplier: 'TechAccessories Hub', date: '2024-01-16T07:00:00.000Z', quantity: 22, notes: 'Charges devices without cables' },
    { ID: 38, serial: 'WXY234', name: 'External SSD', supplier: 'StorageSolutions', date: '2024-01-16T12:00:00.000Z', quantity: 9, notes: 'High-speed storage for data transfer' },
    { ID: 39, serial: 'ZAB567', name: 'Office Chair', supplier: 'Furniture World', date: '2024-01-16T15:15:00.000Z', quantity: 14, notes: 'Ergonomic design for office comfort' },
    { ID: 40, serial: 'CDE890', name: 'Digital Photo Frame', supplier: 'PhotoTech', date: '2024-01-16T08:30:00.000Z', quantity: 20, notes: 'Displays digital photos with slideshow feature' },
])

  // Column Definitions: Defines & controls grid columns.
  const [colDefs, setColDefs] = useState([
    { 
      field: "ID",
      headerCheckboxSelection: true,
      checkboxSelection: true,
      showDisabledCheckboxes: true, 
      maxWidth: 100
    },
    { 
      field: "serial",
      minWidth: 200,
    },
    { 
      field: "name",
      minWidth: 200,
    },
    { 
      field: "supplier",
      minWidth: 200,
    },
    { 
      field: "date" , 
      maxWidth: 150,
    },
    { 
      field: "quantity", 
      maxWidth: 90, 
    },
    { 
      field: "notes",
      minWidth: 800
    }
  ]);
  
  return (
    <div className="ag-theme-quartz" style={{ height: "95vh" }}>
      <AgGridReact 
        rowData={rowData} 
        columnDefs={colDefs} 
        defaultColDef={defaultColDef}
        rowSelection={'multiple'}
        sideBar={true}
        suppressRowClickSelection={true}
      />
    </div>
  );
};

export default InventoryList;