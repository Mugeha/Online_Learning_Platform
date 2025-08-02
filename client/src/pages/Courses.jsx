import React, { useEffect, useState } from "react";
import "./Courses.css";
import { useNavigate } from "react-router-dom";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const [role, setRole] = useState(null);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    const fetchCourses = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/courses", {
          headers: {
            Authorization: token,
          },
        });

        const data = await res.json();
        setCourses(data.courses);

        const payload = JSON.parse(atob(token.split(".")[1]));
        setRole(payload.role);
        setUserId(payload.userId);
      } catch (err) {
        console.error("Failed to fetch courses:", err);
      }
    };

    fetchCourses();
  }, [navigate]);

  const handleEnroll = async (courseId) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`http://localhost:5000/api/courses/${courseId}/enroll`, {
        method: "POST",
        headers: {
          Authorization: token,
        },
      });
      alert("Enrolled successfully!");
    } catch (err) {
      alert("Failed to enroll.");
    }
  };

  return (
    <div className="courses-page">
      <h2>Available Courses</h2>
      {role === "instructor" && (
        <button onClick={() => navigate("/add-course")} className="add-btn">
          Add New Course
        </button>
      )}
      <div className="courses-list">
        {courses.map((course) => (
          <div key={course._id} className="course-card">
            <h3>{course.title}</h3>
            <p>{course.description}</p>
            <p>
              <strong>Instructor:</strong> {course.instructor.name}
            </p>
            {role === "student" && (
              <button onClick={() => handleEnroll(course._id)}>
                Enroll
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Courses;
