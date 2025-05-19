/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: ["./app/**/*.{ts,js,tsx,jsx}",
    "./components/**/*.{ts,js,tsx,jsx}",
    "./lib/**/*.{ts,js,tsx,jsx}"],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
			  cs: {
				green: 'hsl(var(--cs-green))',
				orange: 'hsl(var(--cs-orange))',
				blue: 'hsl(var(--cs-blue))',
				lightBlue: 'hsl(var(--cs-light-blue))',
				lightOrange: 'hsl(var(--cs-light-orange))',
				darkerLightOrange: 'hsl(var(--cs-darker-light-orange))',
				midOrange: 'hsl(var(--cs-mid-orange))',
				darkOrange: 'hsl(var(--cs-dark-orange))',
				darkBlue: 'hsl(var(--cs-dark-blue))',
				altField: 'hsl(var(--cs-alt-field))',
				red: 'hsl(var(--cs-red))',
			  },
			          linkedin: {
          400: '#9bdaf3',
          500: '#00A0DC'
        }
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
}

