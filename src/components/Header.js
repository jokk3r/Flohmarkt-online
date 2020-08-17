import React from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";
import ListItems from "./CardsSmall";
import Menu from "./Menu";
import SearchIcon from "@material-ui/icons/Search";

const uid = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};
Modal.setAppElement("#root");

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      category: "",
      titel: "",
      status: "",
      description: "",
      cost: "",
      phone: "",
      file: "",
      imagePreviewUrl: "",
      allFieldCompleted: false,
      advert: [
        {
          id: 0,
          category: "tech",
          titel: "TV Panasonic",
          status: "old",
          description: "alte Fernseher von meinem Opa",
          cost: "50",
          phone: "0304775435",
          imagePreviewUrl: "https://18.img.avito.st/640x480/1069326218.jpg",
        },
        {
          id: 1,
          category: "toy",
          titel: "Spielzeug Auto",
          status: "old",
          description: "funktioniert super",
          cost: "30",
          phone: "0304555435",
          imagePreviewUrl: "https://images.izi.ua/19424117",
        },
        {
          id: 2,
          category: "foot",
          titel: "Adidas Iniki",
          status: "new",
          description: "neue mit Pakung",
          cost: "120",
          phone: "030435435",
          imagePreviewUrl:
            "https://images.ua.prom.st/1062328933_w640_h640_adidas-iniki-runner.jpg",
        },
      ],
    };
    this.fileInput = React.createRef();
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
    this.modalFileInput = this.modalFileInput.bind(this);

    this.handleChangeCategory = this.handleChangeCategory.bind(this);
    this.handleChangeStatus = this.handleChangeStatus.bind(this);
    this.handleSubmitModal = this.handleSubmitModal.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this);
    this.handleChangeTitel = this.handleChangeTitel.bind(this);
    this.handleChangeCost = this.handleChangeCost.bind(this);
    this.handleChangePhone = this.handleChangePhone.bind(this);
  }
  handleOpenModal() {
    this.setState({ showModal: true });
  }
  handleCloseModal() {
    this.setState({
      showModal: false,
      imagePreviewUrl: null,
      file: "",
      allFieldCompleted: false,
      category: "",
    });
  }
  modalFileInput(event) {
    event.preventDefault();

    const reader = new FileReader();

    const file = event.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result,
      });
    };
    reader.readAsDataURL(file);
  }
  handleChangeCategory(event) {
    this.setState({ category: event.target.value });
  }
  handleChangeStatus(event) {
    this.setState({ status: event.target.value });
  }
  handleSubmitModal(event) {
    event.preventDefault();
    console.log("submited");
    const currentAdvert = {
      category: this.state.category,
      titel: this.state.titel,
      status: this.state.status ? this.state.status : "old",
      description: this.state.description,
      cost: this.state.cost,
      phone: this.state.phone,
      file: this.state.file,
      imagePreviewUrl: this.state.imagePreviewUrl,
      id: uid(),
    };
    for (let el in currentAdvert) {
      if (currentAdvert[el] === "") {
        console.log(el);
        this.setState({ allFieldCompleted: true });
        return;
      } else {
        this.setState({ allFieldCompleted: false });
      }
    }
    const currentList = [...this.state.advert];
    currentList.push(currentAdvert);
    this.setState({
      advert: currentList,
    });
    this.handleCloseModal();
  }
  handleChangeTitel(event) {
    this.setState({ titel: event.target.value });
    // console.log(this.props.advert)
  }
  handleChangeDescription(event) {
    this.setState({ description: event.target.value });
  }
  handleChangeCost(event) {
    this.setState({ cost: event.target.value });
  }
  handleChangePhone(event) {
    this.setState({ phone: event.target.value });
  }
  fileInput(event) {
    this.setState({ img: event.current.files[0] });
  }
  render() {
    const { advert, imagePreviewUrl } = this.state;
    let imagePreview = null;
    if (imagePreviewUrl) {
      imagePreview = (
        <img
          className="modal__image modal__image-add"
          src={imagePreviewUrl}
          alt="test"
        ></img>
      );
    } else {
      imagePreview = (
        <img
          className="modal__image modal__image-add"
          src={require("../img/AntiqueExp.jpg")}
          alt="test"
        ></img>
      );
    }
    return (
      <>
        <header>
          <div className="container">
            <div className="header">
              <Link to="/">
                <img
                  className="logo"
                  src={require("../img/unnamed.gif")}
                  alt=""
                ></img>
              </Link>

              {/* <nav className="menu">
                <Menu />
              </nav> */}

              <label className="search__label">
                <input className="search__input" type="text"></input>
                <SearchIcon className="header__searchIcon" />
              </label>

              <div className="header__nav">
                <button className="btn" onClick={this.handleOpenModal}>
                  Anzeige aufgeben
                </button>
                <Link to="/login">
                  <button className="btn">Anmelden</button>
                  {/* <button className="btn add__ad">Anmelden</button> */}
                </Link>
              </div>
            </div>
          </div>
        </header>
        <main>
          <ListItems advert={this.state.advert} />
          {/* {this.state.advert.map((item) => (
            <ListItems key={item.id} id={item.id} />
          ))} */}
        </main>

        <Modal
          isOpen={this.state.showModal}
          onRequestClose={this.handleCloseModal}
          shouldCloseOnOverlayClick={this.handleCloseModal}
          style={{
            overlay: {
              backgroundColor: "rgba(0, 170, 255, 0.4)",
            },
            content: {
              top: "50%",
              left: "50%",
              right: "auto",
              bottom: "auto",
              marginRight: "-50%",
              transform: "translate(-50%, -50%)",
            },
          }}
        >
          <div className="modal__block">
            <h2 className="modal__header">Anzeige aufgeben</h2>
            <div className="modal__content">
              <div>{imagePreview}</div>
              <form className="modal__submit" onSubmit={this.handleSubmitModal}>
                <label className="modal__file-label">
                  <span className="btn modal__file-btn">Bilder hinzufügen</span>
                  <input
                    className="modal__file-input"
                    type="file"
                    name="file"
                    onChange={this.modalFileInput}
                  ></input>
                </label>
                <label>
                  <span>Kategorie*:</span>
                  <select
                    required
                    name="category"
                    onChange={this.handleChangeCategory}
                    value={advert.category}
                  >
                    <option selected value="toy">
                      Spielzeuge
                    </option>
                    <option value="furniture">Möbel</option>
                    <option value="foot">Schuhe</option>
                    <option value="cloth">Kleidung</option>
                    <option value="tech">Elektronik</option>
                  </select>
                </label>
                <label>
                  <span>Titel der Anzeige*:</span>
                  <input
                    name="nameItem"
                    type="text"
                    value={advert.titel}
                    onChange={this.handleChangeTitel}
                    required
                  ></input>
                </label>
                <label>
                  <span>Zustand:</span>
                  <select
                    name="status"
                    onChange={this.handleChangeStatus}
                    value={advert.status}
                  >
                    <option selected value="old">
                      gebraucht
                    </option>
                    <option value="new">neue</option>
                  </select>
                </label>
                <label>
                  <span>Beschreibung*:</span>
                  <textarea
                    name="descriptionItem"
                    maxLength="500"
                    value={advert.description}
                    onChange={this.handleChangeDescription}
                    required
                  ></textarea>
                </label>
                <label>
                  <span>Preis*:</span>
                  <input
                    name="costItem"
                    type="number"
                    value={advert.cost}
                    onChange={this.handleChangeCost}
                    on
                    required
                  ></input>
                </label>
                <label>
                  <span>Telefonnummer*</span>
                  <input
                    name="number"
                    type="number"
                    value={advert.phone}
                    onChange={this.handleChangePhone}
                  ></input>
                </label>
                <div className="modal__btn-block">
                  {this.state.allFieldCompleted ? (
                    <span className="modal__btn-warning">
                      alle Felder ausfüllen
                    </span>
                  ) : null}
                  <button type="submit" className="btn modal__btn-submit">
                    Schicken
                  </button>
                </div>
              </form>
            </div>
            <button onClick={this.handleCloseModal} className="modal__close">
              &#10008;
            </button>
          </div>
        </Modal>
      </>
    );
  }
}

export default Header;
