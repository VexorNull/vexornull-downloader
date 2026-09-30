import "./globals.css";

export const metadata = {
  title: "VexorNull SaveHub Zenith - Universal Media Downloader",
  description: "Download high-definition videos, audio MP3 tracks, and photos seamlessly from any platform. Engineered by VexorNull.",
  keywords: "video downloader, mp3 extractor, instagram saver, tiktok downloader, youtube saver, vexornull",
  authors: [{ name: "Tanveer Hussain", url: "https://github.com/vexornull" }],
  creator: "VexorNull",
  openGraph: {
    title: "VexorNull SaveHub Zenith",
    description: "The ultimate decentralized media downloader engine crafted by VexorNull.",
    url: "https://vexornull-downloader.vercel.app",
    siteName: "VexorNull SaveHub",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VexorNull SaveHub Zenith",
    description: "Download any social media format seamlessly.",
    creator: "@vexornull",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" type="image/png" href="https://vexornull.github.io/favicon/favicon.png" />
      </head>
      <body className="min-h-screen flex flex-col justify-between">
        {children}
      </body>
    </html>
  );
}
