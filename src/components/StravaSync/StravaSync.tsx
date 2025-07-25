import { useEffect, useState } from "react";

// Your Strava Client ID from your Strava API settings
const STRAVA_CLIENT_ID = "138776";
// The URL your backend is listening on for the token exchange
const REDIRECT_URI = "http://localhost:8080/exchange_token";

// The URL to send the user to for authorization
const STRAVA_AUTH_URL = `https://www.strava.com/oauth/authorize?client_id=${STRAVA_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=activity:read_all`;

// --- MOCK ---
// In a real app, you would securely get this token from your backend
// after the user has logged in and completed the OAuth flow.
// For this example, you can get a temporary one from your Strava API settings page
// under "My App" to test the API call.
const MOCK_ACCESS_TOKEN = "";

// Define a type for Strava activity (simplified for this example)
type StravaActivity = {
  id: number;
  name: string;
  start_date: string;
};

const StravaSync = () => {
  const [activities, setActivities] = useState<StravaActivity[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const isAuthenticated = !!MOCK_ACCESS_TOKEN;

  useEffect(() => {
    if (isAuthenticated) {
      const fetchActivities = async () => {
        setIsLoading(true);
        setError(null);
        try {
          const response = await fetch(
            "https://www.strava.com/api/v3/athlete/activities?per_page=10",
            {
              headers: {
                Authorization: `Bearer ${MOCK_ACCESS_TOKEN}`,
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

      fetchActivities();
    }
  }, [isAuthenticated]);
  return (
    <div>
      <h1>Strava Sync</h1>
      {!isAuthenticated ? (
        <a href={STRAVA_AUTH_URL}>
          <button>Connect to Strava</button>
        </a>
      ) : (
        <div>
          <h2>Recent Activities</h2>
          {isLoading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>Error: {error}</p>
          ) : activities.length > 0 ? (
            <ul>
              {activities.map((activity: StravaActivity) => (
                <li key={activity.id}>
                  {activity.name} -{" "}
                  {new Date(activity.start_date).toLocaleDateString()}
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
