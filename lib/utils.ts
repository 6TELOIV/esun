import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export class RandomNumberGenerator {
  private numbers: number[] = [];
  private maxHistory: number = 30;

  constructor(private range: { min: number; max: number }) {}

  // Generate random number with spread away from recent average
  generate(): number {
    // Calculate the weighted average of the last 30 numbers
    const weightedAverage = this.calculateWeightedAverage();

    // Generate a random number within the given range
    let randomNumber =
      Math.random() * (this.range.max - this.range.min) + this.range.min;

    // Ensure the random number is sufficiently spread from the recent average
    const spreadThreshold = (this.range.max - this.range.min) * 0.1; // Spread threshold as 10% of the range
    if (Math.abs(randomNumber - weightedAverage) < spreadThreshold) {
      randomNumber =
        weightedAverage +
        (Math.random() > 0.5 ? spreadThreshold : -spreadThreshold);
    }

    // Keep track of the generated numbers and ensure the array has a length of at most 30
    this.numbers.push(randomNumber);
    if (this.numbers.length > this.maxHistory) {
      this.numbers.shift();
    }

    return randomNumber;
  }

  // Calculate the weighted average of the last 30 numbers
  private calculateWeightedAverage(): number {
    const total = this.numbers.reduce((sum, num) => sum + num, 0);
    return total / this.numbers.length;
  }
}
