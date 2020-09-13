import { Leaf } from "../leaf";


export class Canvas {
    private canvas = document.getElementById('tutorial') as HTMLCanvasElement;
    private ctx = this.canvas.getContext('2d');

    constructor() {
        this.paint();
    }


    private paint() {
        const tree = new Leaf(0, 0, this.canvas.height, this.canvas.width );
        tree.splitTree();
    }
}