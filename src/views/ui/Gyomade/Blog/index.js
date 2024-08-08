import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  ButtonGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import Media from "../Media";
import { Col, Container, Image, Row } from "react-bootstrap";
import { map } from "lodash";

export default function Blog() {
  const [details, setDetails] = useState({});
  const [categories, setCategories] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [allImages, setAllImages] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [title, setTitle] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    categories: [],
    slug: "",
  });

  const editorRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `https://gyomade.vn/mvc/blog/categories/getcate`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setCategories(data.categories);
      } catch (error) {
        setError(error.message);
        console.error("Error fetching data:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const generateSlug = (name) => {
  //   const asciiName = name.normalize("NFKD").replace(/[\u0300-\u036f]+/g, "");

  //   return asciiName
  //     .toLowerCase()
  //     .replace(/\s+/g, "-") // Replace spaces with dash
  //     .replace(/[^\w-]+/g, ""); // Remove non-word characters except dash
  // };

  const generateSlug = (name) => {
    // Remove diacritical marks from Vietnamese characters
    const nonAccentVietnamese = name
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");

    // Replace non-word characters with a dash
    const slugifiedName = nonAccentVietnamese.replace(/[^a-zA-Z0-9]+/g, "-");

    // Remove leading/trailing dashes and convert to lowercase
    return slugifiedName.replace(/^-+|-+$/g, "").toLowerCase();
  };

  // const handleInputChange = (event) => {
  //   const { name, value, type, checked } = event.target;
  //   let newValue;
  //   if (type === "checkbox") {
  //     if (checked) {
  //       // Add the selected category to the categories array
  //       newValue = [
  //         ...formData.categories,
  //         { id: value, name: event.target.dataset.name },
  //       ];
  //     } else {
  //       // Remove the category from the categories array
  //       newValue = formData.categories.filter(
  //         (category) => category.id !== value
  //       );
  //     }
  //   } else {
  //     newValue = value;
  //   }
  //   setFormData({
  //     ...formData,
  //     [name]: newValue,
  //   });
  // };

  console.log(formData);

  // const handleSubmit = async (event) => {
  //   setLoading(true);
  //   event.preventDefault();

  //   const slug = generateSlug(formData.title);

  //   const content = {
  //     title: formData.title,
  //     content: editorRef.current?.getContent(),
  //     excerpt: formData.excerpt,
  //     slug: slug,
  //   };

  //   if (!content) {
  //     console.error("Editor content is empty or undefined");
  //     setLoading(false);
  //     return;
  //   }

  //   try {
  //     const response = await fetch(`https://gyomade.vn/mvc/blog/new`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ contentdata: content }),
  //     });

  //     if (response.ok) {
  //       console.log("Editor content submitted successfully:", content);
  //       fetchData();
  //       setLoading(false);
  //     } else {
  //       console.error("Error submitting editor content:", response.status);
  //     }
  //   } catch (error) {
  //     console.error("Error submitting editor content:", error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();

    try {
      const slug = formData.slug || generateSlug(formData.title);

      const content = {
        title: formData.title,
        content: editorRef.current?.getContent(),
        excerpt: formData.excerpt,
        slug: slug,
      };

      if (!content.content) {
        console.error("Editor content is empty or undefined");
        return;
      }

      const response = await fetch(`https://gyomade.vn/mvc/blog/new`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ contentdata: content }),
      });

      if (response.ok) {
        console.log("Editor content submitted successfully:", content);
        fetchData();
      } else {
        console.error(
          "Error submitting editor content:",
          response.status,
          await response.text()
        );
      }
    } catch (error) {
      console.error("Error submitting editor content:", error);
    } finally {
      setLoading(false);
    }
  };

  console.log(categories);

  const fetchData = async () => {
    try {
      const response = await fetch(`https://gyomade.vn/mvc/blog/`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setDetails(data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching data:", error);
    }
  };

  const handleImageSelect = (imageUrl) => {
    // Insert the image URL into the editor
    if (editorRef.current) {
      editorRef.current.execCommand(
        "mceInsertContent",
        false,
        `<img src="${imageUrl}" alt=""/>`
      );
      setModalOpen(false);
      setImageUrl("");
    }
  };

  const fetchMedia = async () => {
    try {
      const response = await fetch(`https://gyomade.vn/mvc/images`);
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setAllImages(data.images);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // const handleUpload = () => {

  //   const formData = new FormData();
  //   formData.append("image", "test");
  //   formData.append("product_id", "test");
  //   formData.append("note", "tes");

  //   fetch("https://cdn.annk.info/upload", {
  //     method: "POST",
  //     body: formData,
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         alert("Image uploaded successfully!");
  //       } else {
  //         alert("Error uploading image.");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //       alert("Error uploading image.");
  //     });
  // };

  const toggleModal = () => {
    setModalOpen(!modalOpen);
    fetchMedia();
  };

  const insertSelectedImage = () => {
    // Do something with the selected image URL, e.g., insert it into the editor
    console.log("Selected Image URL:", selectedImageUrl);
    // Close the modal
    toggleModal();
  };

  return (
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
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title"
              />
              <Input
                type="text"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleInputChange}
                placeholder="Excerpt"
              />
              <Input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleInputChange}
                placeholder="Slug: nếu để trống slug sẽ được tạo tự động"
              />

              <Editor
                apiKey="y5p4huxtuvw2boq9u0zk1xehkzsmcaxdll89coa6klob7kcp"
                onInit={(evt, editor) => (editorRef.current = editor)}
                init={{
                  width: "100%",
                  plugins:
                    "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss",
                  toolbar:
                    "annk | undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat ",
                  setup: function (editor) {
                    // Add event listener for custom button
                    editor.ui.registry.addButton("annk", {
                      icon: "user", // Specify icon for the button
                      tooltip: "AnNK Button", // Tooltip for the button
                      onAction: function () {
                        // Define action when button is clicked
                        // handleCustomButtonClick();
                        toggleModal();
                      },
                    });
                  },
                  tinycomments_mode: "embedded",
                  tinycomments_author: "Author name",
                  ai_request: (request, respondWith) =>
                    respondWith.string(() =>
                      Promise.reject("See docs to implement AI Assistant")
                    ),
                }}
                initialValue={details.content}
              />
            </form>

            <Modal isOpen={modalOpen} toggle={toggleModal}>
              <ModalHeader toggle={toggleModal}>Select Image</ModalHeader>
              <ModalBody>
                <Container>
                  <Row>
                    {allImages.map((image, index) => (
                      <Col md={3} key={index}>
                        <div
                          className="img-card"
                          onClick={() => handleImageSelect(image.url_image)}
                        >
                          <Image
                            style={{ width: "50%", height: "300px" }}
                            thumbnail
                            src={image.url_image}
                            alt={`Image ${index + 1}`}
                          />
                        </div>
                      </Col>
                    ))}
                  </Row>
                </Container>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" onClick={insertSelectedImage}>
                  Insert Image
                </Button>{" "}
                <Button color="secondary" onClick={toggleModal}>
                  Cancel
                </Button>
              </ModalFooter>
            </Modal>
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
  );
}
