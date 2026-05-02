let transactions = JSON.parse(localStorage.getItem('transactions')) || [];
const form = document.getElementById('transaction-form');
const list = document.getElementById('transaction-list');
const balanceEl = document.getElementById('total-balance');
let myChart;

function updateUI() {
    list.innerHTML = '';
    let total = 0;
    let categories = { Makanan: 0, Transportasi: 0, Hiburan: 0 };

    transactions.forEach((t, index) => {
        total += t.amount;
        categories[t.category] += t.amount;

        const li = document.createElement('li');
        li.innerHTML = `
            <span><strong>${t.name}</strong> - Rp ${t.amount.toLocaleString()} (${t.category})</span>
            <button class="delete-btn" onclick="removeTransaction(${index})">Hapus</button>
        `;
        list.appendChild(li);
    });

    balanceEl.innerText = `Rp ${total.toLocaleString()}`;
    updateChart(categories);
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

function addTransaction(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const amount = parseInt(document.getElementById('amount').value);
    const category = document.getElementById('category').value;

    transactions.push({ name, amount, category });
    form.reset();
    updateUI();
}

function removeTransaction(index) {
    transactions.splice(index, 1);
    updateUI();
}

function updateChart(data) {
    const ctx = document.getElementById('expenseChart').getContext('2d');
    
    if (myChart) myChart.destroy(); // Hapus chart lama sebelum buat baru

    myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(data),
            datasets: [{
                data: Object.values(data),
                backgroundColor: ['#f1c40f', '#3498db', '#e67e22']
            }]
        }
    });
}

form.addEventListener('submit', addTransaction);
updateUI(); // Inisialisasi awal