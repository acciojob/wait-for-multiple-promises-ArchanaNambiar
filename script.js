//your JS code here. If required.
// Function to create a Promise that resolves after a random time between 1 and 3 seconds
    function waitRandomTime() {
      const min = 1000; // 1 second in milliseconds
      const max = 3000; // 3 seconds in milliseconds
      const randomTime = Math.floor(Math.random() * (max - min + 1)) + min;
      return new Promise(resolve => setTimeout(resolve, randomTime));
    }

    // Function to update the table with the results
    function updateTable(results) {
      const loadingText = document.getElementById("loading-text");
      loadingText.parentNode.removeChild(loadingText);

      // Update the table with the results of each Promise
      for (let i = 0; i < results.length; i++) {
        const promiseNumber = i + 1;
        const timeInSeconds = (results[i] / 1000).toFixed(3);
        const newRow = document.createElement("tr");
        const promiseCell = document.createElement("td");
        const timeCell = document.createElement("td");
        promiseCell.textContent = `Promise ${promiseNumber}`;
        timeCell.textContent = timeInSeconds;
        newRow.appendChild(promiseCell);
        newRow.appendChild(timeCell);
        document.querySelector("table").appendChild(newRow);
      }

      // Calculate the total time taken to resolve all promises
      const totalTime = results.reduce((acc, curr) => acc + curr, 0);
      const totalInSeconds = (totalTime / 1000).toFixed(3);

      // Add the row for total time to the table
      const totalRow = document.createElement("tr");
      const totalCell = document.createElement("td");
      const totalTimeCell = document.createElement("td");
      totalCell.textContent = "Total";
      totalTimeCell.textContent = totalInSeconds;
      totalRow.appendChild(totalCell);
      totalRow.appendChild(totalTimeCell);
      document.querySelector("table").appendChild(totalRow);
    }

    // Create three promises
    const promises = [waitRandomTime(), waitRandomTime(), waitRandomTime()];

    // Wait for all promises to resolve using Promise.all
    Promise.all(promises)
      .then(results => {
        // Once all promises are resolved, update the table with the results
        updateTable(results);
      })
      .catch(error => {
        console.error("An error occurred:", error);
      });