// Authorization token that must have been created previously. See : https://developer.spotify.com/documentation/web-api/concepts/authorization
const token = 'BQATxZ0fBVgq2TH18N5RnTp6Med9xG0kEiZoCx_DpVbFZsPCEb6uB2_9WOH1ZfzTrfLhfydY3u6sqhHB_6fbCmvRjoVw4i8iaRxAUEYr40OAyLF7jAuQHFJ1pbLNy2OihLFSLrzpnQJks0EC-6DJX_MulmR2E-rBEvwjT4SNOrC207Yi7tuJhE900P-vXFRQYuu3Vp3KJKAtiq1jDWwMBPYgblAO9xY53E6qxsOXYWZrj7xQMgYnCbh0lZ_SjGdSM-_kG2-V5HJ1ptKwiPWLIPrn';
async function fetchWebApi(endpoint, method, body) {
  const res = await fetch(`https://api.spotify.com/${endpoint}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method,
    body:JSON.stringify(body)
  });
  return await res.json();
}

async function getTopTracks(){
  // Endpoint reference : https://developer.spotify.com/documentation/web-api/reference/get-users-top-artists-and-tracks
  return (await fetchWebApi(
    'v1/me/top/tracks?time_range=short_term&limit=10', 'GET'
  )).items;
}

(async () => {
    const topTracks = await getTopTracks();
    console.log(
      topTracks?.map(
        ({name, artists}) =>
          `${name} by ${artists.map(artist => artist.name).join(', ')}`
      )
    );
})()
