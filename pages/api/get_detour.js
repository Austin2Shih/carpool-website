function coordinateToLocation(latitude, longitude) {
    // https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDIGTev3FnEsggSrZBojc214LfSLpMDxjA&latlng=38.9855176,-77.5598243
    const load = async () => {
        try {
            const res = await fetch('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&key=AIzaSyDIGTev3FnEsggSrZBojc214LfSLpMDxjA');
            locationInfo = await res.json();
        } catch(err) {
            console.error(err);
        }
    };

    load();

    return locationInfo.results.formatted_address
}

function getLocation() {
    coordLocation = {};
    const load = async () => {
        try {
            const res = await fetch('https://www.googleapis.com/geolocation/v1/geolocate?key=AIzaSyDIGTev3FnEsggSrZBojc214LfSLpMDxjA');
            coordLocation = await res.json();
        } catch(err) {
            console.error(err);
        }
    };

    load();

    return coordinateToLocation(coordLocation.location.lat, coordLocation.location.lng)
}

export default function getDetour(coordPickup, coordDestination1, coordDestination2) { // returns detour time in seconds
    let origin = getLocation();
    let pickup = coordinateToLocation(coordPickup[0], coordPickup[1]);
    let destination1 = coordinateToLocation(coordDestination1[0], coordDestination1[1]);
    let destination2 = coordinateToLocation(coordDestination2[0], coordDestination2[1]);

    let originToPickup = {};
    let pickupToDestination1 = {};
    let destination1ToDestination2 = {};
    let orginToDestination2 = {};

    const load = async () => {
        try {
            const res = await fetch('https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + origin + '&destinations=' + pickup + '&units=imperial&key=AIzaSyDIGTev3FnEsggSrZBojc214LfSLpMDxjA');
            originToPickup = await res.json();
            const res2 = await fetch('https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + pickup + '&destinations=' + destination1 + '&units=imperial&key=AIzaSyDIGTev3FnEsggSrZBojc214LfSLpMDxjA');
            pickupToDestination1 = await res2.json();
            const res3 = await fetch('https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + destination1 + '&destinations=' + destination2 + '&units=imperial&key=AIzaSyDIGTev3FnEsggSrZBojc214LfSLpMDxjA');
            destination1ToDestination2 = await res3.json();
            const res4 = await fetch('https://maps.googleapis.com/maps/api/distancematrix/json?origins=' + origin + '&destinations=' + destination2 + '&units=imperial&key=AIzaSyDIGTev3FnEsggSrZBojc214LfSLpMDxjA');
            orginToDestination2 = await res4.json();
        } catch(err) {
            console.error(err);
        }
    };

    load();

    let t1 = originToPickup.rows.elements.duration[value] + pickupToDestination.rows.elements.duration[value] + destination1ToDestination2.rows.elements.duration[value];
    let t2 = orginToDestination.rows.elements.duration[value];

    return t1 - t2;
}