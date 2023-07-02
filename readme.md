# Grid Generator

JavaScript class to generate nested arrays and map them to the DOM.

## Install
```sh
npm install @seabuffalo/grid-generator
```

## API
Grid-Generator uses the static ```import``` declaration and so must be used inside a JavaScript module
```js
import { Grid, Cell } from "grid-generator"
new Cell(r, g, b, a)
new Grid(rows, columns, cell, parent)
```

## Example
Sample JavaScript functionality ```test.js```
```js
//import Grid and Cell classes in module format
import { Grid, Cell } from "grid-generator";

//identify DOM element to append grid to
const gridContainer = document.querySelector(".grid-container");

//create new Grid instance
const newCell = new Cell(0, 200, 100, 1);
const newGrid = new Grid(3, 3, newCell, gridContainer);

//bind Grid methods to custom inputs
const rowsInput = document.querySelector("#rows");
rowsInput.addEventListener("change", (e) => {
  newGrid.setRows(parseInt(e.target.value));
});

const columnsInput = document.querySelector("#columns");
columnsInput.addEventListener("change", (e) => {
  newGrid.setColumns(parseInt(e.target.value));
});

const redInput = document.querySelector("#red");
redInput.addEventListener("change", (e) => {
  newGrid.setRed(parseFloat(e.target.value));
});

const greenInput = document.querySelector("#green");
greenInput.addEventListener("change", (e) => {
  newGrid.setGreen(parseFloat(e.target.value));
});

const blueInput = document.querySelector("#blue");
blueInput.addEventListener("change", (e) => {
  newGrid.setBlue(parseFloat(e.target.value));
});

const alphaInput = document.querySelector("#alpha");
alphaInput.addEventListener("change", (e) => {
  newGrid.setAlpha(parseFloat(e.target.value));
});
```
Binded to sample HTML document
```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <script src="test.js" type="module" defer></script>
  <title>Grid Generator Test</title>
</head>
<body>
  <style>
    body {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .grid-container {
      height: 600px;
      width: 600px;
    }
    .rgb-container, .rows-columns {
      width: 600px;
    }
    .labels, .inputs {
      display: flex;
    }
    .labels > label, .inputs > input {
      width: 25%;
    }
  </style>
  <div class="rows-columns">
    <label for="rows">Rows</label>
    <input id="rows" type="number" min="0" max="100" value="3">
  
    <label for="columns">Columns</label>
    <input id="columns" type="number" min="0" max="100" value="3">
  </div>
  
  <div class="rgb-container">
    <div class="labels">
      <label for="red">Red</label>
      <label for="green">Green</label>
      <label for="blue">Blue</label>
      <label for="alpha">Alpha</label>
    </div>

    <div class="inputs">
      <input id="red" type="range" min="0" max="255" value="0">
      <input id="green" type="range" min="0" max="255" value="200">
      <input id="blue" type="range" min="0" max="255" value="100">
      <input id="alpha" type="range" min="0" max="1" step="0.01" value="1">
    </div>
  </div>
  
  <div class="grid-container"></div>
</body>
</html>
```
## Properties & Methods

```js
//Grid

//Constructor
new Grid(rows, column, Cell) //creates grid with n rows/columns  
                             //using supplied Cell values

//Properties
newGrid.element              //returns grid mapped to a DOM element
newGrid.grid                 //returns current grid
newGrid.rows                 //returns total rows
newGrid.columns              //returns total columns
newGrid.totalCells           //returns total cells
newGrid.cell                 //returns current cell properties

//Methods
newGrid.addRows(rows)        //add n rows
newGrid.addColumns(columns)  //add n columns
newGrid.setRows(rows)        //modify grid to n rows
newGrid.setColumns(columns)  //modify grid to n columns
newGrid.setRed(r)            //change red value of cell rgba
newGrid.setGreen(g)          //change green value of cell rgba
newGrid.setBlue(b)           //change blue value of cell rgba
newGrid.setAlpha(a)          //change alpha value of cell rgba
newGrid.setCellColors(r, g, b, a)  //change cell rgba values

/////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////

//Cell

//Constructor
new Cell(r, g, b, a)         //creates cell to be used in grid
                             //takes rgba values for cell color

//Properties
cell.r                       //cell's red value
cell.g                       //cell's green value
cell.b                       //cell's blue value
cell.a                       //cells alpha value

//Methods
cell.setColors(r, g, b, a)   //change cell's rgba values
```

## License

MIT