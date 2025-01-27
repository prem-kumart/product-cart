/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily : {
      'red-hat' : ['Red Hat Text', 'sans-serif'],
    },
    screens: {
        'desktop':'1440px',
        'tablet' :'480px',
    },
    colors : {
     'red': 'hsl(14, 86%, 42%)',
     'green': 'hsl(159, 69%, 38%)',
     'white' :'hsl(0,0,100%)',
     'black' :'hsl(0,0,0)',
     'rose-50':' hsl(20, 50%, 98%)',
     'rose-100': 'hsl(13, 31%, 94%)',
     'rose-300': 'hsl(14, 25%, 72%)',
     'rose-400': 'hsl(7, 20%, 60%)',
     'rose-500': 'hsl(12, 20%, 44%)',
     'rose-900': 'hsl(14, 65%, 9%)', 
    
    },
    extend: {
      spacing :{
        '1100' :'88px',
        '500' :'40px',
        '400' :'32px',
        '300' :'24px',
        '200' :'16px',
        '150' :'12px',
        '100' :'8px',
        '50'  :'4px',
      }
    },
  },
  plugins: [],
}

