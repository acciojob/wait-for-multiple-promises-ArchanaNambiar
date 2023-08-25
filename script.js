//your JS code here. If required.
// Function to create a promise that resolves after a random time between min and max seconds
function createRandomPromise(min, max) {
  const randomTime = Math.random() * (max - min) + min;
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(randomTime.toFixed(3)); // Resolve with the time taken (formatted to 3 decimal places)
    }, randomTime * 1000); // Convert seconds to milliseconds
  });
}

// Array to store the promises
const promises = [
  createRandomPromise(1, 3),
  createRandomPromise(1, 3),
  createRandomPromise(1, 3)
];

// Select the loading row and output tbody elements
const loadingRow = document.getElementById("loading-row");
const outputBody = document.getElementById("output");

// Wait for all promises to resolve
Promise.all(promises)
  .then((times) => {
    // Remove the loading row
    loadingRow.remove();

    // Create rows for each promise result
    times.forEach((time, index) => {
      const row = document.createElement("tr");
      const promiseCell = document.createElement("td");
      const timeCell = document.createElement("td");

      promiseCell.textContent = `Promise ${index + 1}`;
      timeCell.textContent = time;

      row.appendChild(promiseCell);
      row.appendChild(timeCell);
      outputBody.appendChild(row);
    });

    // Calculate and add the total time row
    const totalRow = document.createElement("tr");
    const totalPromiseCell = document.createElement("td");
    const totalTimeCell = document.createElement("td");

    totalPromiseCell.textContent = "Total";

    const totalTime = times.reduce((total, t) => total + parseFloat(t), 0);
    totalTimeCell.textContent = totalTime.toFixed(3);

    totalRow.appendChild(totalPromiseCell);
    totalRow.appendChild(totalTimeCell);
    outputBody.appendChild(totalRow);
  })
  .catch((error) => {
    console.error("An error occurred:", error);
  });

