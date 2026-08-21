import './globals.css';

export const metadata = {
  title: 'Optical Max Eye Care',
  description: 'AI & 3D Eyewear Store',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
