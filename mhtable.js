class mhTable {

    // simple javascript class to manage create table
    // author: https://github.com/mhabib555
    // author-email: mhabib555@gmail.com

    tableId = "#table";
    titles = ['id', 'name'];
    data = []; // array of object
    selectedData = []; // selected column from data
    currentPage = 1;
    pageSize;

    constructor(tableId, titles, selectedData, data, options = {
        pageSize: 10,
        currentPage: 1
    }) {
        this.tableId = tableId;
        this.titles = titles;
        this.selectedData = selectedData;
        this.data = data;
        this.pageSize = options.pageSize;
        this.populateTheadRows();
        this.populateTbodyRows();
    }

    populateTheadRows() {
        if (this.titles.length > 0) {
            let tableHead = document.querySelector(`${this.tableId} thead`);
            tableHead.innerHTML = "";
            let theadTr = tableHead.insertRow();
            this.titles.forEach(title => {
                theadTr.insertCell().outerHTML = `<th>${title}</th>`;
            })
        }
    }
    populateTbodyRows() {
        if (this.data.length > 0) {
            let tableBody = document.querySelector(`${this.tableId} tbody`);
            tableBody.innerHTML = "";
            this.data.filter((row, index) => {
                let startFrom = (this.currentPage - 1) * this.pageSize;
                let endAt = this.currentPage * this.pageSize;
                if (index >= startFrom && index < endAt) return true;
            }).forEach(row => {
                let selectedRowCol = 0;
                let tblRow = tableBody.insertRow();
                tblRow.insertCell().append(row[this.selectedData[selectedRowCol]]);
                selectedRowCol += 1;
                tblRow.insertCell().append(row[this.selectedData[selectedRowCol]]);
                selectedRowCol += 1;
                tblRow.insertCell().append(row[this.selectedData[selectedRowCol]]);
                selectedRowCol += 1;
            })

        }
    }

    nextPage() {
        if ((this.currentPage * this.pageSize) < this.data.length) this.currentPage++;
        this.populateTbodyRows();
    }

    previousPage() {
        if (this.currentPage > 1) this.currentPage--;
        this.populateTbodyRows();
    }
}