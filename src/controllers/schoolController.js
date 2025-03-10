const db = require("../config/db");

// Add School
const addSchool = (req, res) => {
    const { name, address, latitude, longitude } = req.body;
    if (!name || !address || typeof latitude !== "number" || typeof longitude !== "number") {
        return res.status(400).json({ message: "Invalid input data." });
    }

    const sql = "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)";
    db.query(sql, [name, address, latitude, longitude], (err) => {
        if (err) return res.status(500).json({ message: "Database insertion error." });
        res.status(201).json({ message: "School added successfully." });
    });
};

// Calculate Distance using Haversine formula
const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371;
    const toRad = (value) => (value * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
};

// List Schools sorted by proximity
const listSchools = (req, res) => {
    const userLat = parseFloat(req.query.latitude);
    const userLon = parseFloat(req.query.longitude);

    if (isNaN(userLat) || isNaN(userLon)) {
        return res.status(400).json({ message: "Invalid latitude or longitude." });
    }

    db.query("SELECT * FROM schools", (err, results) => {
        if (err) return res.status(500).json({ message: "Database retrieval error." });

        const sorted = results.map((school) => ({
            ...school,
            distance: calculateDistance(userLat, userLon, school.latitude, school.longitude),
        })).sort((a, b) => a.distance - b.distance);

        res.json(sorted);
    });
};

module.exports = { addSchool, listSchools };
