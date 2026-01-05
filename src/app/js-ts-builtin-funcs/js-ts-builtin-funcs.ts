import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Person {
  name: string;
  age?: number; // ? symbol in an interface property declaration indicates that the property is optional. 
  // It means that the property may or may not be present when creating an object based on that interface.
}

@Component({
  selector: 'app-js-ts-builtin-funcs',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './js-ts-builtin-funcs.html',
  styleUrls: ['./js-ts-builtin-funcs.css']
})
export class JsTsBuiltinFuncs {
  // Built-in JavaScript Functions
  protected readonly str = 'Hello';
  protected arr = ['A', 'B', 'C'];

  protected randomNumber(): number {
    return Math.random();
  }

  protected maxNumber(...numbers: number[]): number {
    return Math.max(...numbers);
  }

  protected minNumber(...numbers: number[]): number {
    return Math.min(...numbers);
  }

  protected roundNumber(num: number): number {
    return Math.round(num);
  }

  protected floorNumber(num: number): number {
    return Math.floor(num);
  }

  protected ceilNumber(num: number): number {
    return Math.ceil(num);
  }

  // Built-in TypeScript Functions (which are not in JavaScript)

  protected readonly partialPerson: Partial<Person>;
  protected readonly readonlyPerson: Readonly<Person>;
  protected readonly pickedPerson: Pick<Person, 'name'>;
  protected readonly omittedPerson: Omit<Person, 'age'>;

  private value: unknown = 'typescript';

  constructor() {
    this.partialPerson = { name: 'John' };
    this.readonlyPerson = { name: 'Jane', age: 25 };
    this.pickedPerson = { name: 'Alice' };
    this.omittedPerson = { name: 'Bob' };
  }

  protected getValueAsUppercase(): string {
    return (this.value as string).toUpperCase();
  }

  protected isValueString(): boolean {
    return typeof this.value === 'string';
  }

  protected readonly parseIntValue = parseInt('10');
  protected readonly parseFloatValue = parseFloat('3.14');
}

// Built-in JavaScript Functions -->

// 1. String Functions
//--------------------
// charAt(index): Returns the character at the specified index in a string.
// concat(str1, str2, ...): Concatenates two or more strings.
// indexOf(searchValue, startIndex): Returns the index of the first occurrence of a specified value in a string.
// substring(startIndex, endIndex): Extracts a portion of a string between the specified start and end indexes.
// slice(startIndex, endIndex): Extracts a section of a string between the specified start and end indexes.
// toUpperCase(): Converts a string to uppercase.
// toLowerCase(): Converts a string to lowercase.
// trim(): Removes whitespace from both ends of a string.

// 2. Array Functions
//-------------------
// push(element1, element2, ...): Adds one or more elements to the end of an array and returns the new length of the array.
// pop(): Removes the last element from an array and returns that element.
// shift(): Removes the first element from an array and returns that element.
// unshift(element1, element2, ...): Adds one or more elements to the beginning of an array and returns the new length of the array.
// concat(array1, array2, ...): Concatenates two or more arrays.
// join(separator): Joins all elements of an array into a string, separated by the specified separator.
// slice(startIndex, endIndex): Extracts a shallow copy of a portion of an array between the specified start and end indexes.
// splice(startIndex, deleteCount, item1, item2, ...): Changes the contents of an array by removing or replacing existing elements and/or adding new elements.

// 3. Math Functions
//------------------
// Math.max(num1, num2, ...): Returns the largest of the given numbers.
// Math.min(num1, num2, ...): Returns the smallest of the given numbers.
// Math.random(): Returns a random number between 0 (inclusive) and 1 (exclusive).
// Math.round(num): Rounds a number to the nearest integer.
// Math.floor(num): Rounds a number down to the nearest integer.
// Math.ceil(num): Rounds a number up to the nearest integer.


// Built-in TypeScript Functions (which are not in JavaScript) -->

// 1. Type Utility Functions
//--------------------------
// Partial<T>: Constructs a type with all properties of T set to optional.
// Readonly<T>: Constructs a type with all properties of T set to readonly.
// Pick<T, K>: Constructs a type by picking the specified properties K from T.
// Omit<T, K>: Constructs a type by omitting the specified properties K from T.
// Exclude<T, U>: Constructs a type by excluding all types in U from T.
// Record<K, T>: Constructs an object type with properties K of type T.
// Required<T>: Constructs a type with all properties of T set to required.
// NonNullable<T>: Constructs a type by excluding null and undefined from T.

// 2. Type Assertion Functions
//----------------------------
// as: Asserts that a value has a specific type.
// is: Returns a boolean indicating whether a value is of a specific type.

// 3. Type Checking Functions
//---------------------------
// typeof: Returns the type of a value as a string at runtime.
// instanceof: Checks if an object is an instance of a specific class or constructor function.

// 4. Type Conversion Functions
//-----------------------------
// parseInt: Parses a string argument and returns an integer.
// parseFloat: Parses a string argument and returns a floating-point number.
