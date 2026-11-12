import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import HazardMap from './components/HazardMap';
import Chatbot from './components/Chatbot';
import SOSModal from './components/SOSModal';

export default function App() {
  const [selectedSegment, setSelectedSegment] = useState(null);
  const [layerToggles, setLayerToggles] = useState({
    liveTraffic: true,
    hotels: true,
    policeStations: true,
    rescueVolunteers: true,
    hazardZones: true
  });

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-slate-950 font-sans">
      <Sidebar
        selectedSegment={selectedSegment}
        onSelectSegment={setSelectedSegment}
        layerToggles={layerToggles}
        setLayerToggles={setLayerToggles}
      />
      <main className="flex-1 relative">
        <HazardMap layerToggles={layerToggles} />
        <Chatbot />
        <SOSModal />
      </main>
    </div>
  );
}