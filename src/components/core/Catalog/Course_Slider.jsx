import React from "react";
import Course_Slider from "./Course_Slider";

// Sample courses array
const sampleCourses = [
  {
    id: 1,
    name: "Python Programming",
    description: "Learn Python from basics to advanced.",
    duration: "3 months",
    level: "Beginner to Advanced",
  },
  {
    id: 2,
    name: "Java Programming",
    description: "Master Java for software development.",
    duration: "4 months",
    level: "Intermediate",
  },
  {
    id: 3,
    name: "JavaScript Development",
    description: "Build interactive web applications with JavaScript.",
    duration: "2 months",
    level: "Beginner to Intermediate",
  },
  {
    id: 4,
    name: "C Programming",
    description: "Understand the fundamentals of C programming.",
    duration: "2 months",
    level: "Beginner",
  },
  {
    id: 5,
    name: "C++ Programming",
    description: "Explore object-oriented programming with C++.",
    duration: "3 months",
    level: "Intermediate",
  },
];

function App() {
  return (
    <div className="App">
      <h1 className="text-center text-2xl font-bold my-4">Courses</h1>
      <Course_Slider Courses={sampleCourses} />
    </div>
  );
}

export default App;
