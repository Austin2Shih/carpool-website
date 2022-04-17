export default async function handler(req, res) {
    const data = req.body
    const start = data.start
    const end = data.end
    const string = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${start}&destinations=${end}&units=imperial&key=AIzaSyDIGTev3FnEsggSrZBojc214LfSLpMDxjA`
    const response = await fetch(string)
    const r = await response.json();
    res.json(r.rows[0].elements)
}