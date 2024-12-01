import { Editor } from "@tinymce/tinymce-react";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import MediaModal from "../MediaModal";
import ImageSelectModal from "./modal";

export default function Blog({ image }) {
  const [details, setDetails] = useState({});
  const [categories, setCategories] = useState({});

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [allImages, setAllImages] = useState([]);
  const [selectedImageUrl, setSelectedImageUrl] = useState("");
  const [title, setTitle] = useState("");

  const [featuredimageUrl, setFeaturedimageUrl] = useState("");

  const [selectedFeaturedImage, setFeaturedImage] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    categories: [],
    slug: "",
    featured_images: "",
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

  const handleImageUpload = (url) => {
    setFeaturedimageUrl(url); // Store the uploaded image URL
  };

  const handleSelectFeaturedImage = (imageUrl) => {
    setFeaturedImage(imageUrl);
  };

  useEffect(() => {
    handleSelectFeaturedImage(imageUrl);
  }, [imageUrl]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const slug = formData.slug || generateSlug(formData.title);
      const featured = selectedFeaturedImage

      const content = {
        title: formData.title,
        content: editorRef.current?.getContent(),
        excerpt: formData.excerpt,
        slug: slug,
        featured_images: featured,
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

  // const handleImageSelect = (imageUrl) => {
  //   // Insert the image URL into the editor
  //   if (editorRef.current) {
  //     editorRef.current.execCommand(
  //       "mceInsertContent",
  //       false,
  //       `<img src="${imageUrl}" alt=""/>`
  //     );
  //     setModalOpen(false);
  //     setImageUrl("");
  //   }
  // };

  const handleImageSelect = (imageUrls) => {
    if (editorRef.current) {
      // Create a string with multiple image tags
      const imagesHTML = imageUrls
        .map(
          (url) =>
            `<img src="${url}" alt="" style="width: 300px; height: auto; margin: 5px;"/><br/>`
        )
        .join("");
      editorRef.current.execCommand("mceInsertContent", false, imagesHTML);
      setModalOpen(false);
      setImageUrl(""); // You can remove this if not needed for multiple images
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
    console.log("Selected Image URL:", selectedImageUrl);
    toggleModal();
  };

  return (
    <>
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
                      "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                    toolbar:
                      "annk | undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat ",
                    setup: function (editor) {
                      editor.ui.registry.addButton("annk", {
                        icon: "user",
                        tooltip: "AnNK Button",
                        onAction: function () {
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
                <ImageSelectModal
                  visible={modalOpen}
                  toggle={toggleModal}
                  allImages={allImages}
                  handleImageSelect={handleImageSelect}
                  insertSelectedImage={insertSelectedImage}
                />
              </form>
            </div>
          </div>
        </div>

        <div
          className="d-flex flex-column flex-row-fluid"
          style={{ width: "20%" }}
        >
          <div>
            <MediaModal onSelectImage={handleSelectFeaturedImage} />
          </div>
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
    </>
  );
}
