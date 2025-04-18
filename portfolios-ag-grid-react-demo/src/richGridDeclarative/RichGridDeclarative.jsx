import React, {Component} from "react";
import {AgGridReact} from "@ag-grid-community/react";
import RowDataFactory from "./RowDataFactory.js";
import DateComponent from "./DateComponent.jsx";
import SkillsCellRenderer from './SkillsCellRenderer.jsx';
import NameCellEditor from './NameCellEditor.jsx';
import ProficiencyCellRenderer from './ProficiencyCellRenderer.jsx';
import RefData from './RefData.js';
import SkillsFilter from './SkillsFilter.jsx';
import ProficiencyFilter from './ProficiencyFilter.jsx';
import HeaderGroupComponent from './HeaderGroupComponent.jsx';
import SortableHeaderComponent from './SortableHeaderComponent.jsx';

import "./RichGridDeclarative.css";

import {ClientSideRowModelModule} from "@ag-grid-community/client-side-row-model";
import {ColumnsToolPanelModule} from "@ag-grid-enterprise/column-tool-panel";
import {ExcelExportModule} from "@ag-grid-enterprise/excel-export";
import {FiltersToolPanelModule} from "@ag-grid-enterprise/filter-tool-panel";
import {SparklinesModule} from "@ag-grid-enterprise/sparklines";
import {GridChartsModule} from "@ag-grid-enterprise/charts";
import {MasterDetailModule} from "@ag-grid-enterprise/master-detail";
import {MenuModule} from "@ag-grid-enterprise/menu";
import {MultiFilterModule} from "@ag-grid-enterprise/multi-filter";
import {RangeSelectionModule} from "@ag-grid-enterprise/range-selection";
import {RichSelectModule} from "@ag-grid-enterprise/rich-select";
import {RowGroupingModule} from "@ag-grid-enterprise/row-grouping";
import {ServerSideRowModelModule} from "@ag-grid-enterprise/server-side-row-model";
import {SetFilterModule} from "@ag-grid-enterprise/set-filter";
import {SideBarModule} from "@ag-grid-enterprise/side-bar";
import {StatusBarModule} from "@ag-grid-enterprise/status-bar";
import {ViewportRowModelModule} from "@ag-grid-enterprise/viewport-row-model";
import {ClipboardModule} from "@ag-grid-enterprise/clipboard";

const defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true,
    headerComponent: SortableHeaderComponent,
    headerComponentParams: {
        menuIcon: 'fa-bars'
    }
};

const modules = [ClientSideRowModelModule,
    ColumnsToolPanelModule,
    ExcelExportModule,
    FiltersToolPanelModule,
    SparklinesModule,
    GridChartsModule,
    MasterDetailModule,
    MenuModule,
    MultiFilterModule,
    RangeSelectionModule,
    RichSelectModule,
    RowGroupingModule,
    ServerSideRowModelModule,
    SetFilterModule,
    SideBarModule,
    StatusBarModule,
    ViewportRowModelModule,
    ClipboardModule]

const components = {
    agDateInput: DateComponent
}

export default class RichGridDeclarative extends Component {
    constructor(props) {
        super(props);

        this.state = {
            quickFilterText: null,
            sideBar: false,
            rowData: new RowDataFactory().createRowData(),
            rowCount: null,
            icons: {
                columnRemoveFromGroup: '<i class="fa fa-times"/>',
                filter: '<i class="fa fa-filter"/>',
                sortAscending: '<i class="fa fa-long-arrow-down"/>',
                sortDescending: '<i class="fa fa-long-arrow-up"/>',
                groupExpanded: '<i class="fa fa-minus-square-o"/>',
                groupContracted: '<i class="fa fa-plus-square-o"/>'
            },
            columnDefs: [
                {
                    headerName: "#",
                    width: 40,
                    checkboxSelection: true,
                    sortable: false,
                    suppressMenu: true,
                    filter: false,
                    pinned: true
                },
                {
                    headerName: "Portfolios",
                    headerGroupComponent: HeaderGroupComponent,
                    children: [
                        {
                            field: "name",
                            width: 170,
                            cellEditor: NameCellEditor,
                            enableRowGroup: true,
                            enablePivot: true,
                            pinned: true,
                            editable: true

                        }
                    ]
                },
                {
                    headerName: "Advisors Details",
                    children: [
                        {
                            field: "Advisors",
                            width: 120,
                            enableRowGroup: true,
                            enablePivot: true,
                            sortable: false,
                            cellRenderer: SkillsCellRenderer,
                            filter: SkillsFilter
                        },
                        {
                            field: "grownthProficiency",
                            width: 210,
                            enableValue: true,
                            cellRenderer: ProficiencyCellRenderer,
                            filter: ProficiencyFilter
                        }
                    ]
                },
                {
                    headerName: "Portfolio Requirements",
                    children: [
                        {field: "minbudget", width: 180, filter: "text"},
                        {field: "maxbudget", width: 190, filter: "text"},
                        {field: "managementFees", width: 500, filter: "text"}
                    ]
                }
            ]
        };
    }

    static countryCellRenderer(params) {
        if (params.value && RefData.COUNTRY_CODES[params.value]) {
            return <><img border='0' width='15' height='10' style={{marginBottom: 2}}
                          src={`http://flags.fmcdn.net/data/flags/mini/${RefData.COUNTRY_CODES[params.value]}.png`}/> {params.value}</>;
        } else {
            return <>{params.value}</>;
        }
    }

