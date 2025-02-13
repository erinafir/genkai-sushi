import { useEffect, useState } from "react";
import CardList from "./component/cardList.jsx";
import cuisineApi from "./helper/pubApi.js";
import Swal from 'sweetalert2'

export default function App() {
  const [allMenu, setAllMenu] = useState([])
  const [search, setSearch] = useState('')
  const [pageNumber, setPageNumber] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [filter, setFilter] = useState()
  const [sort, setSort] = useState()
  const [sortBy, setSortBy] = useState()
  const [sorting, setSorting] = useState()

  const readMenu = async (search, pageNumber, pageSize, filter, sort, sortBy, sorting) => {
    try {
      if (pageSize == 0) {
        setPageSize(10)
      }
      if (filter == 0) {
        setFilter()
      }
      if (sort) {
        setSorting(`${sort}${sortBy}`)
      } else {
        setSorting(sortBy)
      }
      
      let { data } = await cuisineApi({
        url: "/pub/cuisines",
        method: "GET",
        params: { search, page: { number: pageNumber, size: pageSize }, filter, sort: sorting }
      })
      
      setAllMenu(data.data)
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message
      });
    }
  }

  useEffect(() => {
    readMenu(search, pageNumber, pageSize, filter, sort, sortBy, sorting)
  }, [search, pageNumber, pageSize, filter, sort, sortBy, sorting])
  return (
    <>

      <main >
        <div className="album py-5 bg-body-tertiary">
          <div className="container">
            <div className="col-md-13 mb-3">
              <h2 className="display-2">Our Menu</h2>
              <div className="d-flex justify-content-end align-items-center">
                <div className="d-flex align-items-center me-3" >
                  <p className="me-2">Filter by:</p>
                  <select className="form-select me-1" aria-label="Default select example" style={{ width: '100px' }} onChange={(event) => { setPageSize(event.target.value) }}>
                    <option value={0}>Show</option>
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                    <option value={20}>20</option>
                  </select>
                </div>
                <div className="d-flex me-3">
                  <p className="me-2">Filter by:</p>
                  <select className="form-select me-2" aria-label="Default select example" name="filter" style={{ width: '100px' }} onChange={(event) => { setFilter(event.target.value) }}>
                    <option value={0}>Show</option>
                    <option value={1}>Appetizer</option>
                    <option value={2}>Sushi</option>
                    <option value={3}>Sashimi</option>
                    <option value={4}>Fried</option>
                    <option value={5}>Grilled</option>
                    <option value={6}>Dessert</option>
                  </select>
                </div>
                <div className="d-flex me-3">
                  <p className="me-2">Sort by:</p>
                  <select className="form-select me-2" aria-label="Default select example" style={{ width: '100px' }} onChange={(event) => { setSortBy(event.target.value) }}>
                    <option value={''}>Show</option>
                    <option value={'name'}>Name</option>
                    <option value={'price'}>Price</option>
                  </select>
                  <select className="form-select me-2" aria-label="Default select example" style={{ width: '90px' }} onChange={(event) => { setSort(event.target.value) }}>
                    <option value={''}>Show</option>
                    <option value={''}>asc</option>
                    <option value={'-'}>desc</option>
                  </select>
                </div>
                <div className="input-group rounded align-items-end" style={{ maxWidth: 350 }}>
                  <input
                    type="search"
                    className="form-control rounded"
                    placeholder="Search"
                    aria-label="Search"
                    name="search"
                    aria-describedby="search-addon"
                    onChange={(event) => {
                      setPageNumber(1)
                      setSearch(event.target.value);
                    }}
                  />
                  <span className="input-group-text border-0" id="search-addon">
                    <i className="fas fa-search" />
                  </span>
                </div>
              </div>
            </div>
            <CardList allMenu={allMenu} />
          </div>
          <div className="container mt-3">
            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-end">
                <li className="page-item">
                  <button type="button" className="page-link" onClick={(event) => {
                    setPageNumber(pageNumber - 1);
                  }}>
                    Previous
                  </button>
                </li>
                <li className="page-item">
                  <button type="button" className="page-link" onClick={(event) => {
                    setPageNumber(pageNumber + 1);
                  }}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </main>
    </>

  )
}
