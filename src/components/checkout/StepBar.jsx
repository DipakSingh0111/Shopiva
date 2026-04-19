import React from "react";

const steps = ["Delivery", "Payment", "Confirm"];

const StepBar = ({ current }) => (
  <div className="flex items-center justify-center gap-0 mb-10">
    {steps.map((label, i) => {
      const done = i < current;
      const active = i === current;
      return (
        <React.Fragment key={label}>
          <div className="flex flex-col items-center gap-1">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300
                ${done
                  ? "bg-indigo-600 border-indigo-600 text-white"
                  : active
                  ? "bg-white border-indigo-600 text-indigo-600"
                  : "bg-white border-gray-200 text-gray-400"
                }`}
            >
              {done ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M12.416 3.376a.75.75 0 0 1 .208 1.04l-5 7.5a.75.75 0 0 1-1.154.114l-3-3a.75.75 0 0 1 1.06-1.06l2.353 2.353 4.493-6.74a.75.75 0 0 1 1.04-.207Z" clipRule="evenodd" />
                </svg>
              ) : (
                i + 1
              )}
            </div>
            <span className={`text-xs font-semibold ${active ? "text-indigo-600" : done ? "text-indigo-400" : "text-gray-400"}`}>
              {label}
            </span>
          </div>

          {i < steps.length - 1 && (
            <div className={`h-0.5 w-16 sm:w-24 mb-5 mx-1 rounded transition-all duration-500 ${done ? "bg-indigo-500" : "bg-gray-200"}`} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

export default StepBar;
