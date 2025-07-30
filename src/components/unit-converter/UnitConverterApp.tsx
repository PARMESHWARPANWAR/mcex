'use client';
import React, { useState, useEffect } from 'react';
import { ChevronDown, Settings, Star, RotateCcw, Menu, Calculator } from 'lucide-react';

const UnitConverterApp = () => {
  const [selectedTab, setSelectedTab] = useState('basic');
  const [selectedCategory, setSelectedCategory] = useState('length');
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('m');
  const [showUnitSelector, setShowUnitSelector] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

  const tabs = [
    { id: 'basic', name: 'BASIC', color: 'bg-blue-500' },
    { id: 'living', name: 'LIVING', color: 'bg-green-500' },
    { id: 'science', name: 'SCIENCE', color: 'bg-purple-500' },
    { id: 'misc', name: 'MISC.', color: 'bg-orange-500' }
  ];

  const categories = {
    basic: [
      { id: 'length', name: 'Length', icon: '📏', color: 'bg-blue-50 border-blue-200' },
      { id: 'area', name: 'Area', icon: '◼️', color: 'bg-blue-50 border-blue-200' },
      { id: 'weight', name: 'Weight', icon: '⚖️', color: 'bg-blue-50 border-blue-200' },
      { id: 'volume', name: 'Volume', icon: '📦', color: 'bg-blue-50 border-blue-200' }
    ],
    living: [
      { id: 'currency', name: 'Currency', icon: '💱', color: 'bg-green-50 border-green-200' },
      { id: 'temperature', name: 'Temperature', icon: '🌡️', color: 'bg-green-50 border-green-200' },
      { id: 'time', name: 'Time', icon: '⏰', color: 'bg-green-50 border-green-200' },
      { id: 'speed', name: 'Speed', icon: '🏃', color: 'bg-green-50 border-green-200' }
    ],
    science: [
      { id: 'pressure', name: 'Pressure', icon: '🔽', color: 'bg-purple-50 border-purple-200' },
      { id: 'force', name: 'Force', icon: '➡️', color: 'bg-purple-50 border-purple-200' },
      { id: 'work', name: 'Work', icon: '🔨', color: 'bg-purple-50 border-purple-200' },
      { id: 'power', name: 'Power', icon: '⚡', color: 'bg-purple-50 border-purple-200' }
    ],
    misc: [
      { id: 'torque', name: 'Torque', icon: '🔄', color: 'bg-orange-50 border-orange-200' },
      { id: 'cooking', name: 'Cooking', icon: '🍴', color: 'bg-orange-50 border-orange-200' },
      { id: 'data', name: 'Data', icon: '💾', color: 'bg-orange-50 border-orange-200' },
      { id: 'fuel', name: 'Fuel', icon: '⛽', color: 'bg-orange-50 border-orange-200' }
    ]
  };

  const lengthUnits = [
    { id: 'm', name: 'Meter', symbol: 'm' },
    { id: 'cm', name: 'Centimeter', symbol: 'cm' },
    { id: 'mm', name: 'Millimeter', symbol: 'mm' },
    { id: 'km', name: 'Kilometer', symbol: 'km' },
    { id: 'in', name: 'Inch', symbol: 'in' },
    { id: 'ft', name: 'Foot', symbol: 'ft' },
    { id: 'yd', name: 'Yard', symbol: 'yd' },
    { id: 'mi', name: 'Mile', symbol: 'mi' }
  ];

  const conversions = [
    { value: '1', unit: 'm', name: 'Meter' },
    { value: '100', unit: 'cm', name: 'Centimeter' },
    { value: '1,000', unit: 'mm', name: 'Millimeter' },
    { value: '0.001', unit: 'km', name: 'Kilometer' },
    { value: '39.3701', unit: 'in', name: 'Inch' },
    { value: '3.28084', unit: 'ft', name: 'Foot' },
    { value: '1.09361', unit: 'yd', name: 'Yard' },
    { value: '0.000621', unit: 'mi', name: 'Mile' }
  ];

  const getTabColor = (tabId) => {
    const tab = tabs.find(t => t.id === tabId);
    return tab ? tab.color : 'bg-gray-500';
  };

  return (
    <div className="max-w-md mx-auto bg-white min-h-screen shadow-xl relative">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-700 to-slate-800 text-white px-4 py-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calculator className="w-6 h-6" />
            <h1 className="text-lg font-semibold">Unit Converter</h1>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 rounded-full hover:bg-slate-600 transition-colors"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-slate-600 transition-colors">
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <div className="absolute top-16 right-4 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50 w-64">
          <h3 className="font-semibold text-gray-800 mb-3">General Settings</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Sound effects</span>
              <button 
                onClick={() => setSoundEnabled(!soundEnabled)}
                className={`w-12 h-6 rounded-full ${soundEnabled ? 'bg-blue-500' : 'bg-gray-300'} relative transition-colors`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${soundEnabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Vibration</span>
              <button 
                onClick={() => setVibrationEnabled(!vibrationEnabled)}
                className={`w-12 h-6 rounded-full ${vibrationEnabled ? 'bg-blue-500' : 'bg-gray-300'} relative transition-colors`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${vibrationEnabled ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </button>
            </div>
            
            <div className="pt-2 border-t border-gray-200">
              <div className="text-sm text-gray-600 mb-2">Country selection</div>
              <div className="text-sm text-gray-500">Automatic (in)</div>
            </div>
            
            <div>
              <div className="text-sm text-gray-600 mb-2">Language selection</div>
              <div className="text-sm text-gray-500">Automatic (en)</div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id)}
              className={`flex-1 py-3 px-2 text-xs font-medium transition-all duration-200 ${
                selectedTab === tab.id
                  ? `text-white ${getTabColor(tab.id)} shadow-md`
                  : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>
      </div>

      {/* Category Grid */}
      <div className="p-4 bg-gray-50">
        <div className="grid grid-cols-2 gap-3">
          {categories[selectedTab]?.map((category) => (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                selectedCategory === category.id
                  ? `${getTabColor(selectedTab)} text-white shadow-lg transform scale-105`
                  : `${category.color} hover:shadow-md hover:scale-102 text-gray-700`
              }`}
            >
              <div className="flex flex-col items-center space-y-2">
                <span className="text-2xl">{category.icon}</span>
                <span className="text-sm font-medium">{category.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Conversion Interface */}
      <div className="p-4 bg-white">
        {/* Input Section */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4 border border-gray-200">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="w-full px-4 py-3 text-lg bg-white border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                placeholder="Enter value"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <RotateCcw className="w-4 h-4 text-gray-400" />
              </div>
            </div>
            
            <div className="relative">
              <button
                onClick={() => setShowUnitSelector(!showUnitSelector)}
                className="px-4 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 transition-colors flex items-center space-x-2 min-w-[80px]"
              >
                <span className="font-medium text-gray-700">{fromUnit}</span>
                <ChevronDown className="w-4 h-4 text-gray-500" />
              </button>
              
              {showUnitSelector && (
                <div className="absolute top-full mt-1 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-40 w-48 max-h-60 overflow-y-auto">
                  {lengthUnits.map((unit) => (
                    <button
                      key={unit.id}
                      onClick={() => {
                        setFromUnit(unit.id);
                        setShowUnitSelector(false);
                      }}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center justify-between"
                    >
                      <span className="font-medium">{unit.symbol}</span>
                      <span className="text-sm text-gray-500">{unit.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="space-y-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-lg font-semibold text-gray-800">Results</h3>
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
              <Star className="w-4 h-4 text-gray-400" />
            </button>
          </div>
          
          {conversions.map((conversion, index) => (
            <div
              key={index}
              className={`flex justify-between items-center py-4 px-4 rounded-lg transition-colors ${
                index === 0
                  ? 'bg-blue-50 border-l-4 border-blue-500'
                  : 'bg-gray-50 hover:bg-gray-100'
              }`}
            >
              <div className="flex items-center space-x-3">
                <span className={`text-lg font-semibold ${
                  index === 0 ? 'text-blue-600' : 'text-gray-700'
                }`}>
                  {conversion.value}
                </span>
                <span className={`text-sm font-medium ${
                  index === 0 ? 'text-blue-600' : 'text-gray-500'
                }`}>
                  {conversion.unit}
                </span>
              </div>
              <span className="text-sm text-gray-500">{conversion.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Currency Section (when currency is selected) */}
      {selectedCategory === 'currency' && (
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="text-xs text-gray-500 text-center">
            ※ Updated: Jul 30, 2025, 1:22 PM
          </div>
          <div className="mt-3 space-y-2">
            <div className="flex justify-between items-center py-2">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-4 bg-gradient-to-r from-orange-500 to-white to-green-500 rounded-sm"></div>
                <span className="font-medium">INR</span>
              </div>
              <span className="font-semibold">1.00</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-4 bg-gradient-to-r from-blue-800 via-white to-red-600 rounded-sm"></div>
                <span className="font-medium">USD</span>
              </div>
              <span className="font-semibold">0.012</span>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Action Area */}
      <div className="p-4 bg-gray-50 border-t border-gray-200">
        <div className="text-center">
          <button className="text-blue-600 text-sm font-medium hover:underline">
            View Favorites
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnitConverterApp;