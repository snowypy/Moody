import React from 'react';

interface SliderProps {
  min: number;
  max: number;
  step: number;
  value: number[];
  onValueChange: (value: number[]) => void;
  className?: string;
}

const Slider: React.FC<SliderProps> = ({ min, max, step, value, onValueChange, className }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onValueChange([parseInt(e.target.value)]);
  };

  return (
    <div className={`relative w-full ${className}`}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0]}
        onChange={handleChange}
        className="slider"
      />
      <style jsx>{`
        .slider {
          -webkit-appearance: none;
          width: 100%;
          height: 15px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
          outline: none;
          padding: 0;
          margin: 0;
          box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: rgba(255, 0, 0, 0.8);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
        }

        .slider::-moz-range-thumb {
          width: 25px;
          height: 25px;
          border-radius: 50%;
          background: rgba(255, 0, 0, 0.8);
          cursor: pointer;
          box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Slider;