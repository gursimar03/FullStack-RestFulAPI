import React, { Component } from "react"
import { Link } from "react-router-dom"
import { SERVER_HOST } from "../config/global_constants"

import axios from "axios"

class AllProducts extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            shoesData: [],
            filters: {
                brand: [],
                colour: [],
                age: [],
                type: []
            },
            showFilterBar: true,
            sort: ""
        }
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/products`).then(res => {
            this.setState({ data: res.data })
        }).then(() => {
            this.setState({ shoesData: this.state.data })
        })
    }

    applyFilters = () => {
        if (this.state.filters.brand.length === 0 && this.state.filters.colour.length === 0 && this.state.filters.age.length === 0 && this.state.filters.type.length === 0) {
            this.setState({ shoesData: this.state.data }, () => {
                this.sort();
            })
            return;
        }
        this.setState({
            shoesData: this.state.data.filter(shoe => {
                if (this.state.filters.brand.length > 0 && !this.state.filters.brand.includes(shoe.brand)) {
                    return false;
                }
                if (this.state.filters.colour.length > 0 && !this.state.filters.colour.includes(shoe.color)) {
                    return false;
                }
                if (this.state.filters.age.length > 0 && !this.state.filters.age.includes(shoe.age)) {
                    return false;
                }
                if (this.state.filters.type.length > 0 && !this.state.filters.type.includes(shoe.type)) {
                    return false;
                }
                return true;
            }
            )
        }, () => {
            this.sort();
        })
    }



    handleFilter = (e) => {
        const { name, value, checked } = e.target

        if (checked) {
            if (name === "brand") {
                this.setState({
                    filters: {
                        brand: [...this.state.filters.brand, value],
                        colour: [...this.state.filters.colour],
                        age: [...this.state.filters.age],
                        type: [...this.state.filters.type]
                    }
                }, () => {
                    this.applyFilters();
                })
            }

            if (name === "colour") {
                this.setState({
                    filters: {
                        brand: [...this.state.filters.brand],
                        colour: [...this.state.filters.colour, value],
                        age: [...this.state.filters.age],
                        type: [...this.state.filters.type]
                    }
                }, () => {
                    this.applyFilters();
                })
            }

            if (name === "age") {
                this.setState({
                    filters: {
                        brand: [...this.state.filters.brand],
                        colour: [...this.state.filters.colour],
                        age: [...this.state.filters.age, value],
                        type: [...this.state.filters.type]
                    }
                }, () => {
                    this.applyFilters();
                })
            }

            if (name === "type") {
                this.setState({
                    filters: {
                        brand: [...this.state.filters.brand],
                        colour: [...this.state.filters.colour],
                        age: [...this.state.filters.age],
                        type: [...this.state.filters.type, value]
                    }
                }, () => {
                    this.applyFilters();
                })
            }
        } else {
            if (name === "brand") {
                this.setState({
                    filters: {
                        brand: this.state.filters.brand.filter(brand => brand !== value),
                        colour: [...this.state.filters.colour],
                        age: [...this.state.filters.age],
                        type: [...this.state.filters.type]
                    }
                }, () => {
                    this.applyFilters();
                })
            }

            if (name === "colour") {
                this.setState({
                    filters: {
                        brand: [...this.state.filters.brand],
                        colour: this.state.filters.colour.filter(colour => colour !== value),
                        age: [...this.state.filters.age],
                        type: [...this.state.filters.type]
                    }
                }, () => {
                    this.applyFilters();
                })
            }

            if (name === "age") {
                this.setState({
                    filters: {
                        brand: [...this.state.filters.brand],
                        colour: [...this.state.filters.colour],
                        age: this.state.filters.age.filter(age => age !== value),
                        type: [...this.state.filters.type]
                    }
                }, () => {
                    this.applyFilters();
                })
            }

            if (name === "type") {
                this.setState({
                    filters: {
                        brand: [...this.state.filters.brand],
                        colour: [...this.state.filters.colour],
                        age: [...this.state.filters.age],
                        type: this.state.filters.type.filter(type => type !== value)
                    }
                }, () => {
                    this.applyFilters();
                })
            }

        }
    }


    handleSort = (e) => {
        const { value } = e.target;

        this.setState({
            sort: value
        },
            () => {
                this.applyFilters();
            }
        )

    }

    sort = () => {
        if (this.state.sort === "L-H") {
            this.setState({
                shoesData: this.state.shoesData.sort((a, b) => a.price - b.price)
            })
        } else if (this.state.sort === "H-L") {
            this.setState({
                shoesData: this.state.shoesData.sort((a, b) => b.price - a.price)
            })
        } else if (this.state.sort === "A-Z") {
            this.setState({
                shoesData: this.state.shoesData.sort((a, b) => a.name.localeCompare(b.name))
            })
        } else if (this.state.sort === "Z-A") {
            this.setState({
                shoesData: this.state.shoesData.sort((a, b) => b.name.localeCompare(a.name))
            })
        } else {
            this.setState({
                shoesData: this.state.shoesData
            })
        }


    }

    handleFilterBar = () => {
        this.setState({ showFilterBar: !this.state.showFilterBar },
            () => {
                if (this.state.showFilterBar) {
                    document.getElementById("filter-bar").style.flexBasis = '30%';
                    document.getElementById("filter-bar").style.right = '0%';
                } else {
                    document.getElementById("filter-bar").style.flexBasis = "0%";
                    document.getElementById("filter-bar").style.right = "100%";
                }
            })
    }


    render() {
        if (this.state.data.length === 0) {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            )
        } else {
            const uniqueColors = [...new Set(this.state.data.map(item => item.color))];
            const uniqueBrands = [...new Set(this.state.data.map(item => item.brand))];
            const uniqueAge = [...new Set(this.state.data.map(item => item.age))];
            const uniqueType = [...new Set(this.state.data.map(item => item.type))];
            return (
                <div className="products-page-container">
                    <div className="products-page-functions">
                        <h1>Shoes ({this.state.shoesData.length})</h1>
                        <div>
                            <button onClick={this.handleFilterBar}>Filters</button>
                            <div className="sort" >
                                <div>
                                    <label>Sort By</label>
                                </div>
                                <div>
                                    <select name="sort" onChange={this.handleSort}>
                                        <option value="L-H">Lowest to Highest</option>
                                        <option value="H-L">Highest to Lowest</option>
                                        <option value='A-Z'>A-Z</option>
                                        <option value='Z-A'>Z-A</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="products-container">
                        <div className="mobile-sidebar">

                        </div>
                        <div id="filter-bar">
                            <div className="filter">
                                <h2>Brand</h2>
                                {uniqueBrands.map(brand => <div key={brand}>

                                    <input type="checkbox" name="brand" value={brand} onChange={this.handleFilter} />
                                    <label>{brand}</label>
                                </div>)}

                                <h2>Colour</h2>
                                {uniqueColors.map(color => <div key={color}>
                                    <input type="checkbox" name="colour" value={color} onChange={this.handleFilter} />
                                    <label>{color}</label>
                                </div>)}

                                <h2>Gender</h2>
                                {uniqueAge.map(age => <div key={age}>
                                    <input type="checkbox" name="age" value={age} onChange={this.handleFilter} />
                                    <label>{age}</label>
                                </div>)}

                                <h2>Type</h2>
                                {uniqueType.map(type => <div key={type}>
                                    <input type="checkbox" name="type" value={type} onChange={this.handleFilter} />
                                    <label>{type}</label>
                                </div>)}

                            </div>
                        </div>
                        <div className="products">
                            {this.state.shoesData.map(product =>
                                <div className="products-shoe" key={product._id}>
                                    <div className="product-image">
                                        <Link to={`/products/${product._id}`}>
                                            <img src={product.productImage} alt={product.name} />
                                        </Link>
                                    </div>
                                    <div className="product-info">
                                        <p>{product.name}</p>
                                        <p>{product.age}</p>
                                        <br></br>
                                        <p>{`€${product.price}`}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default AllProducts;