import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [urls, setUrls] = useState([]);

  const fetchUrls = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/url"
      );

      setUrls(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleSubmit = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/url/shorten",
        {
          url,
        }
      );

      setShortUrl(
        `http://localhost:5000/${response.data.shortCode}`
      );

      fetchUrls();
    } catch (error) {
  alert(
    error.response?.data?.message ||
    "Something went wrong"
  );
}
  };

  const handleDelete = async (id) => {
  console.log("Deleting ID:", id);

  try {
    await axios.delete(
      `http://localhost:5000/api/url/${id}`
    );

    fetchUrls();
  } catch (error) {
    console.log(error);
  }
};

  return (
    <div style={{ padding: "40px" }}>
      <h1>URL Shortener</h1>

      <br />

      <input
        type="text"
        placeholder="Enter URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        style={{
          width: "400px",
          padding: "10px",
        }}
      />

      <button
        onClick={handleSubmit}
        style={{
          marginLeft: "10px",
          padding: "10px 20px",
        }}
      >
        Shorten URL
      </button>
      
      


     {shortUrl && (
  <>
    <div style={{ marginTop: "20px" }}>
      <h3>Short URL:</h3>

      <a
        href={shortUrl}
        target="_blank"
        rel="noreferrer"
      >
        {shortUrl}
      </a>
    </div>

    <button
      onClick={() => navigator.clipboard.writeText(shortUrl)}
      style={{ marginTop: "10px" }}
    >
      Copy
    </button>
  </>
)}

      <hr style={{ margin: "30px 0" }} />

      <h2>All URLs</h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          marginTop: "20px",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
  <th>Original URL</th>
  <th>Short Code</th>
  <th>Clicks</th>
  <th>Action</th>
</tr>
        </thead>
       

        <tbody>
  {urls.map((item) => (
    <tr key={item._id}>
      <td>{item._id}</td>
      <td>{item.originalUrl}</td>
      <td>{item.shortCode}</td>
      <td>{item.clicks}</td>

      <td>
        <button onClick={() => handleDelete(item._id)}>
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
}

export default App;