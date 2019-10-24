import {Calendar} from "./calendar";
import {MONTH_NAMES} from "./time";

export class Month {

    prev: HTMLButtonElement = document.body.querySelector('.button-left')
    next: HTMLButtonElement = document.body.querySelector('.button-right')

    constructor(private calendar: Calendar
    ) {
        this.drawNextMonth()
        this.drawPrevMonth()
        this.drawNameOfMonth()
    }


    drawNameOfMonth () {
        let monthTitle = document.querySelector('.month')
        let nameOfMonth = MONTH_NAMES.find((name, index) => index === this.calendar.currentMonth)
        monthTitle.innerHTML = `${nameOfMonth}`
    }


    drawNextMonth () {
        this.next.addEventListener('click', () => {
            if(this.calendar.currentMonth !== 11) {
                this.calendar.currentMonth++
                this.calendar.currentDay = new Date(this.calendar.currentYear, this.calendar.currentMonth)
            }
            else {
                this.calendar.currentYear++
                this.calendar.currentMonth = 0
                this.calendar.currentDay = new Date(this.calendar.currentYear, this.calendar.currentMonth)
            }
            this.calendar.computeAttributes()
            this.calendar.removeDates()
            this.calendar.draw()
        })
    }


    drawPrevMonth () {
        this.prev.addEventListener('click', () => {
            if(this.calendar.currentMonth !== 0) {
                this.calendar.currentMonth--
                this.calendar.currentDay = new Date(this.calendar.currentYear, this.calendar.currentMonth)
            }
            else {
                this.calendar.currentYear--
                this.calendar.currentMonth = 11
                this.calendar.currentDay = new Date(this.calendar.currentYear, this.calendar.currentMonth)
            }
            this.calendar.computeAttributes()
            this.calendar.removeDates()
            this.calendar.draw()
        })
    }
}