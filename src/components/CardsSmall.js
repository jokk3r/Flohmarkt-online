import React from "react";
import Modal from "react-modal";

class ListItems extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      showItem: [],
    };

    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  handleOpenModal(id) {
    const currentEl = this.props.advert.filter((item) => item.id === id);

    this.setState({
      showItem: currentEl,
      showModal: true,
    });
    // console.log(currentList);
  }
  handleCloseModal() {
    this.setState({ showModal: false });
  }
  render() {
    const { showItem, showModal } = this.state;
    console.log("showItem", showItem);
    return (
      <>
        <div className="container">
          {/* <button onClick={this.advertMap}>Click me</button> */}
          <ul className="catalog">
            {this.props.advert.map((el, index) => {
              return (
                <>
                  <li
                    className="card"
                    key={index}
                    onClick={() => this.handleOpenModal(el.id)}
                  >
                    <img
                      className="card__image"
                      src={el.imagePreviewUrl}
                      alt="test"
                    ></img>
                    <div className="card__description">
                      <h3 className="card__header">{el.titel}</h3>
                      <div className="card__price">{el.cost}€</div>
                    </div>
                  </li>
                </>
              );
            })}
          </ul>
        </div>
        {showModal ? (
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
              <h2 className="modal__header">Kaufen</h2>
              <div className="modal__content">
                <div>
                  <img
                    className="modal__image modal__image-item"
                    src={showItem[0].imagePreviewUrl}
                    alt="test"
                  ></img>
                </div>
                <div className="modal__description">
                  <h3 className="modal__header-item">{showItem[0].titel}</h3>
                  <p>
                    Zustand:
                    <span className="modal__status-item">
                      {showItem[0].status}
                    </span>
                  </p>
                  <p>
                    Beschreibung:{" "}
                    <span className="modal__description-item">
                      {showItem[0].description}
                    </span>
                  </p>
                  <p>
                    Preis:
                    <span className="modal__cost-item">
                      {showItem[0].cost}€
                    </span>
                  </p>
                  <button className="btn">Kaufen</button>
                </div>
              </div>
              <button className="modal__close" onClick={this.handleCloseModal}>
                &#10008;
              </button>
            </div>
          </Modal>
        ) : null}
      </>
    );
  }
}

export default ListItems;
