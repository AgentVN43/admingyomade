import { Editor } from "@tinymce/tinymce-react";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Nav, NavItem, NavLink, TabContent, TabPane } from "reactstrap";
import UploadImgs from "../../../Upload";
import UploadImg3D from "../../../Upload";

const FormUpdate = () => {
  const [details, setDetails] = useState({});
  const [image, setImage] = useState(null);
  const [content, setContent] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [error, setError] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const editorRef = useRef(null);
  const { id } = useParams();
  const btnRef = (useRef < HTMLButtonElement) | (null > null);
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [activeTab, setActiveTab] = useState("1");
  const [loading, setLoading] = useState(false);
  const [decodedHtml, setDecodedHtml] = useState("");
  const [processedContent, setProcessedContent] = useState("");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  const showAlert = (type, message) => {
    setAlert({ type, message });
  };

  const fetchData = async () => {
    try {
      const response = await fetch(`https://gyomade.vn/mvc/products/id/${id}`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDetails(data);
      setDecodedHtml(data.content);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching data:", error);
    }
  };

  const htmlString = decodedHtml;

  const convertUnicodeToEmoji = (input) => {
    // Regular expression to match Unicode escape sequences (e.g., \ud83e\udd20)
    const unicodeRegex = /\\u([a-fA-F0-9]{4})\\u([a-fA-F0-9]{4})/g;

    // Replace Unicode escape sequences with corresponding emojis
    const processedHtml = input.replace(unicodeRegex, (match, p1, p2) => {
      // Parse hexadecimal codes to decimal code point
      const codePoint = parseInt(p1, 16) * 0x400 + parseInt(p2, 16) - 0x35fdc00;

      // Convert code point to emoji character
      return String.fromCodePoint(codePoint);
    });

    return processedHtml;
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  useEffect(() => {
    if (decodedHtml) {
      const processedHtml = convertUnicodeToEmoji(decodedHtml);
      setProcessedContent(processedHtml);
    }
  }, [decodedHtml]);

  // useEffect(() => {
  //   if (details.content) {
  //     setContent(details.content);
  //   }
  // }, [details.content]);

  // console.log(details.content);
  const convertEmojisToUnicode = (input) => {
    const regexEmoji =
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;

    return input.replace(regexEmoji, (match) => {
      return match
        .split("")
        .map((char) => `\\u${char.charCodeAt(0).toString(16)}`)
        .join("");
    });
  };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    const content = editorRef.current?.getContent();

    if (!content) {
      console.error("Editor content is empty or undefined");
      setLoading(false);
      return;
    }
    const convertedContent = convertEmojisToUnicode(content);

    try {
      console.log(convertedContent);
      const response = await fetch(
        `https://gyomade.vn/mvc/products/update/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ contentdata: convertedContent }),
        }
      );

      if (response.ok) {
        console.log("Editor content submitted successfully:", content);
        fetchData();
        setLoading(false);
      } else {
        console.error("Error submitting editor content:", response.status);
      }
    } catch (error) {
      console.error("Error submitting editor content:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(details);

  return (
    <>
      <div style={{ padding: "20px" }}>
        <Nav tabs>
          <NavItem>
            <NavLink
              className={activeTab === "1" ? "active" : ""}
              onClick={() => {
                toggle("1");
              }}
            >
              Information Product
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={activeTab === "2" ? "active" : ""}
              onClick={() => {
                toggle("2");
              }}
            >
              Content Product
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={activeTab === "3" ? "active" : ""}
              onClick={() => {
                toggle("3");
              }}
            >
              Preview Product
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              className={activeTab === "4" ? "active" : ""}
              onClick={() => {
                toggle("4");
              }}
            >
              Album Images
            </NavLink>
          </NavItem>
        </Nav>
        <TabContent activeTab={activeTab}>
          <TabPane tabId="1">
            <div className="mb-10" style={{ paddingTop: "5px" }}>
              <p>Product: {details.name}</p>
              <br />
              <p>Category: {details.category_name}</p>
              <br />
              {/* <p>
                Image:{" "}
                <img
                  src={details.image}
                  style={{ width: "300px", height: "auto" }}
                  alt="Product"
                />
              </p>
              <p>
                Image 3D:{" "}
                <img
                  src={details.url_image}
                  style={{ width: "300px", height: "auto" }}
                  alt="Product"
                />
              </p> */}
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div style={{ flex: 1, marginRight: "10px" }}>
                  <p>Image:</p>
                  <img
                    src={details.image}
                    style={{ width: "100%", height: "auto" }}
                    alt="Product"
                  />
                </div>
                <div style={{ flex: 1, marginLeft: "10px" }}>
                  <p>Image 3D:</p>
                  <img
                    src={details.url_image}
                    style={{ width: "100%", height: "auto" }}
                    alt="Product"
                  />
                </div>
              </div>

              <br />
            </div>
          </TabPane>

          <TabPane tabId="2">
            <div className="d-flex flex-row h-300px">
              <div className="d-flex flex-row h-300px">
                <div
                  className="d-flex flex-column flex-row-fluid"
                  style={{ width: "100%" }}
                >
                  <div className="d-flex flex-row flex-column-fluid">
                    <div className="d-flex flex-row-fluid flex-center">
                      <form
                        onSubmit={handleSubmit}
                        id="form-content"
                        style={{ width: "100%" }}
                      >
                        <Editor
                          apiKey="y5p4huxtuvw2boq9u0zk1xehkzsmcaxdll89coa6klob7kcp"
                          onInit={(evt, editor) => (editorRef.current = editor)}
                          init={{
                            width: "100%",
                            plugins:
                              "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss",
                            toolbar:
                              "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat",
                            tinycomments_mode: "embedded",
                            tinycomments_author: "Author name",
                            ai_request: (request, respondWith) =>
                              respondWith.string(() =>
                                Promise.reject(
                                  "See docs to implement AI Assistant"
                                )
                              ),
                          }}
                          initialValue={processedContent}
                        />
                      </form>
                    </div>
                  </div>
                </div>

                <div
                  className="d-flex flex-column flex-row-fluid"
                  style={{ width: "20%" }}
                >
                  <div className="d-flex flex-row-auto flex-center align-items-center">
                    <Button
                      type="submit"
                      form="form-content"
                      className={`btn btn-primary ${loading ? "" : "me-10"}`}
                      onClick={handleSubmit}
                      disabled={loading} // Disable button when in loading state
                      data-kt-indicator={loading ? "on" : undefined} // Apply data-kt-indicator attribute when in loading state
                    >
                      <span className="indicator-label">Submit</span>
                      {loading && (
                        <span className="indicator-progress">
                          Please wait...{" "}
                          <span
                            className="spinner-border spinner-border-sm align-middle ms-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </TabPane>

          <TabPane tabId="3">
            <div className="mb-10" style={{ paddingTop: "5px" }}>
              <p>Product: {details.name}</p>
              <br />
              <span>
                Content:
                <p dangerouslySetInnerHTML={{ __html: details.content }}></p>
              </span>
            </div>
          </TabPane>

          <TabPane tabId="4">
            <div className="mb-10" style={{ paddingTop: "5px" }}>
              <UploadImg3D productId={details.product_id} />
            </div>
          </TabPane>
        </TabContent>
      </div>
    </>
  );
};

export default FormUpdate;
