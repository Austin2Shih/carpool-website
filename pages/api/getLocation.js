export default async function handler(req, res) {
    const string = 'https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDIGTev3FnEsggSrZBojc214LfSLpMDxjA'
    const response = await fetch(string, {
        method: 'POST'
    });
    const coordLocation = await response.json();
    res.json(coordLocation.location)
}