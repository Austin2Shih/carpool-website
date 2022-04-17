export default async function() {
    const client = await clientPromise
    const db = client.db("users")
    db.collection("users").forEach(driver => {
        if (driver.live.state == "driving") {
            db.collection("users").forEach(walker => {
                if (walker.live.state == "walking") {
                    let time = getDetour(walker.live.position, walker.live.destination, driver.live.destination);
                    detoursList.push(time);
                }
            })
        }
    })
}