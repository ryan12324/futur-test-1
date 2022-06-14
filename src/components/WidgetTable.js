import {Component} from "react";

class WidgetTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: this.props.tableData ?? [],
            sortColumn: null,
            sortMode: 1
        }
    }
    renderHeaders() {
        if (Array.isArray(this.state.tableData) && this.state.tableData.length > 0) {
            let headerLabels = Object.keys(this.state.tableData[0]);
            const headers = headerLabels.map((header) =>
                <th key={header} onClick={this.sortRows.bind(this, header)}>
                    {header} {this.renderSortIndicator(header)}
                </th>);

            return <thead><tr>{headers}</tr></thead>
        }
    }
    renderSortIndicator(header) {
        let {sortColumn, sortMode} = this.state;
        if(sortColumn === header) {
            return (sortMode === 1 ? '▲' : '▼')
        }
    }
    renderBody() {
        if (Array.isArray(this.state.tableData) && this.state.tableData.length > 0) {
            let {tableData} = this.state
            let rows = [];
            tableData.forEach((row,rowID) => {
                let columns = [];
                for(const key in row) {
                    columns.push(<td key={key}>{row[key]}</td>)
                }
                rows.push(<tr key={rowID}>{columns}</tr>)
            })
            return <tbody>{rows}</tbody>
        }
    }

    sortRows(rowToSort) {
        let sortMode = this.state.sortMode;
        if(this.state.sortColumn === rowToSort) {
            sortMode = sortMode * -1;
        }
        this.setState({
            sortColumn: rowToSort,
            sortMode: sortMode
        })
        let tableData = this.state.tableData;
        let sortedData = tableData.sort(function(a, b) {
            var x = a[rowToSort]; var y = b[rowToSort];
            if(typeof(a[rowToSort]) === "object" && typeof(b[rowToSort]) === "object") {
                x = parseFloat(a[rowToSort].props.value); y = parseFloat(b[rowToSort].props.value);
            }
            if(sortMode === 1) {
                return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            }
            return ((y < x) ? -1 : ((y > x) ? 1 : 0));
        });
        this.setState({
            tableData: sortedData
        })
    }

    render() {
        return (
            <table className="widgetTable">
                {this.renderHeaders()}
                {this.renderBody()}
            </table>
        )
    }
}

export default WidgetTable;