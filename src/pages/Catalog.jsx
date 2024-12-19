import React, { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router-dom"

// import CourseCard from "../components/Catalog/CourseCard"
// import CourseSlider from "../components/Catalog/CourseSlider"
import Footer from "../components/Common/Footer"
import Course_Card from "../components/core/Catalog/Course_Card"
import Course_Slider from "../components/core/Catalog/Course_Slider"
import { apiConnector } from "../services/apiConnector"
import { categories } from "../services/apis"
import { getCatalogPageData } from "../services/operations/pageAndComponntDatas"
import Error from "./Error"

function Catalog() {
  const { loading } = useSelector((state) => state.profile)
  const { catalogName } = useParams()
  const [active, setActive] = useState(1)
  const [catalogPageData, setCatalogPageData] = useState(null)
  const [categoryId, setCategoryId] = useState("")
  const [categoryList, setCategoryList] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  
  // Fetch All Categories
  useEffect(() => {
    ;(async () => {
      try {
        const res = await apiConnector("GET", categories.CATEGORIES_API)
        const fetchedCategories = res?.data?.data || []
        
        // Setting categories
        setCategoryList(fetchedCategories)
        
        // Check if catalogName matches any category
        const category_id = fetchedCategories.find(
          (ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName
        )?._id
        
        setCategoryId(category_id)
        
        // Fetch data for selected category
        if (category_id) {
          fetchCatalogPageData(category_id)
        }
      } catch (error) {
        console.log("Could not fetch Categories.", error)
      }
    })()
  }, [catalogName])

  const fetchCatalogPageData = async (category_id) => {
    try {
      const res = await getCatalogPageData(category_id)
      setCatalogPageData(res)
    } catch (error) {
      console.log("Error fetching catalog data", error)
    }
  }

  // Handle category change
  const handleCategoryChange = (e) => {
    const categoryId = e.target.value
    setSelectedCategory(categoryList.find(c => c._id === categoryId))
    fetchCatalogPageData(categoryId)
  }

  if (loading || !catalogPageData) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  if (!loading && !catalogPageData.success) {
    return <Error />
  }

  return (
    <>
      {/* Hero Section */}
      <div className="box-content bg-richblack-800 px-4">
        <div className="mx-auto flex min-h-[260px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent">
          <p className="text-sm text-richblack-300">
            {`Home / Catalog / `}
            <span className="text-yellow-25">
              {catalogPageData?.data?.selectedCategory?.name}
            </span>
          </p>
          <p className="text-3xl text-richblack-5">
            {catalogPageData?.data?.selectedCategory?.name}
          </p>
          <p className="max-w-[870px] text-richblack-200">
            {catalogPageData?.data?.selectedCategory?.description}
          </p>
        </div>
      </div>

      {/* Dropdown to select category */}
      <div className="mx-auto w-full max-w-maxContentTab px-4 py-4">
        <label htmlFor="categorySelect" className="text-lg text-richblack-300">
          Select a Category:
        </label>
        <select
          id="categorySelect"
          value={selectedCategory?._id || ""}
          onChange={handleCategoryChange}
          className="mt-2 px-4 py-2 border rounded-md"
        >
          <option value="">Choose a category</option>
          {categoryList.length > 0 ? (
            categoryList.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))
          ) : (
            <option value="" disabled>No categories available</option>
          )}
        </select>
      </div>

      {/* Section 1 */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Courses to get you started</div>
        <div className="my-4 flex border-b border-b-richblack-600 text-sm">
          <p
            className={`px-4 py-2 ${
              active === 1
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(1)}
          >
            Most Popular
          </p>
          <p
            className={`px-4 py-2 ${
              active === 2
                ? "border-b border-b-yellow-25 text-yellow-25"
                : "text-richblack-50"
            } cursor-pointer`}
            onClick={() => setActive(2)}
          >
            New
          </p>
        </div>
        <div>
          <Course_Slider
            Courses={catalogPageData?.data?.selectedCategory?.courses}
          />
        </div>
      </div>

      {/* Section 2 */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">
          Top courses in {catalogPageData?.data?.differentCategory?.name}
        </div>
        <div className="py-8">
          <Course_Slider
            Courses={catalogPageData?.data?.differentCategory?.courses}
          />
        </div>
      </div>

      {/* Section 3 */}
      <div className="mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
        <div className="section_heading">Frequently Bought</div>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {catalogPageData?.data?.mostSellingCourses
              ?.slice(0, 4)
              .map((course, i) => (
                <Course_Card course={course} key={i} Height={"h-[400px]"} />
              ))}
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}

export default Catalog
