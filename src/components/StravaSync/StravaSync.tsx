import { useEffect, useState } from "react";

// Your Strava Client ID from your Strava API settings
const STRAVA_CLIENT_ID = "138776";
// Add your client secret (in production, this should be handled by your backend)
const STRAVA_CLIENT_SECRET = "f72b6bb459a3c10cbf7664e0eaf9f068d0b6c5f1"; // You need to add this
// Update this to your frontend URL for the callback
const REDIRECT_URI = "http://localhost:5173"; // Changed from /strava/callback to main page

// The URL to send the user to for authorization
const STRAVA_AUTH_URL = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=activity:read_all`;

// Define a type for Strava activity
type StravaActivity = {
  id: number;
  name: string;
  start_date: string;
  type: string;
  distance: number;
  moving_time: number;
};

type StravaAthlete = {
  id: number;
  firstname: string;
  lastname: string;
};

// Type for Strava token response
type StravaTokenResponse = {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  athlete: StravaAthlete;
};

const StravaSync = () => {
  const [activities, setActivities] = useState<StravaActivity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [athlete, setAthlete] = useState<StravaAthlete | null>(null);

  // Check if user is authenticated
  const isAuthenticated = !!accessToken;

  // Check for stored token on component mount
  useEffect(() => {
    const storedToken = localStorage.getItem("strava_access_token");
    const tokenExpiry = localStorage.getItem("strava_token_expiry");
    const storedAthlete = localStorage.getItem("strava_athlete");

    if (storedToken && tokenExpiry) {
      const expiryTime = parseInt(tokenExpiry);
      if (Date.now() / 1000 < expiryTime) {
        setAccessToken(storedToken);
        if (storedAthlete) {
          setAthlete(JSON.parse(storedAthlete));
        }
      } else {
        // Token expired, remove from storage
        localStorage.removeItem("strava_access_token");
        localStorage.removeItem("strava_token_expiry");
        localStorage.removeItem("strava_refresh_token");
        localStorage.removeItem("strava_athlete");
      }
    }

    // Handle OAuth callback
    const urlParams = new URLSearchParams(window.location.search);
    const authCode = urlParams.get("code");
    const error = urlParams.get("error");

    if (error) {
      setError(`Authorization failed: ${error}`);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    } else if (authCode) {
      exchangeCodeForToken(authCode);
      // Clean up URL
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  // Exchange authorization code for access token
  const exchangeCodeForToken = async (code: string) => {
    setIsLoading(true);
    setError(null);
    try {
      console.log("Exchanging code for token:", code); // Debug log

      // Use URLSearchParams instead of FormData for proper encoding
      const params = new URLSearchParams();
      params.append("client_id", STRAVA_CLIENT_ID);
      params.append("client_secret", STRAVA_CLIENT_SECRET);
      params.append("code", code);
      params.append("grant_type", "authorization_code");

      const response = await fetch("https://www.strava.com/oauth/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: params.toString(),
      });

      console.log("Token exchange response status:", response.status); // Debug log

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Token exchange error response:", errorText); // Debug log
        throw new Error(
          `Token exchange failed: ${response.status} ${errorText}`
        );
      }

      const tokenData: StravaTokenResponse = await response.json();
      console.log("Token exchange successful:", tokenData); // Debug log

      // Store tokens and athlete data
      localStorage.setItem("strava_access_token", tokenData.access_token);
      localStorage.setItem("strava_refresh_token", tokenData.refresh_token);
      localStorage.setItem(
        "strava_token_expiry",
        tokenData.expires_at.toString()
      );
      localStorage.setItem("strava_athlete", JSON.stringify(tokenData.athlete));

      // Also store user as "logged in" for your app
      localStorage.setItem("user_authenticated", "true");
      localStorage.setItem(
        "user_data",
        JSON.stringify({
          id: tokenData.athlete.id.toString(),
          firstName: tokenData.athlete.firstname,
          lastName: tokenData.athlete.lastname,
          email: "", // Strava doesn't provide email in basic scope
          role: 0, // Default to client role
          clientInfo: null,
          coachInfo: null,
        })
      );

      setAccessToken(tokenData.access_token);
      setAthlete(tokenData.athlete);

      console.log("Successfully authenticated with Strava!"); // Debug log
    } catch (error: unknown) {
      console.error("Token exchange failed:", error);
      if (error instanceof Error) {
        setError(`Authentication failed: ${error.message}`);
      } else {
        setError("Failed to authenticate with Strava");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch activities when authenticated
  useEffect(() => {
    if (isAuthenticated && accessToken) {
      fetchActivities();
    }
  }, [isAuthenticated, accessToken]);

  const fetchActivities = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "https://www.strava.com/api/v3/athlete/activities?per_page=10",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Strava API Error: ${response.statusText}`);
      }

      const data = await response.json();
      setActivities(data);
    } catch (error: unknown) {
      console.error("Failed to fetch activities:", error);
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDisconnect = () => {
    localStorage.removeItem("strava_access_token");
    localStorage.removeItem("strava_token_expiry");
    localStorage.removeItem("strava_refresh_token");
    localStorage.removeItem("strava_athlete");
    // Also clear user session data
    localStorage.removeItem("user_authenticated");
    localStorage.removeItem("user_data");
    setAccessToken(null);
    setActivities([]);
    setAthlete(null);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Strava Sync</h1>
      {!isAuthenticated ? (
        <div>
          <p>Connect your Strava account to sync your activities.</p>
          <a href={STRAVA_AUTH_URL}>
            <button
              style={{
                backgroundColor: "#FC4C02",
                color: "white",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Connect to Strava
            </button>
          </a>
        </div>
      ) : (
        <div>
          {athlete && (
            <div style={{ marginBottom: "20px" }}>
              <h3>
                Connected as: {athlete.firstname} {athlete.lastname}
              </h3>
              <button
                onClick={handleDisconnect}
                style={{
                  backgroundColor: "#dc3545",
                  color: "white",
                  padding: "5px 10px",
                  border: "none",
                  borderRadius: "3px",
                  cursor: "pointer",
                }}
              >
                Disconnect
              </button>
            </div>
          )}

          <h2>Recent Activities</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: "red" }}>Error: {error}</p>
          ) : activities.length > 0 ? (
            <ul>
              {activities.map((activity: StravaActivity) => (
                <li key={activity.id} style={{ marginBottom: "10px" }}>
                  <strong>{activity.name}</strong> - {activity.type}
                  <br />
                  Date: {new Date(activity.start_date).toLocaleDateString()}
                  <br />
                  Distance: {(activity.distance / 1000).toFixed(2)} km
                  <br />
                  Duration: {Math.floor(activity.moving_time / 60)} minutes
                </li>
              ))}
            </ul>
          ) : (
            <p>No recent activities found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default StravaSync;
