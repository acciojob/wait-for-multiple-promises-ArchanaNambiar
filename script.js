//your JS code here. If required.
function delay(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        const outputTable = document.getElementById('output');
        const loadingRow = document.getElementById('loading-row');

        const promises = [
            delay(Math.random() * 2000 + 1000), // Between 1 and 3 seconds
            delay(Math.random() * 2000 + 1000),
            delay(Math.random() * 2000 + 1000)
        ];

        Promise.all(promises)
            .then(() => {
                outputTable.removeChild(loadingRow);

                promises.forEach((promise, index) => {
                    const row = document.createElement('tr');
                    const nameCell = document.createElement('td');
                    const timeCell = document.createElement('td');

                    nameCell.textContent = `Promise ${index + 1}`;
                    timeCell.textContent = (promise / 1000).toFixed(3);

                    row.appendChild(nameCell);
                    row.appendChild(timeCell);
                    outputTable.appendChild(row);
                });

                const totalRow = document.createElement('tr');
                const totalNameCell = document.createElement('td');
                const totalTimeCell = document.createElement('td');

                totalNameCell.textContent = 'Total';
                totalTimeCell.textContent = (promises.reduce((total, promise) => total + promise, 0) / 1000).toFixed(3);

                totalRow.appendChild(totalNameCell);
                totalRow.appendChild(totalTimeCell);
                outputTable.appendChild(totalRow);
            });