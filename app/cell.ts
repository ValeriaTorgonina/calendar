
export class Cell {
    cell: HTMLDivElement = this.createCell()

    constructor(
    ) {
    }

    createCell ():HTMLDivElement {
        const div = document.createElement('div');
        div.classList.add('cell');
        return div
    }


}