    static dateCellRenderer(params) {
        return RichGridDeclarative.pad(params.value.getDate(), 2) + '/' +
            RichGridDeclarative.pad(params.value.getMonth() + 1, 2) + '/' +
            params.value.getFullYear();
    }

    static pad(num, totalStringSize) {
        let asString = num + "";
        while (asString.length < totalStringSize) asString = "0" + asString;
        return asString;
    }

    /* Grid Events we're listening to */
    onGridReady = (params) => {
        this.api = params.api;

        this.api.sizeColumnsToFit();

        this.calculateRowCount();
    };

    onCellClicked = (event) => {
        console.log('onCellClicked: ' + event.data.name + ', col ' + event.colIndex);
    };

    onRowSelected = (event) => {
        console.log('onRowSelected: ' + event.node.data.name);
    };

    /* Demo related methods */
    onToggleSidebar = (event) => {
        this.setState({sideBar: event.target.checked});
    };

    deselectAll() {
        this.api.deselectAll();
    }

    onQuickFilterText = (event) => {
        this.setState({quickFilterText: event.target.value});
    };

    onRefreshData = () => {
        this.setState({
            rowData: new RowDataFactory().createRowData()
        });
    };

    invokeSkillsFilterMethod = () => {
        this.api.getColumnFilterInstance('skills').then((instance) => {
            instance.helloFromSkillsFilter();
        });
    };

    dobFilter = () => {
        this.api.setColumnFilterModel('dob', {
            type: 'equals',
            dateFrom: '2000-01-01'
        }).then(() => this.api.onFilterChanged());
    };

    calculateRowCount = () => {
        if (this.api && this.state.rowData) {
            const model = this.api.getModel();
            const totalRows = this.state.rowData.length;
            const processedRows = model.getRowCount();
            this.setState({
                rowCount: processedRows.toLocaleString() + ' / ' + totalRows.toLocaleString()
            });
        }
    };

    render() {
        return (
            <div style={{width: '100%'}}>
                <h1>Global Advisory Board</h1>
                <div style={{display: "inline-block", width: "100%"}}>
                    <div style={{float: "left"}}>
                        <b>Top performing portfolios from our advisors  </b>{this.state.rowCount}
                    </div>
                </div>
                <div style={{marginTop: 10}}>
                    {/* <div>
                        <span>
                            Grid API:
                            <button onClick={() => {
                                this.api.selectAll();
                            }} className="btn btn-primary">Select All</button>
                            <button onClick={() => {
                                this.api.deselectAll();
                            }} className="btn btn-primary">Clear Selection</button>
                        </span>
                        <span style={{float: "right"}}>
                            Column API:
                            <button onClick={() => {
                                this.api.setColumnsVisible(['country'], false);
                            }} className="btn btn-primary">Hide Country Column</button>
                            <button onClick={() => {
                                this.api.setColumnsVisible(['country'], true);
                            }} className="btn btn-primary">Show Country Column</button>
                        </span>
                    </div> */}
                    {/* <div style={{display: "inline-block", width: "100%", marginTop: 10, marginBottom: 10}}>
                        <div style={{float: "left"}}>
                            <button onClick={this.onRefreshData} className="btn btn-primary">Refresh Data</button>
                        </div>
                        <div style={{float: "right"}}>
                            Filter API:
                            <button onClick={this.invokeSkillsFilterMethod}
                                    className="btn btn-primary">Invoke Skills Filter Method
                            </button>
                            <button onClick={this.dobFilter} className="btn btn-primary">DOB equals to 01/01/2000
                            </button>
                        </div>
                    </div> */}
                    <div style={{display: "inline-block", width: "100%", marginTop: 10, marginBottom: 10}}>
                        <div style={{float: "left"}}>
                            <label htmlFor="sideBarToggle">Show Side Bar&nbsp;</label>
                            <input type="checkbox" id="sideBarToggle" onChange={this.onToggleSidebar}
                                   style={{marginRight: 5}}/>
                        </div>
                        <div style={{float: "right", marginLeft: 20}}>
                            <label htmlFor="quickFilter">Quick Filter:&nbsp;</label>
                            <input type="text" id="quickFilter" onChange={this.onQuickFilterText}
                                   placeholder="Type text to filter..."/>
                        </div>
                    </div>
                    <div style={{height: 650, width: '100%'}} className="ag-theme-alpine">
                        <AgGridReact
                            // listening for events
                            onGridReady={this.onGridReady}
                            onRowSelected={this.onRowSelected}
                            onCellClicked={this.onCellClicked}
                            onModelUpdated={this.calculateRowCount}

                            // binding to simple properties
                            sideBar={this.state.sideBar}
                            quickFilterText={this.state.quickFilterText}

                            // binding to an object property
                            icons={this.state.icons}

                            // column definitions
                            columnDefs={this.state.columnDefs}

                            // binding to array properties
                            rowData={this.state.rowData}

                            // register all modules (row model, csv/excel, row grouping etc)
                            modules={modules}

                            // no binding, just providing hard coded strings for the properties
                            // boolean properties will default to true if provided (ie suppressRowClickSelection => suppressRowClickSelection="true")
                            suppressRowClickSelection
                            rowSelection="multiple"
                            groupHeaders

                            // setting grid wide date component
                            components={components}
                            // setting default column properties
                            defaultColDef={defaultColDef}/>
                    </div>
                </div>
            </div>
        );
    }
}
