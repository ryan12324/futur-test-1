import {Component} from "react";
import WidgetTable from "./WidgetTable";
import LoadingIndicator from "./LoadingIndicator";
import Error from "./Error";

class ReviewWidget extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoaded: false,
            offers: [],
            products: [],
            error: null
        }
    }

    componentDidMount() {
        fetch("https://search-api.fie.future.net.uk/widget.php?id=review&site=TRD&model_name=iPad_Pro")
            .then(res => res.json())
            .then(
                (response) => {
                    this.setState({
                        isLoaded: true,
                        offers: response.widget.data.offers,
                        products: response.widget.data.model_info
                    })
                }
            )
    }

    getTableBody() {
        const {offers} = this.state;
        let rows = [];
        offers.forEach((offer) => {
            rows.push({
                "Merchant Name": offer.merchant.name,
                "Merchant Logo": <img src={offer.merchant.logo_url} />,
                "Product Name": offer.offer.name,
                "Product Price": <span value={offer.offer.price} dangerouslySetInnerHTML={{__html:`${offer.offer.currency_symbol + offer.offer.price}`}} />,
                "Product Link": <a href={offer.offer.link}>{offer.offer.merchant_link_text}</a>
            })
        })
        return rows;
    }

    renderTable() {
        const {error, isLoaded, offers} = this.state;
        if (error) {
            return <Error message={error}/>
        } else if (!isLoaded) {
            return <LoadingIndicator/>
        }
        return <WidgetTable tableData={this.getTableBody()}/>
    }

    getClassNames() {
        const {error, isLoaded} = this.state;
        let className = 'reviewWidget';
        if (!isLoaded) {
            className += ' reviewWidget--loading';
        }
        if(error) {
            className += ' reviewWidget--error'
        }
        return className;
    }

    render() {
        return (
            <div className={this.getClassNames()}>
                {this.renderTable()}
            </div>
        )
    }
}

export default ReviewWidget;