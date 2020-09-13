const CELL_SIZE = 10;
const MIN_REGION_SIZE = 10;
const MIN_SIZE = 4;
const MAX_RECURSION = 3;
let z = 0;

// const tree: Leaf[] = [];

type Direction = 'horizont' | 'vertical';

export class Leaf {
    public x: number;
    public y: number;
    public height: number;
    public width: number;
    public maxRecursion: number;
    public parent = null;
    public childNodes = [];
    private canvas = document.getElementById('tutorial') as HTMLCanvasElement;
    private ctx = this.canvas.getContext('2d');
    private tree: Leaf[] = [];

    private direction: Direction = this.getDirection();

    // private get direction(): Direction {

    //     if(this._direction) {
    //         return this._direction;
    //     }

    //     return 
    // }

    constructor(
        x: number,
        y: number,
        height: number,
        width: number,
        maxRecursion = MAX_RECURSION,
    ) {
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.maxRecursion = maxRecursion;
        this.generateThree();
    }

    public splitTree(): void {
        this.drawBox();

        this.tree.forEach(x => {
            x.splitTree()
        })
    }

    private getDirection(): Direction {
        return this.randomIntenger(0, 9) % 2 === 0
        ? 'horizont'
        : 'vertical';
    }

    private randomIntenger(min: number, max: number): number {
        return Math.floor(Math.random() * (max + 1 - min) + min)
    }

    private generateThree(): void {
        if (this.maxRecursion < 1) {
            return
        };

        const pos = Math.floor(this.width / 2) + this.randomIntenger(-10, 10);

        const x1 = this.x;
        const y1 = this.y;
        const width1 = this.isHorizonDirection() ? this.width : pos;
        const height1 = this.isHorizonDirection() ? pos : this.height;
    
        const x2 = this.isHorizonDirection() ? this.x : this.x + pos;
        const y2 = this.isHorizonDirection() ? this.y + pos : this.y;
        const width2 = this.isHorizonDirection() ? this.width : this.width - pos;
        const height2 = this.isHorizonDirection() ? this.height - pos : this.height;

        this.tree.push(
            new Leaf(
                x1,
                y1,
                height1,
                width1,
                this.maxRecursion - 1,
            ));

        this.tree.push(
            new Leaf(
                x2,
                y2,
                height2,
                width2,
                this.maxRecursion - 1,
            ));
    }

    private setColor(): string {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

    private drawCell(): void {
        this.ctx.fillStyle = this.setColor();
        this.ctx.fillRect(this.x * CELL_SIZE, this.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
    }

    private drawBox(): void {
        this.ctx.fillStyle = this.setColor();
        this.ctx.fillRect(
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    private isHorizonDirection(): boolean {
        return this.direction === 'horizont';
    }
}