/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "../src/components/Home.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          primary: "#f3c090", // Your sidebar color
        },
      },
    },
    plugins: [],
  };

  
  
  
  