class DatePicker {
    constructor(divId, callback) {
        this.divId = divId;
        this.callback = callback;
        this.container = document.getElementById(divId);
        if (!this.container) {
            console.error("DatePicker error: Div not found");
            return;
        }
    }

    render(date) {
        const month = date.getMonth();
        const year = date.getFullYear();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        this.month = date.getMonth();
        this.year = date.getFullYear();
        let html = `<div class="calendar-header">
                        <button class="month-nav" id="${this.divId}-prev">&lt;</button>
                        <span class="month-year">${this.getMonthName(month)} ${year}</span>
                        <button class="month-nav" id="${this.divId}-next">&gt;</button>
                    </div>
                    <table class="calendar-table">
                    <thead>
                        <tr><th>Su</th><th>Mo</th><th>Tu</th><th>We</th><th>Th</th><th>Fr</th><th>Sa</th></tr>
                    </thead>
                    <tbody>`;

        let day = 1;
        for (let i = 0; i < 6; i++) { // up to 6 rows
            html += "<tr>";
            for (let j = 0; j < 7; j++) { // 7 days of the week
                if (i === 0 && j < firstDay) {
                    html += "<td class='dimmed'></td>"; // days from previous month
                } else if (day > daysInMonth) {
                    break; // exit if all days have been rendered
                } else {
                    let today = new Date().toDateString() === new Date(year, month, day).toDateString() ? "today" : "";
                    html += `<td class="${today}" data-day="${day}">${day}</td>`;
                    day++;
                }
            }
            html += "</tr>";
            if (day > daysInMonth) {
                break; // exit if all days have been rendered
            }
        }

        html += "</tbody></table>";

        this.container.innerHTML = html;

        this.addEventListeners();
    }

    addEventListeners() {
        const prevButton = document.getElementById(`${this.divId}-prev`);
        const nextButton = document.getElementById(`${this.divId}-next`);

        prevButton.addEventListener('click', () => {
            const currentMonth = new Date(this.year, this.month - 1);
            this.render(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
        });

        nextButton.addEventListener('click', () => {
            const currentMonth = new Date(this.year, this.month + 1);
            this.render(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
        });

        // Cập nhật phần lắng nghe sự kiện click cho các ngày trong tháng
        Array.from(this.container.getElementsByTagName('td')).forEach(cell => {
            if (cell.dataset.day) {
                cell.addEventListener('click', () => {
                    this.callback(this.divId, { month: this.month + 1, day: parseInt(cell.dataset.day, 10), year: this.year });
                });
            }
        });
    }


    getMonthName(month) {
        return new Date(0, month).toLocaleString('default', { month: 'long' });
    }
}
