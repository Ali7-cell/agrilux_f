/**
 * Utility to fetch current user location (city/country) and live weather (temperature, humidity, rainfall)
 */
export async function getCurrentLocationAndWeather() {
  if (typeof window === "undefined" || !navigator.geolocation) {
    throw new Error("Geolocation is not supported by your browser.");
  }

  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          // 1. Fetch live weather from Open-Meteo
          const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation`;
          const weatherRes = await fetch(weatherUrl);
          const weatherData = await weatherRes.json();

          const temperature = weatherData.current?.temperature_2m;
          const humidity = weatherData.current?.relative_humidity_2m;
          const rainfall = weatherData.current?.precipitation;

          // 2. Fetch Reverse Geocode for City & Country
          let locationName = "Current Location";
          try {
            const geoUrl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
            const geoRes = await fetch(geoUrl);
            const geoData = await geoRes.json();
            const city = geoData.city || geoData.locality || geoData.principalSubdivision;
            const country = geoData.countryName;
            if (city && country) {
              locationName = `${city}, ${country}`;
            } else if (city || country) {
              locationName = city || country;
            }
          } catch (e) {
            console.warn("Reverse geocode fallback", e);
          }

          resolve({
            locationName,
            temperature: temperature !== undefined ? temperature.toString() : "",
            humidity: humidity !== undefined ? humidity.toString() : "",
            rainfall: rainfall !== undefined ? rainfall.toString() : "0",
            lat,
            lon,
          });
        } catch (err) {
          reject(new Error("Could not fetch live weather data."));
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          reject(new Error("Location permission denied. Please allow location access or enter manually."));
        } else {
          reject(new Error("Location lookup failed. Please enter weather values manually."));
        }
      },
      { timeout: 10000 }
    );
  });
}
