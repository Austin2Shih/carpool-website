export async function getCoordsToString(lat, lon) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/coordsToString`, {
        method: 'POST',
        body: JSON.stringify({
            "latitude": lat,
            "longitude": lon,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    const r = await res.json()
    return r.global_code;
}

export async function getLocation() {
    const res = await fetch('/api/getLocation')
    const r = await res.json()
    return r
}

export async function getDistance(str1, str2) {
    const res = await fetch(`${process.env.NEXT_PUBLIC_VERCEL_URL}/api/getDistance`, {
        method: 'POST',
        body: JSON.stringify({
            "start": str1,
            "end": str2,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    const r = await res.json()
    return r[0]
}

export async function getRatio(start1, dest1, start2, dest2) {
    const matrix1 = await getDistance(start1, start2)
    const matrix2 = await getDistance(start2, dest2)
    const matrix3 = await getDistance(dest2, dest1)
    const newDriveTime = matrix1.duration.value + 
        matrix2.duration.value + 
        matrix3.duration.value;

    const matrix4 = await getDistance(start1, dest1)
    const oldDriveTime = matrix4.duration.value

    const matrix5 = await getDistance(start2, dest2)
    const walkTime = matrix5.distance.value / 1.35

    return walkTime/(newDriveTime - oldDriveTime);
}