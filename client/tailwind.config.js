export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-panel': '#121214',
        'bg-deep': '#0b0b0c',
        'bg-elevated': '#1a1a1e',
        'primary-accent': '#ff4655',
        'secondary-accent': '#00f2ff',
        'text-main': '#ffffff',
        'text-muted': '#a1a1aa',
        'border-light': 'rgba(255, 255, 255, 0.05)',
        'border-medium': '#1f1f23',
        'border-accent': 'rgba(255, 70, 85, 0.3)',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
