import React from "react";
import { Link } from "react-router-dom";

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      name: "",
      list: [
        { category: "cloth", name: "Kleidung" },
        { category: "foot", name: "Schuhe" },
        { category: "toy", name: "Spielzeuge" },
        { category: "furniture", name: "Möbel" },
        { category: "tech", name: "Elektronik" },
      ],
    };
  }
  render() {
    return (
      <div className="menu__container">
        {this.state.list.map((item, index) => (
          <Link
            to="/"
            className="menu__link"
            data-category={item.category}
            key={index}
          >
            {item.name}
          </Link>
        ))}
      </div>
    );
  }
}

export default Menu;
