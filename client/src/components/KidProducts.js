import React from "react";
import { SERVER_HOST } from "../config/global_constants";
import axios from "axios";
import { FaFilter } from "react-icons/fa";
import Card from "./ShoeCard";
import FilterBar from "./FilterBar";
import ScrollToTop from "../ScrollToTop";

class KidsProducts extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            shoesData: [],
            filters: {
                brand: [],
                colour: [],
                age: [],
                type: [],
                size: []
                
            },
            showFilterBar: false,
            sort: "",
            search: ""
        }
    }

    componentDidMount() {
        axios.get(`${SERVER_HOST}/shoes/kids`)
            .then((response) => {
                this.setState({ data: response.data })
            }
        ).then(() => {
            this.setState({ shoesData: this.state.data })
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
                        type: [...this.state.filters.type],
                        size: [...this.state.filters.size]
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
                        type: [...this.state.filters.type],
                        size: [...this.state.filters.size]
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
                        type: [...this.state.filters.type],
                        size: [...this.state.filters.size]
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
                        type: [...this.state.filters.type, value],
                        size: [...this.state.filters.size]
                    }
                }, () => {
                    this.applyFilters();
                })
            }

            if (name === "size") {
                this.setState({
                    filters: {
                        brand: [...this.state.filters.brand],
                        colour: [...this.state.filters.colour],
                        age: [...this.state.filters.age],
                        type: [...this.state.filters.type],
                        size: [...this.state.filters.size, value]
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
                        type: [...this.state.filters.type],
                        size: [...this.state.filters.size]
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
                        type: [...this.state.filters.type],
                        size: [...this.state.filters.size]
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
                        type: [...this.state.filters.type],
                        size: [...this.state.filters.size]
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
                        type: this.state.filters.type.filter(type => type !== value),
                        size: [...this.state.filters.size]
                    }
                }, () => {
                    this.applyFilters();
                })
            }

            if (name === "size") {
                this.setState({
                    filters: {
                        brand: [...this.state.filters.brand],
                        colour: [...this.state.filters.colour],
                        age: [...this.state.filters.age],
                        type: [...this.state.filters.type],
                        size: this.state.filters.size.filter(size => size !== value)
                    }
                }, () => {
                    this.applyFilters();
                })
            }

        }
    }

    handleSearch = (e) => {
        const { value } = e.target;

        this.setState({
            search: value
        }, () => {
            this.applyFilters();
        })
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


    applyFilters = () => {
        if (this.state.filters.brand.length === 0 && this.state.filters.colour.length === 0 && this.state.filters.age.length === 0 && this.state.filters.type.length === 0 && this.state.filters.size.length === 0) {
            this.setState({ shoesData: this.state.data }, () => {
                this.sort();
                this.search();
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
                if(this.state.filters.size.length > 0 && !this.state.filters.size.some(size => shoe.sizes.includes(size))) {
                    return false;
                }
                
                return true;
            }
            )
        }, () => {
            this.sort();
            this.search();
        })
    }

    search = () => {
        if (this.state.search === "") {
            return this.state.shoesData;
        } else {
            this.setState({
                shoesData: this.state.shoesData.filter(shoe => shoe.name.toLowerCase().includes(this.state.search.toLowerCase().trim())
                || shoe.brand.toLowerCase().includes(this.state.search.toLowerCase().trim())
                || shoe.color.toLowerCase().includes(this.state.search.toLowerCase().trim())
                || shoe.type.toLowerCase().includes(this.state.search.toLowerCase().trim())
                )
            })
        }
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
        if (this.state.data.length < 1) {
            return (
                <div>
                    <p>Loading...</p>
                </div>
            )
        } else {
            const uniqueColors = [...new Set(this.state.data.map(item => item.color))];
            const uniqueBrands = [...new Set(this.state.data.map(item => item.brand))];
            const uniqueType = [...new Set(this.state.data.map(item => item.type))];
            let sizes = [];
            this.state.data.forEach(item => {
                item.sizes.forEach(size => {
                    sizes.push(parseFloat(size));
                })
            })
            const uniqueSizes = [...new Set(sizes)].sort((a, b) => a - b);
            
    
            return (
                <div className="products-page-container">
                    <ScrollToTop />
                    <div className="products-page-functions">
                        <div className='functions-left'>
                            <h1>Kids' Shoes ({this.state.shoesData.length})</h1>
                        </div>
                        <div className="functions-right">
                            <div className="search">
                                <input type="text" placeholder="Search" onChange={this.handleSearch} />
                            </div>
                            <div className="filter-button">
                                <button className="sideBarButton" onClick={this.handleFilterBar}><FaFilter /></button>
                            </div>
                            <div className="sort-container">
                                <select id="sort-functions" name="sort" onChange={this.handleSort} defaultValue="Sort By">
                                    <option defaultValue="default" disabled hidden>Sort By</option>
                                    <option value="L-H">Lowest to Highest</option>
                                    <option value="H-L">Highest to Lowest</option>
                                    <option value='A-Z'>A-Z</option>
                                    <option value='Z-A'>Z-A</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="products-container">
                        <div className="mobile-sidebar">

                        </div>
                        <FilterBar
                            brands={uniqueBrands}
                            colours={uniqueColors}
                            types={uniqueType}
                            sizes={uniqueSizes}
                            handleFilter={this.handleFilter}
                        />
                        <div className="products">
                            {this.state.shoesData.map(product =>
                                <Card key={product.id} product={product} />
                            )}
                        </div>
                    </div>
                </div>
            )
        }
    }

}

export default KidsProducts;