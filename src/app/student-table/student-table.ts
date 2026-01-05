// Interface defines the shape of an object (properties & methods) without implementation.
// It enforces a contract between different parts of a program for clear communication.
// Abstract data types (like arrays, stacks, queues, trees) describe data structures and their operations
// while hiding implementation details for reuse and encapsulation.
//--------------------------------------------------------------------------------
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface Subject {
  name: string;
  marks: number;
}
// Types :
//--------
// type Subject = {
//   name: string;
//   marks: number;
// }

interface Student {
  id: number;
  name: string;
  department: string;
  subjects: Subject[];
}
// interface Student {
//   id: number;
//   name: string;
//   department: string;
//   subjects: {
//     name: string;
//     marks: number;
//   }[];
// }

interface Classroom {
  id: number;
  name: string;
  students: Student[];
}

@Component({
  selector: 'app-student-table',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './student-table.html',
  styleUrls: ['./student-table.css']
})
export class StudentTable {

  students: Student[] = [
    {
      id: 1,
      name: 'John Doe',
      department: 'Computer Science',
      subjects: [
        { name: 'Math', marks: 80 },
        { name: 'Science', marks: 90 },
        { name: 'English', marks: 85 }
      ]
    },
    {
      id: 2,
      name: 'Jane Smith',
      department: 'Electrical Engineering',
      subjects: [
        { name: 'Math', marks: 75 },
        { name: 'Science', marks: 85 },
        { name: 'English', marks: 90 }
      ]
    }
  ];

  classrooms: Classroom[] = [
    {
      id: 1,
      name: 'Computer Science Class',
      students: [
        {
          id: 1,
          name: 'John Doe',
          department: 'Computer Science',
          subjects: [
            { name: 'Math', marks: 80 },
            { name: 'Science', marks: 90 },
            { name: 'English', marks: 85 }
          ]
        },
        {
          id: 2,
          name: 'Jane Smith',
          department: 'Computer Science',
          subjects: [
            { name: 'Math', marks: 75 },
            { name: 'Science', marks: 85 },
            { name: 'English', marks: 90 }
          ]
        }
      ]
    },
    {
      id: 2,
      name: 'Electrical Engineering Class',
      students: [
        {
          id: 3,
          name: 'Tom Jackson',
          department: 'Electrical Engineering',
          subjects: [
            { name: 'Math', marks: 90 },
            { name: 'Science', marks: 80 },
            { name: 'English', marks: 70 }
          ]
        },
        {
          id: 4,
          name: 'Emma Green',
          department: 'Electrical Engineering',
          subjects: [
            { name: 'Math', marks: 85 },
            { name: 'Science', marks: 90 },
            { name: 'English', marks: 80 }
          ]
        }
      ]
    }
  ];

  getTotalMarks(student: Student): number {
    return student.subjects.reduce((sum, s) => sum + s.marks, 0);
  }

  getRanking(student: Student): number {
    const totalMarks = this.getTotalMarks(student);
    let ranking = 1;
    for (const otherStudent of this.students) {
      if (otherStudent !== student && this.getTotalMarks(otherStudent) > totalMarks) {
        ranking++;
      }
    }
    return ranking;
  }

  getRanking_2(student: Student, classroom: Classroom): number {
    const totalMarks = this.getTotalMarks(student);
    let ranking = 1;
    for (const otherStudent of classroom.students) {
      if (otherStudent !== student && this.getTotalMarks(otherStudent) > totalMarks) {
        ranking++;
      }
    }
    return ranking;
  }
}

// TypeScript can infer types from object literals, reducing the need for explicit type declarations.
// Example: const user = { id: 1, name: 'Alice' }; // inferred as { id: number; name: string; }
// However, explicitly declaring types or interfaces improves clarity and type safety.

// Type:
// - Can define unions, intersections, tuples, and function signatures.
// - Useful for complex types and reusable function aliases.
// Example: type MyUnion = string | number;
//          type MyFunc = (arg1: string, arg2: number) => boolean;

// Interface:
// - Defines the shape of objects (properties and methods) and supports extension.
// - Supports optional (?), readonly, and dynamic (index signatures) properties.
// - Mainly used for objects, easier to read, familiar to OOP developers.
// Example: interface Person { readonly id: number; name?: string; }
//          interface Employee extends Person { department: string; }

// Developers often prefer Interfaces over Types because:
// - Interfaces are familiar to OOP developers and have been in TypeScript since the beginning.
// - They are more readable and easier to understand for defining object shapes.
// - As a result, Interfaces are more commonly used in TypeScript code for objects.
