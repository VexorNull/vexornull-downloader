import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { url, type = 'video' } = await request.json();

    if (!url || !url.startsWith('http')) {
      Provider return NextResponse.json({ success: false, message: "Please enter a valid HTTP/HTTPS media URL." }, { status: 400 });
    }

    const payload = {
      url: url,
      videoQuality: "max",
      filenameStyle: "pretty"
    };

    if (type === 'audio') {
      payload.downloadMode = "audio";
      payload.audioFormat = "mp3";
    }

    const response = await fetch("https://api.cobalt.tools/api/json", {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json",
        "User-Agent": "VexorNullNexus/11.0"
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (data.status === "error" || (!data.url && !data.picker)) {
      return NextResponse.json({ 
        success: false, 
        message: data.text || "Extraction failed. Ensure the link is public and accessible." 
      }, { status: 400 });
    }

    let downloadLinks = [];
    if (data.url) {
      downloadLinks.push({
        quality: type === 'audio' ? "Audio MP3 (Maximum Bitrate)" : (data.quality ? `HD ${data.quality}` : "High Definition Stream"),
        format: type === 'audio' ? "mp3" : "mp4",
        url: data.url
      });
    } else if (data.picker) {
      downloadLinks = data.picker.map(item => ({
        quality: item.type === 'photo' ? "High-Res Photo Asset" : (item.quality || "Media Stream"),
        format: item.type === 'photo' ? "jpg" : "mp4",
        url: item.url
      }));
    }

    return NextResponse.json({
      success: true,
      title: data.filename || "VexorNull Nexus Media",
      thumbnail: data.thumbnail || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&auto=format&fit=crop&q=60",
      downloads: downloadLinks
    });

  } catch (error) {
    return NextResponse.json({ success: false, message: "Internal server processing error." }, { status: 500 });
  }
}
