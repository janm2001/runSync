import { VStack } from "@chakra-ui/react";
import axios from "axios";
import { useCallback, useState } from "react";

interface RunningDataItem {
  Distance: string;
  Level: string;
  Time: string;
}

const SPEED_LIMITS = [
  { name: "Unlimited", bytesPerSecond: 0 },
  { name: "2 Mbps", bytesPerSecond: (2 * 1024 * 1024) / 8 },
  { name: "1 Mbps", bytesPerSecond: (1 * 1024 * 1024) / 8 },
  { name: "500 Kbps", bytesPerSecond: (500 * 1024) / 8 },
  { name: "100 Kbps", bytesPerSecond: (100 * 1024) / 8 },
];

const DownloadTimes = () => {
  const [downloadInfo, setDownloadInfo] = useState({
    progress: 0,
    totalSize: 0,
    loaded: 0,
  });
  const [isDownloading, setIsDownloading] = useState(false);
  const [runningData, setRunningData] = useState<RunningDataItem[]>([]);
  const [selectedSpeed, setSelectedSpeed] = useState(
    SPEED_LIMITS[0].bytesPerSecond
  );

  const resetState = () => {
    setIsDownloading(false);
    setDownloadInfo({ progress: 0, totalSize: 0, loaded: 0 });
    setRunningData([]);
  };

  const handleDownload = useCallback(async () => {
    resetState();
    setIsDownloading(true);
    const apiUrl = import.meta.env.VITE_API_BASE_URL;
    try {
      const response = await axios.get<RunningDataItem[]>(
        `${apiUrl}/runningtimes/data`
      );

      const allData = response.data;

      if (selectedSpeed > 0) {
        const dataSize = JSON.stringify(allData).length;
        setDownloadInfo((prev) => ({ ...prev, totalSize: dataSize }));

        // Simulate chunks for progress display
        const chunkSize = Math.max(1, Math.floor(dataSize / 20)); // 20 chunks

        for (let i = 0; i < dataSize; i += chunkSize) {
          const currentChunk = Math.min(chunkSize, dataSize - i);
          const loaded = i + currentChunk;

          // Calculate delay based on selected speed
          if (selectedSpeed > 0) {
            const delayInSeconds = currentChunk / selectedSpeed;
            const delayInMilliseconds = delayInSeconds * 1000;
            await new Promise((resolve) =>
              setTimeout(resolve, delayInMilliseconds)
            );
          }

          setDownloadInfo({
            totalSize: dataSize,
            loaded,
            progress: (loaded / dataSize) * 100,
          });
        }
      }

      // We only need the unique values for display, not the massive repeated list
      const uniqueData = Array.from(
        new Map(
          allData.map((item: RunningDataItem) => [
            `${item.Distance}-${item.Level}`,
            item,
          ])
        ).values()
      );
      setRunningData(uniqueData);
    } catch (error) {
      console.error("Download failed:", error);
      alert("Download failed. Make sure the .NET API is running.");
    } finally {
      setIsDownloading(false);
    }
  }, [selectedSpeed]);

  return (
    <VStack verticalAlign={"center"} justifyContent="center" p={4} gap={8}>
      <h1>Runner Performance Benchmarks</h1>
      <p>
        Download a data set of running times to see how you stack up. You can
        simulate different network speeds.
      </p>

      <div className="controls">
        <label htmlFor="speed-select">Select Speed:</label>
        <select
          id="speed-select"
          disabled={isDownloading}
          onChange={(e) => setSelectedSpeed(Number(e.target.value))}
          value={selectedSpeed}
        >
          {SPEED_LIMITS.map((speed) => (
            <option key={speed.name} value={speed.bytesPerSecond}>
              {speed.name}
            </option>
          ))}
        </select>
        <button
          onClick={handleDownload}
          disabled={isDownloading}
          style={{ marginTop: "10px" }}
        >
          {isDownloading ? "Downloading..." : "Download Data"}
        </button>
      </div>

      {isDownloading && (
        <div className="progress-section">
          <p>
            Downloading... {downloadInfo.progress.toFixed(2)}% (
            {(downloadInfo.loaded / 1048576).toFixed(2)} MB /{" "}
            {(downloadInfo.totalSize / 1048576).toFixed(2)} MB)
          </p>
          <progress value={downloadInfo.progress} max="100"></progress>
        </div>
      )}

      {runningData.length > 0 && !isDownloading && (
        <div className="results-table">
          <h2>Benchmark Times</h2>
          <table>
            <thead>
              <tr>
                <th>Distance</th>
                <th>Skill Level</th>
                <th>Benchmark Time</th>
              </tr>
            </thead>
            <tbody>
              {runningData.map((item: RunningDataItem, index: number) => (
                <tr key={index}>
                  <td>{item.Distance}</td>
                  <td>{item.Level}</td>
                  <td>{item.Time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </VStack>
  );
};

export default DownloadTimes;
