export class Cell {
  constructor(r, g, b, a) {
    this.setColors(r, g, b, a);
  }

  setColors(r, g, b, a) {
    if (typeof r === "number") {
      this.r = r;
      if (r > 255) {
        this.r = 255;
      } else if (r < 0) {
        this.r = 0;
      }
    } else {
      this.r = 0;
    }

    if (typeof g === "number") {
      this.g = g;
      if (g > 255) {
        this.g = 255;
      } else if (g < 0) {
        this.g = 0;
      }
    } else {
      this.g = 0;
    }

    if (typeof b === "number") {
      this.b = b;
      if (b > 255) {
        this.b = 255;
      } else if (b < 0) {
        this.b = 0;
      }
    } else {
      this.b = 0;
    }

    if (typeof a === "number") {
      this.a = a;
      if (a > 1) {
        this.a = 1;
      } else if (a < 0) {
        this.a = 0;
      }
    } else {
      this.a = 1;
    }
  }
}

export class Grid {
  constructor(rows, columns, cell, parent) {
    //check input types
    if (typeof rows !== "number" || typeof columns !== "number") {
      throw new Error("Rows and columns must be numbers");
    }

    if (!(cell instanceof Cell || cell === undefined)) {
      throw new Error(
        "Invalid cell color format, please use Cell class instance"
      );
    }

    if (parent === undefined || !(parent instanceof HTMLElement)) {
      throw new Error("Please supply a valid parent element");
    }

    this._cell = cell;
    this._grid = [];
    this._parent = parent;
    this.init(rows, columns);
  }

  init(rows, columns) {
    for (let i = 0; i < rows; i++) {
      this._grid.push([]);
      for (let j = 0; j < columns; j++) {
        this._grid[i].push(this._cell);
      }
    }

    this.element = this.updateElement();
  }

  //all getters
  get grid() {
    return this._grid;
  }

  get rows() {
    return this._grid.length;
  }

  get columns() {
    return this._grid[0].length;
  }

  get totalCells() {
    return this.rows * this.columns;
  }

  get cell() {
    return this._cell;
  }

  //all methods
  addRows(row) {
    if (typeof row !== "number")
      throw new Error("Please supply a number as input");

    for (let i = 0; i < row; i++) {
      this._grid.push(new Array(this._columns).fill(0));
      this._rows++;
    }

    this.element = this.updateElement();
  }

  addColumns(columns) {
    if (typeof columns !== "number")
      throw new Error("Please supply a number as input");

    for (let i = 0; i < this.grid.length; i++) {
      for (let j = 0; j < columns; j++) {
        this._grid[i].push(0);
      }
    }

    this.element = this.updateElement();
  }

  setRows(rows) {
    if (typeof rows !== "number")
      throw new Error("Please supply a number as input");

    if (rows <= 0) throw new Error("Please supply a positive number as input");

    const columns = this._grid[0].length;
    this._grid = [];
    this.init(rows, columns);
  }

  setColumns(columns) {
    if (typeof columns !== "number")
      throw new Error("Please supply a number as input");

    if (columns <= 0) throw new Error("Please supply a positive number as input");

    const rows = this._grid.length;
    this._grid = [];
    this.init(rows, columns);
  }

  setRed(r) {
    if (typeof r !== "number")
      throw new Error("Please supply a number as input");

    if (rows < 0) throw new Error("Please supply a positive number as input");

    this._cell = new Cell(r, this._cell.g, this._cell.b, this._cell.a);

    for (let i = 0; i < this._grid.length; i++) {
      for (let j = 0; j < this._grid[0].length; j++) {
        this._grid[i][j] = this._cell;
      }
    }

    this.element = this.updateElement();
  }

  setGreen(g) {
    if (typeof g !== "number")
      throw new Error("Please supply a number as input");

    if (rows < 0) throw new Error("Please supply a positive number as input");

    this._cell = new Cell(this._cell.r, g, this._cell.b, this._cell.a);

    for (let i = 0; i < this._grid.length; i++) {
      for (let j = 0; j < this._grid[0].length; j++) {
        this._grid[i][j] = this._cell;
      }
    }

    this.element = this.updateElement();
  }

  setBlue(b) {
    if (typeof b !== "number")
      throw new Error("Please supply a number as input");

    if (rows < 0) throw new Error("Please supply a positive number as input");

    this._cell = new Cell(this._cell.r, this._cell.g, b, this._cell.a);

    for (let i = 0; i < this._grid.length; i++) {
      for (let j = 0; j < this._grid[0].length; j++) {
        this._grid[i][j] = this._cell;
      }
    }

    this.element = this.updateElement();
  }

  setAlpha(a) {
    if (typeof a !== "number")
      throw new Error("Please supply a number as input");

    if (rows < 0) throw new Error("Please supply a positive number as input");

    this._cell = new Cell(this._cell.r, this._cell.g, this._cell.b, a);

    for (let i = 0; i < this._grid.length; i++) {
      for (let j = 0; j < this._grid[0].length; j++) {
        this._grid[i][j] = this._cell;
      }
    }

    this.element = this.updateElement();
  }

  setCellColors(r, g, b, a) {
    if (
      typeof r !== "number" ||
      typeof g !== "number" ||
      typeof b !== "number" ||
      typeof a !== "number"
    ) {
      throw new Error("Please supply a number as input");
    }

    if (r < 0 || g < 0 || b < 0 || a < 0) {
      throw new Error("Please supply a positive number as input");
    }

    this._cell = new Cell(r, g, b, a);

    for (let i = 0; i < this._grid.length; i++) {
      for (let j = 0; j < this._grid[0].length; j++) {
        this._grid[i][j] = this._cell;
      }
    }

    this.element = this.updateElement();
  }

  updateElement() {
    const parentEle = document.createElement("div");
    const styleSheet = document.createElement("style");
    styleSheet.appendChild(
      document.createTextNode(
        `.arbitrarygridcellselector { height: 100%; width: 100%; background-color: rgba(${this._cell.r},${this._cell.g}, ${this._cell.b},${this._cell.a}); border: 1px solid black; cursor: pointer;transition: 300ms } .arbitrarygridcellselector:hover { transform: scale(105%); z-index: 50; box-shadow: 0 0 5px black }`
      )
    );
    parentEle.append(styleSheet);
    parentEle.style.width = "100%";
    parentEle.style.height = "100%";
    for (let i = 0; i < this._grid.length; i++) {
      const row = document.createElement("div");
      row.style.height = `${100 / this._grid.length}%`;
      row.style.display = "flex";
      parentEle.append(row);
      for (let j = 0; j < this._grid[0].length; j++) {
        const cell = document.createElement("div");
        cell.classList.add("arbitrarygridcellselector");
        row.append(cell);
      }
    }

    //update DOM
    if (this._parent.children.length) this._parent.removeChild(this.element);
    this._parent.append(parentEle);
    return parentEle;
  }
}