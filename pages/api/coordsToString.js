export default async function handler(req, res) {
    // https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDIGTev3FnEsggSrZBojc214LfSLpMDxjA&latlng=38.9855176,-77.5598243
    const data = req.body;
    const latitude = data.latitude
    const longitude = data.longitude
    console.log(latitude, longitude)
    const apiString = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&result_type=plus_code&key=AIzaSyDIGTev3FnEsggSrZBojc214LfSLpMDxjA`
    const response = await fetch(apiString)
    const r = await response.json();
    console.log(r)
    res.json(r.plus_code)
}