import React from "react";
import "./popup.scss";

const Popup = ({ imageURL, onClose }) => {
  return (
    <div className="popup-form-apply popup-business active">
      <div className="business-container">
        <div
          className="background-blue business-description"
          style={{
            maxWidth: "100%",
            maxHeight: "400px",
            margin: "0px",
            padding: "0px",
          }}
        >
          <img
            src={imageURL}
            alt="zoom"
            style={{ maxWidth: "100%", maxHeight: "400px" }}
          />
        </div>
        <div className="clone-form-apply">
          <a href="#" className="clone-button-form" onClick={onClose}>
            <svg
              width={48}
              height={48}
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_d_1971_163)">
                <circle cx={24} cy={24} r={16} fill="white" />
              </g>
              <path
                d="M25.0613 24.0001L29.7801 19.2811C30.0733 18.9881 30.0733 18.5128 29.7801 18.2199C29.4869 17.9267 29.0122 17.9267 28.719 18.2199L24.0001 22.9389L19.281 18.2199C18.9878 17.9267 18.5131 17.9267 18.2199 18.2199C17.9267 18.5128 17.9267 18.9881 18.2199 19.2811L22.939 24.0001L18.2199 28.7192C17.9267 29.0121 17.9267 29.4874 18.2199 29.7804C18.3665 29.9267 18.5586 30 18.7505 30C18.9423 30 19.1344 29.9267 19.281 29.7801L24.0001 25.0611L28.719 29.7801C28.8656 29.9267 29.0577 30 29.2495 30C29.4414 30 29.6335 29.9267 29.7801 29.7801C30.0733 29.4872 30.0733 29.0119 29.7801 28.7189L25.0613 24.0001Z"
                fill="#666666"
              />
              <defs>
                <filter
                  id="filter0_d_1971_163"
                  x={0}
                  y={0}
                  width={48}
                  height={48}
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity={0} result="BackgroundImageFix" />
                  <feColorMatrix
                    in="SourceAlpha"
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                    result="hardAlpha"
                  />
                  <feOffset />
                  <feGaussianBlur stdDeviation={4} />
                  <feColorMatrix
                    type="matrix"
                    values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.07 0"
                  />
                  <feBlend
                    mode="normal"
                    in2="BackgroundImageFix"
                    result="effect1_dropShadow_1971_163"
                  />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="effect1_dropShadow_1971_163"
                    result="shape"
                  />
                </filter>
              </defs>
            </svg>
          </a>
        </div>
        {/* <div className="popup-footer">
          <h2>Need help?</h2>
          <div className="help-contact">
            <ul>
              <li>
                <a href="tel:+84902466090">
                  <span className="icon">
                    <img
                      src="https://apply.vietnam-visa.com/wp-content/themes/apply_vietnam_visa_v1.1//assets/images/icons/phone.svg"
                      alt="phone"
                      data-lazy-src="https://apply.vietnam-visa.com/wp-content/themes/apply_vietnam_visa_v1.1//assets/images/icons/phone.svg"
                      data-ll-status="loaded"
                      className="entered lazyloaded"
                    />
                  </span>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://m.me/spacevisaservice"
                  rel="noreferrer"
                >
                  <span className="icon">
                    <span className="icon">
                      <img
                        src="https://apply.vietnam-visa.com/wp-content/themes/apply_vietnam_visa_v1.1//assets/images/icons/messenger.svg"
                        alt="messenger"
                        data-lazy-src="https://apply.vietnam-visa.com/wp-content/themes/apply_vietnam_visa_v1.1//assets/images/icons/messenger.svg"
                        data-ll-status="loaded"
                        className="entered lazyloaded"
                      />
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="viber://chat?number=0902466090"
                  rel="noreferrer"
                >
                  <span className="icon">
                    <span className="icon">
                      <img
                        src="https://api.annk.info/wp-content/uploads/2023/11/viber-svgrepo-com-_1_-e1700826554835.webp"
                        alt="viber"
                        data-lazy-src="https://api.annk.info/wp-content/uploads/2023/11/viber-svgrepo-com-_1_-e1700826554835.webp"
                        data-ll-status="loaded"
                        className="entered lazyloaded"
                      />
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a
                  target="_blank"
                  href="https://zalo.me/0902466090"
                  rel="noreferrer"
                >
                  <span className="icon">
                    <span className="icon">
                      <img
                        src="https://apply.vietnam-visa.com/wp-content/themes/apply_vietnam_visa_v1.1//assets/images/icons/zalo.svg"
                        alt="zalo"
                        data-lazy-src="https://apply.vietnam-visa.com/wp-content/themes/apply_vietnam_visa_v1.1//assets/images/icons/zalo.svg"
                        data-ll-status="loaded"
                        className="entered lazyloaded"
                      />
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a href="mailto:sp.spacevisa@gmail.com">
                  <span className="icon">
                    <span className="icon">
                      <img
                        src="https://apply.vietnam-visa.com/wp-content/themes/apply_vietnam_visa_v1.1//assets/images/icons/google_gmail.svg"
                        alt="google_gmail"
                        data-lazy-src="https://apply.vietnam-visa.com/wp-content/themes/apply_vietnam_visa_v1.1//assets/images/icons/google_gmail.svg"
                        data-ll-status="loaded"
                        className="entered lazyloaded"
                      />
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Popup;
