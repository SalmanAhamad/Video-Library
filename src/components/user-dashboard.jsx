import { useCookies } from "react-cookie";
import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function UserDashboard() {
  const [cookies, setCookie, removeCookie] = useCookies("userName");
  const [videos, setVideos] = useState([
    { VideoId: 0, Title: "", Url: "", Comments: "", Likes: 0, Category_Id: 0 },
  ]);
  let navigate = useNavigate();

  function LoadVideos() {
    axios.get("http://127.0.0.1:2200/videos").then((response) => {
      setVideos(response.data);
    });
  }

  useEffect(() => {
    if (cookies["userName"] === undefined) {
      navigate("/userlogin");
    } else {
      LoadVideos();
    }
  }, []);

  return (
    <div>
      <h3> {cookies["userName"]} - Dashboard</h3>
      <section className="d-flex flex-wrap">
        {videos.map((video) => (
          <div
            key={video.VideoId}
            className="card p-2 m-2"
            style={{ width: "400px" }}
          >
            <div className="card-header" style={{ height: "120px" }}>
              <h3>{video.Title}</h3>
            </div>
            <div className="card-body">
              <iframe src={video.Url} width="100%" height="200"></iframe>
            </div>
            <div className="card-footer">
              <span className="bi bi-hand-thumbs-up"></span> {video.Likes} Likes
              <div>
                <label className="form-label fw-bold">Comments:</label>
                <div>{video.Comments}</div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
