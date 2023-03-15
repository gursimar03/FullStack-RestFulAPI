import React from "react";

class FilterBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            BrandBox: false,
            GenderBox: false,
            ColourBox: false,
            TypeBox: false,
            SizeBox: false
        }
    }
    openBox = (e) => {
        const box = document.getElementById(e.target.className);
        
        this.setState({[e.target.className]: !this.state[e.target.className]},
            () => {
                if (this.state[e.target.className]) {
                    box.style.height = "auto";
                    box.style.transition = "0.5s ease-in-out";
                } else {
                    box.style.height = "0";
                    box.style.transition = "0.5s ease-in-out";
                }
        });

    }

    render() {
        return (
            <div id="filter-bar">
                <div className="filter">
                    <div>
                        <aside>
                            <h2>Brand</h2>
                            <div className="BrandBox" onClick={this.openBox}></div>
                        </aside>
                        <div id="BrandBox">
                            {this.props.brands.map((brand =>
                                <div key={brand}>
                                    <input type="checkbox" name="brand" value={brand} onChange={this.props.handleFilter} />
                                    <label htmlFor={brand}>{brand}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                    {this.props.genders ?
                        <div>
                            <aside>
                                <h2>Gender</h2>
                                <div className="GenderBox" onClick={this.openBox}></div>
                            </aside>
                            <div id="GenderBox">
                                {this.props.genders.map(gender =>
                                    <div key={gender}>
                                        <input type="checkbox" name="age" value={gender} onChange={this.props.handleFilter} />
                                        <label htmlFor={gender}>{gender}</label>
                                    </div>
                                )}
                            </div>
                        </div>
                        : null}
                    <div>
                        <aside>
                            <h2>Colour</h2>
                            <div className="ColourBox" value="ColourBox" onClick={this.openBox}></div>
                        </aside>
                        <div id="ColourBox">
                            {this.props.colours.map((colour =>
                                <div key={colour}>
                                    <input type="checkbox" name="colour" value={colour} onChange={this.props.handleFilter} />
                                    <label htmlFor={colour}>{colour}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <aside>
                            <h2>Type</h2>
                            <div className="TypeBox" value="TypeBox" onClick={this.openBox}></div>
                        </aside>
                        <div id="TypeBox">
                            {this.props.types.map((type =>
                                <div key={type}>
                                    <input type="checkbox" name="type" value={type} onChange={this.props.handleFilter} />
                                    <label htmlFor={type}>{type}</label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div>
                        <aside>
                            <h2>Size</h2>
                            <div className="SizeBox" value="SizeBox" onClick={this.openBox}></div>
                        </aside>
                        <div id="SizeBox">
                            {this.props.sizes.map((size =>
                                <div key={size}>
                                    <input type="checkbox" name="size" value={size} onChange={this.props.handleFilter} />
                                    <label htmlFor={size}>{size}</label>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default FilterBar;