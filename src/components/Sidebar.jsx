import React, { useState } from 'react';
import { Shield, Radio, MapPin, Hotel, AlertTriangle, CheckCircle, Navigation, Layers, Bell } from 'lucide-react';

export default function Sidebar({ layerToggles, setLayerToggles }) {
  const [activeTab, setActiveTab] = useState('layers'); // 'layers' or 'news'

  const [volunteerNews] = useState([
    {
      id: 1,
      title: 'Passu & Sost KKH Blockage cleared partially',
      volunteer: 'Ahmed Ali (Local Rescue Volunteer)',
      time: '5 mins ago',
      type: 'Blocked (Red)',
      description: 'Heavy rockfall and snow accumulation near Passu. Heavy machinery deployed.',
      location: 'KKH Segment 2'
    },
    {
      id: 2,
      title: 'Checkpost Clearance Verified',
      volunteer: 'Zainab Bibi (Checkpost Warden)',
      time: '15 mins ago',
      type: 'Open (Green)',
      description: 'Smooth traffic flow reported. All vehicles passing with standard chains.',
      location: 'KKH Segment 1'
    },
    {
      id: 3,
      title: 'District Scout Patrol Warning',
      volunteer: 'Raja Kamran (District Scout)',
      time: '40 mins ago',
      type: 'Caution (Yellow)',
      description: 'Slippery patch due to morning frost near Jaglot. Drive with caution.',
      location: 'Jaglot to Skardu Road'
    }
  ]);

  const handleToggle = (layerKey) => {
    setLayerToggles(prev => ({
      ...prev,
      [layerKey]: !prev[layerKey]
    }));
  };

  return (
    <aside className="w-[420px] bg-slate-900/95 backdrop-blur-md border-r border-slate-800 flex flex-col h-full text-slate-100 z-10 shadow-2xl">
      {/* Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-2">
            <MountainIcon className="w-6 h-6 text-emerald-400" /> The North Tourism
          </h1>
          <p className="text-xs text-slate-400 mt-1">Disaster-Resilient Route & Volunteer Intelligence</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 bg-slate-950/50">
        <button
          onClick={() => setActiveTab('layers')}
          className={`flex-1 py-3 px-4 text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'layers'
              ? 'bg-slate-800 text-emerald-400 border-b-2 border-emerald-400'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
        >
          <Layers className="w-4 h-4" /> Map Layers & Filters
        </button>
        <button
          onClick={() => setActiveTab('news')}
          className={`flex-1 py-3 px-4 text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
            activeTab === 'news'
              ? 'bg-slate-800 text-emerald-400 border-b-2 border-emerald-400'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
          }`}
        >
          <Radio className="w-4 h-4 text-red-400 animate-pulse" /> Volunteer News Feed
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {activeTab === 'layers' ? (
          <div className="space-y-4">
            <div className="bg-slate-800/50 border border-slate-700/60 rounded-xl p-4">
              <h2 className="text-sm font-semibold text-slate-200 mb-3 flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" /> Map Layers & Infrastructure Checks
              </h2>
              <p className="text-xs text-slate-400 mb-4">
                Click checks below to toggle hotels, police stations, and exact route status on the live map.
              </p>

              <div className="space-y-3">
                {[
                  { key: 'liveTraffic', label: 'Live Road Status & Exact Routes', icon: Navigation, color: 'text-emerald-400' },
                  { key: 'hotels', label: 'Hotels & Rest Houses', icon: Hotel, color: 'text-amber-400' },
                  { key: 'policeStations', label: 'Police Stations & Checkposts', icon: Shield, color: 'text-blue-400' },
                  { key: 'rescueVolunteers', label: 'Active Rescue Volunteers', icon: Radio, color: 'text-red-400' },
                  { key: 'hazardZones', label: 'Hazard & Landslide Zones', icon: AlertTriangle, color: 'text-orange-400' }
                ].map((item) => {
                  const IconComponent = item.icon;
                  const isChecked = layerToggles[item.key];
                  return (
                    <label
                      key={item.key}
                      className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-all ${
                        isChecked
                          ? 'bg-slate-800/90 border-emerald-500/40 shadow-sm'
                          : 'bg-slate-900/40 border-slate-800 hover:bg-slate-800/40'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <IconComponent className={`w-5 h-5 ${item.color}`} />
                        <span className="text-sm font-medium text-slate-200">{item.label}</span>
                      </div>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggle(item.key)}
                        className="w-4 h-4 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 bg-slate-900 cursor-pointer"
                      />
                    </label>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
                <Bell className="w-4 h-4 text-emerald-400" /> Ground Reports & Volunteer News
              </h2>
              <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded-full font-medium">Live Feed</span>
            </div>

            {volunteerNews.map((news) => (
              <div
                key={news.id}
                className="bg-slate-800/60 border border-slate-700/70 rounded-xl p-4 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-cyan-400">{news.location}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${news.type.includes('Blocked') ? 'bg-red-500/20 text-red-400' : 'bg-emerald-500/20 text-emerald-400'}`}>
                    {news.type}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-100">{news.title}</h3>
                <p className="text-xs text-slate-300">{news.description}</p>
                <div className="pt-2 border-t border-slate-700/50 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-medium">{news.volunteer}</span>
                  <span>{news.time}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}

function MountainIcon(props) {
  return (
    <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}