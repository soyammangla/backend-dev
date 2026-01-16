const fs = require("fs");

// Read input file asynchronously
fs.readFile("input.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file");
    return;
  }

  // Remove extra spaces and split words
  const words = data.trim().split(/\s+/);
  const wordCount = words.length;

  const result = `Total number of words: ${wordCount}`;

  // Write result to output file
  fs.writeFile("output.txt", result, (err) => {
    if (err) {
      console.error("Error writing file");
      return;
    }
    console.log("Word count written successfully");
  });
});
