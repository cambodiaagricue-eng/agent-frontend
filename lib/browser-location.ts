export async function getBrowserLocationLabel(): Promise<string> {
  if (typeof window === "undefined" || !("geolocation" in navigator)) {
    return "browser_location_unavailable";
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude.toFixed(6);
        const lng = position.coords.longitude.toFixed(6);
        resolve(`lat:${lat},lng:${lng}`);
      },
      () => {
        resolve("browser_location_denied");
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 60_000,
      },
    );
  });
}

export async function getBrowserCoordinates(): Promise<{ latitude: number; longitude: number } | null> {
  if (typeof window === "undefined" || !("geolocation" in navigator)) {
    return null;
  }

  return new Promise((resolve) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      () => {
        resolve(null);
      },
      {
        enableHighAccuracy: true,
        timeout: 8000,
        maximumAge: 60_000,
      },
    );
  });
}
