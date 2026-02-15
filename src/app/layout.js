import "./globals.css";

export const metadata = {
    title: "ASR Services — Modern Recruitment Platform",
    description: "Connect top talent with leading companies. Post jobs, discover opportunities, and build your career.",
    icons: {
        icon: "/favicon.jpeg",
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    );
}
