"use client";

import React, { useState, useEffect, useRef } from "react";
import * as feather from "feather-icons";
import { Search, X, Shuffle, XCircle } from "lucide-react";
import type IconPickerProps from "../types/IconPicker";

export const IconPicker: React.FC<IconPickerProps> = ({
  rowsInOnePage = 6,
  columnsInOnePage = 6,
  iconHeight = 24,
  iconWidth = 24,
  pickerHeight = 500,
  pickerWidth = 500,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);

  const iconNames = Object.keys(feather.icons);
  const filteredIcons = iconNames.filter((name) =>
    name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const itemsPerPage = rowsInOnePage * columnsInOnePage;
  const totalPages = Math.ceil(filteredIcons.length / itemsPerPage);

  const currentIcons = filteredIcons.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setCurrentPage(0);
  }, [searchTerm]);

  const handleIconSelect = (iconName: string) => {
    setSelectedIcon(iconName);
    onSelect(iconName);
    setIsOpen(false);
  };

  const handlePrevPage = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  const handleRandomIcon = () => {
    const randomIndex = Math.floor(Math.random() * iconNames.length);
    const randomIcon = iconNames[randomIndex];
    handleIconSelect(randomIcon);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  return (
    <div className="relative" ref={pickerRef}>
      <div
        onClick={() => setIsOpen(true)}
        className="w-[100px] h-[100px] border-2 border-gray-200 rounded-lg flex items-center justify-center cursor-pointer hover:border-blue-500 transition-colors duration-200"
      >
        {selectedIcon ? (
          <div
            // dangerouslySetInnerHTML is used here because feather.icons[selectedIcon].toSvg() returns an SVG string
            // We need to render this SVG string as actual HTML/SVG elements rather than text

            dangerouslySetInnerHTML={{
              __html: feather.icons[
                selectedIcon as keyof typeof feather.icons
              ].toSvg({
                width: iconWidth * 1.5,
                height: iconHeight * 1.5,
              }),
            }}
          />
        ) : (
          <div className="text-gray-400">Select Icon</div>
        )}
      </div>

      {isOpen && (
        <div
          className="absolute z-50 mt-2 bg-white rounded-lg shadow-xl border border-gray-200"
          style={{ width: pickerWidth, height: pickerHeight }}
        >
          {/* Header Component with Search, Random and Close */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder="Search icons..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-10 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400 w-5 h-5" />
                {searchTerm && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
                  >
                    <XCircle className="w-5 h-5" />
                  </button>
                )}
              </div>
              <button
                onClick={handleRandomIcon}
                className="p-2 hover:bg-gray-100 rounded-lg"
                title="Random Icon"
              >
                <Shuffle className="w-5 h-5 text-gray-500" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-red-100 rounded-lg group"
              >
                <X className="w-5 h-5 text-gray-500 group-hover:text-red-500" />
              </button>
            </div>
          </div>

          {/* Main Icon Grid Component */}
          <div
            className="p-4 grid gap-4 content-start"
            style={{
              gridTemplateColumns: `repeat(${columnsInOnePage}, minmax(0, 1fr))`,
              height: `${pickerHeight - 140}px`,
              overflowY: "auto",
            }}
          >
            {currentIcons.map((iconName) => (
              <button
                key={iconName}
                onClick={() => handleIconSelect(iconName)}
                className="p-3 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors duration-200"
              >
                <div
                  dangerouslySetInnerHTML={{
                    __html: feather.icons[
                      iconName as keyof typeof feather.icons
                    ].toSvg({
                      width: iconWidth,
                      height: iconHeight,
                    }),
                  }}
                />
              </button>
            ))}
          </div>

          {/* Pagination */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 flex items-center justify-between bg-white rounded-b-lg">
            {currentPage > 0 && (
              <button
                onClick={handlePrevPage}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors duration-200"
              >
                Previous
              </button>
            )}
            {currentPage === 0 && <div />}
            <span className="text-sm text-gray-600">
              Page {currentPage + 1} of {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages - 1}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-blue-50 hover:text-blue-600 hover:border-blue-300 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-700 disabled:hover:border-gray-300"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
