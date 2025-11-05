// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}", 
  ],
  darkMode: 'class', 
  theme: {
    extend: {
      colors: {
        // --- 1. Primary Brand Color (Based on Indigo) ---
        primary: {
          DEFAULT: '#4f46e5',   // Indigo-600
          hover: '#4338ca',    // Indigo-700
          focus: '#818cf8',    // Indigo-400
          light: '#eef2ff',    // Indigo-50 (For backgrounds/files)
        },
        
        // --- 2. Neutral Palette (Based on Gray) ---
        neutral: {
          50: '#f9fafb',    // Lightest background
          100: '#f3f4f6',   // Light background (Header)
          200: '#e5e7eb',   
          300: '#d1d5db',   // Light border
          400: '#9ca3af',   // Light text/icon
          500: '#6b7280',   
          600: '#4b5563',   // Dark text/icon
          700: '#374151',   
          800: '#1f2937',   // Darker text/headers
          900: '#111827',   // Darkest text/dark background
        },

        // --- 3. Semantic Colors ---
        error: '#ef4444',     // red-500
        editing: '#fffbeb',   // yellow-50 (Light Mode)
        // 🎯 NEW: Dark mode editing background
        'editing-dark': '#3a3000', // Darker yellow/brown
      },
    },
  },
  plugins: [],
}