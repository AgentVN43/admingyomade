import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("43613");
  const [totalPages, setTotalPages] = useState();
  const [productDetail, setproductDetail] = useState([]);

  useEffect(() => {
    const fetchData = async (id) => {
      try {
        const response = await fetch(
          `https://gyomade.vn/mvc/products/category/${id}?page_number=${currentPage}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setProducts(data.products);
        setTotalPages(data.total_pages);
        console.log(`Data fetched for ID ${id}:`, data);
      } catch (error) {
        console.error(`Error fetching data for ID ${id}:`, error);
      }
    };

    fetchData(activeTab);
  }, [activeTab, currentPage]);

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const detailArray = await Promise.all(
          products.map((item) =>
            fetch(`https://gyomade.vn/mvc/products/slug/${item.slug}`).then(
              (response) => {
                if (!response.ok) {
                  throw new Error("Network response was not ok");
                }
                return response.json();
              }
            )
          )
        );
        setproductDetail(detailArray);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [products]);



  console.log(products)

  const checkContent = (slug) => {
    const detail = productDetail.find((item) => item.slug === slug);
    if (detail && detail.content !== null) {
      return <i className="bi bi-check-circle text-success"></i>;
    } else {
      return <i className="bi bi-x-circle text-danger"></i>;
    }
  };

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === "43613" ? "active" : ""}
              onClick={() => {
                toggle("43613");
              }}
            >
              ÁO
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={activeTab === "1231641" ? "active" : ""}
              onClick={() => {
                toggle("1231641");
              }}
            >
              QUẦN
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={activeTab === "1231642" ? "active" : ""}
              onClick={() => {
                toggle("1231642");
              }}
            >
              VÁY
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={activeTab === "879678" ? "active" : ""}
              onClick={() => {
                toggle("879678");
              }}
            >
              PHỤ KIỆN
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="43613">
            <table
              className="table table-row-dashed table-row-gray-300 gy-7"
              style={{ width: "100%", borderCollapse: "collapse" }}
            >
              <thead>
                <tr
                  className="fw-bolder fs-6 text-gray-800"
                  style={{
                    position: "sticky",
                    top: "0",
                    zIndex: "1",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  <th>Name</th>
                  <th>Image</th>
                  <th>Image 3D</th>
                  <th>Check content</th>
                  <th>Model Number</th>
                  <th>Custom ID</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>
                      <img
                        src={product.image}
                        style={{ width: "100px", height: "auto" }}
                        alt="product"
                      />
                    </td>
                    <td>
                      <img
                        src={product.url_image}
                        style={{ width: "100px", height: "auto" }}
                        alt="product"
                      />
                    </td>
                    <td>{checkContent(product.slug)}</td>
                    <td>
                      <Link to={`/variants/${product.slug}`}>
                        {product.model_number}
                      </Link>
                    </td>
                    <td>{product.custom_id}</td>
                    <td>
                      <Link to={`/form/${product.id}`}>
                        <i className="bi bi-pen"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabPane>

          <TabPane tabId="1231641">
            <table
              className="table table-row-dashed table-row-gray-300 gy-7"
              style={{ width: "100%", borderCollapse: "collapse" }}
            >
              <thead>
                <tr
                  className="fw-bolder fs-6 text-gray-800"
                  style={{
                    position: "sticky",
                    top: "0",
                    zIndex: "1",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  <th>Name</th>
                  <th>Image</th>
                  <th>Image 3D</th>
                  <th>Check content</th>
                  <th>Model Number</th>
                  <th>Custom ID</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>
                      <img
                        src={product.image}
                        style={{ width: "100px", height: "auto" }}
                        alt="product"
                      />
                    </td>
                    <td>
                      <img
                        src={product.url_image}
                        style={{ width: "100px", height: "auto" }}
                        alt="product"
                      />
                    </td>
                    <td>{checkContent(product.slug)}</td>
                    <td>
                      <Link to={`/variants/${product.slug}`}>
                        {product.model_number}
                      </Link>
                    </td>
                    <td>{product.custom_id}</td>
                    <td>
                      <Link to={`/form/${product.id}`}>
                        <i className="bi bi-pen"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabPane>

          <TabPane tabId="1231642">
            <table
              className="table table-row-dashed table-row-gray-300 gy-7"
              style={{ width: "100%", borderCollapse: "collapse" }}
            >
              <thead>
                <tr
                  className="fw-bolder fs-6 text-gray-800"
                  style={{
                    position: "sticky",
                    top: "0",
                    zIndex: "1",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  <th>Name</th>
                  <th>Image</th>
                  <th>Image 3D</th>
                  <th>Check content</th>
                  <th>Model Number</th>
                  <th>Custom ID</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>
                      <img
                        src={product.image}
                        style={{ width: "100px", height: "auto" }}
                        alt="product"
                      />
                    </td>
                    <td>
                      <img
                        src={product.url_image}
                        style={{ width: "100px", height: "auto" }}
                        alt="product"
                      />
                    </td>
                    <td>{checkContent(product.slug)}</td>
                    <td>
                      <Link to={`/variants/${product.slug}`}>
                        {product.model_number}
                      </Link>
                    </td>
                    <td>{product.custom_id}</td>
                    <td>
                      <Link to={`/form/${product.id}`}>
                        <i className="bi bi-pen"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabPane>

          <TabPane tabId="879678">
            <table
              className="table table-row-dashed table-row-gray-300 gy-7"
              style={{ width: "100%", borderCollapse: "collapse" }}
            >
              <thead>
                <tr
                  className="fw-bolder fs-6 text-gray-800"
                  style={{
                    position: "sticky",
                    top: "0",
                    zIndex: "1",
                    backgroundColor: "#f2f2f2",
                  }}
                >
                  <th>Name</th>
                  <th>Image</th>
                  <th>Image 3D</th>
                  <th>Check content</th>
                  <th>Model Number</th>
                  <th>Custom ID</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>
                      <img
                        src={product.image}
                        style={{ width: "100px", height: "auto" }}
                        alt="product"
                      />
                    </td>
                    <td>
                      <img
                        src={product.url_image}
                        style={{ width: "100px", height: "auto" }}
                        alt="product"
                      />
                    </td>
                    <td>{checkContent(product.slug)}</td>
                    <td>
                      <Link to={`/variants/${product.slug}`}>
                        {product.model_number}
                      </Link>
                    </td>
                    <td>{product.custom_id}</td>
                    <td>
                      <Link to={`/form/${product.id}`}>
                        <i className="bi bi-pen"></i>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </TabPane>
        </TabContent>

        <nav aria-label="Page navigation">
          <ul className="pagination">
            {/* Previous button */}
            <li className={`page-item ${currentPage <= 1 ? "disabled" : ""}`}>
              <a
                className="page-link"
                href="#"
                aria-label="Previous"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick(currentPage - 1);
                }}
              >
                <span aria-hidden="true">&laquo;</span>
              </a>
            </li>

            {/* Page numbers */}
            {pageNumbers.map((page) => (
              <li
                key={page}
                className={`page-item ${currentPage === page ? "active" : ""}`}
              >
                <a
                  className="page-link"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handlePageClick(page);
                  }}
                >
                  {page}
                </a>
              </li>
            ))}

            {/* Next button */}
            <li
              className={`page-item ${
                currentPage >= totalPages ? "disabled" : ""
              }`}
            >
              <a
                className="page-link"
                href="#"
                aria-label="Next"
                onClick={(e) => {
                  e.preventDefault();
                  handlePageClick(currentPage + 1);
                }}
              >
                <span aria-hidden="true">&raquo;</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}
