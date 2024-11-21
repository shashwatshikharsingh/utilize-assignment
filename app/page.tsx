"use client";

import React, { useState } from "react";
import { IconPicker } from "../components/IconPicker";

export default function Home() {
  const [selectedIcon, setSelectedIcon] = useState<string>("");

  return (
    <div className="min-h-screen bg-blue-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
            Utilize Intern Assignment
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Icon Picker Component for Feather Icons
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-200">
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                Choose an Icon
              </h2>
              <p className="text-gray-600 text-sm">
                Click the box below to open the icon picker
              </p>
            </div>

            <div className="flex flex-col items-center">
              <IconPicker
                rowsInOnePage={6}
                columnsInOnePage={6}
                iconHeight={24}
                iconWidth={24}
                pickerHeight={500}
                pickerWidth={500}
                onSelect={setSelectedIcon}
              />

              {selectedIcon && (
                <div className="mt-6 text-center">
                  <p className="text-sm text-gray-600 mb-2">Selected Icon</p>
                  <div className="inline-block px-4 py-2 bg-indigo-50 rounded-full">
                    <code className="text-indigo-600 font-mono">
                      {selectedIcon}
                    </code>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
