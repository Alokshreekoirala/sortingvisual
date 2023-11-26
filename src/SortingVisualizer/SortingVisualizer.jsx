import React from 'react';
import { getMergeSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import { getBubbleSortAnimations } from '../sortingAlgorithms/sortingAlgorithms.js';
import './SortingVisualizer.css';

// Change this value for the speed of the animations.
const ANIMATION_SPEED_MS = 50;

// Change this value for the number of bars (value) in the array.
const NUMBER_OF_ARRAY_BARS = 32;

// This is the main color of the array bars.H
const PRIMARY_COLOR = 'turquoise';

// This is the color of array bars that are being compared throughout the animations.
const SECONDARY_COLOR = 'red';

export default class SortingVisualizer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            array: [],
            arrayBarsRef: React.createRef(),
        };
    }

    componentDidMount() {
        this.resetArray();
    }

    resetArray() {
        const array = [];
        for (let i = 0; i < NUMBER_OF_ARRAY_BARS; i++) {
            array.push(randomIntFromInterval(20, 200));
        }
        this.setState({ array, /* Reset other state variables if any */ }, () => {
            // Reset array bar colors after state has been updated
            const arrayBars = this.state.arrayBarsRef.current.getElementsByClassName('array-bar');
            for (let i = 0; i < arrayBars.length; i++) {
                arrayBars[i].style.backgroundColor = PRIMARY_COLOR;
            }
        });
    }

    mergeSort() {
        const arrayBars = this.state.arrayBarsRef.current.getElementsByClassName('array-bar');

        const animations = getMergeSortAnimations(this.state.array);
        for (let i = 0; i < animations.length; i++) {
            const arrayBars = document.getElementsByClassName('array-bar');
            const isColorChange = i % 3 !== 2;
            if (isColorChange) {
                const [barOneIdx, barTwoIdx] = animations[i];
                const barOneStyle = arrayBars[barOneIdx].style;
                const barTwoStyle = arrayBars[barTwoIdx].style;
                const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
                setTimeout(() => {
                    barOneStyle.backgroundColor = color;
                    barTwoStyle.backgroundColor = color;
                }, i * ANIMATION_SPEED_MS);
            } else {
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                }, i * ANIMATION_SPEED_MS);
            }
        }
    }



    // Assuming this code is part of a React component
    bubbleSort() {
        const arrayBars = this.state.arrayBarsRef.current.getElementsByClassName('array-bar');
        const animations = getBubbleSortAnimations(this.state.array);

        for (let i = 0; i < animations.length; i++) {
            const [barOneIdx, barTwoIdx, swap] = animations[i];

            console.log(`Iteration: ${i}, barOneIdx: ${barOneIdx}, barTwoIdx: ${barTwoIdx}, swap: ${swap}`);

            // Change color for comparison
            setTimeout(() => {
                if (arrayBars[barOneIdx] && arrayBars[barTwoIdx]) {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.backgroundColor = SECONDARY_COLOR;
                    barTwoStyle.backgroundColor = SECONDARY_COLOR;
                }
            }, i * ANIMATION_SPEED_MS);

            // Revert color after comparison
            setTimeout(() => {
                if (arrayBars[barOneIdx] && arrayBars[barTwoIdx]) {
                    const barOneStyle = arrayBars[barOneIdx].style;
                    const barTwoStyle = arrayBars[barTwoIdx].style;
                    barOneStyle.backgroundColor = PRIMARY_COLOR;
                    barTwoStyle.backgroundColor = PRIMARY_COLOR;
                }
            }, (i + 1) * ANIMATION_SPEED_MS);

            // Swap values if necessary
            if (swap) {
                setTimeout(() => {
                    if (arrayBars[barOneIdx] && arrayBars[barTwoIdx]) {
                        const barOneStyle = arrayBars[barOneIdx].style;
                        const barTwoStyle = arrayBars[barTwoIdx].style;
                        const tempHeight = barOneStyle.height;
                        barOneStyle.height = barTwoStyle.height;
                        barTwoStyle.height = tempHeight;
                    }
                }, (i + 2) * ANIMATION_SPEED_MS);
            }
        }
    }





    render() {
        const { array } = this.state;

        return (
            <div className="array-container" ref={this.state.arrayBarsRef}>


                <button className="btns" onClick={() => this.resetArray()}>Generate New Array</button>
                <button className="btns1" onClick={() => this.mergeSort()}>Merge Sort</button>
                <button className="btns1" onClick={() => this.bubbleSort()}>Bubble Sort</button>

                <br></br>
                <br></br>
                {array.map((value, idx) => (
                    <div
                        className="array-bar"
                        key={idx}

                        style={{
                            backgroundColor: PRIMARY_COLOR,
                            height: `${value}px`,
                        }}></div>



                ))}
            </div>
        );
    }
}

// From https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
function randomIntFromInterval(min, max) {
    // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function arraysAreEqual(arrayOne, arrayTwo) {
    if (arrayOne.length !== arrayTwo.length) return false;
    for (let i = 0; i < arrayOne.length; i++) {
        if (arrayOne[i] !== arrayTwo[i]) {
            return false;
        }
    }
    return true;
}