import {TIME} from './time'
import {Month} from "./month"
import {Cell} from "./cell";

export class Calendar {
    cell: Cell
    month: Month
    calendar = document.querySelector('.calendar')
    currentDay = new Date()
    currentMonth = this.currentDay.getMonth()
    currentYear = this.currentDay.getFullYear()
    firstDayOfMonth: Date
    firstDayOfNextMonth: Date
    timeOfCurrentMonth: number
    timeOfNextMonth: number
    amountDayOnMonth: number
    lastDayOfMonth: Date

    constructor() {
        this.cell = new Cell()
        this.month = new Month(this)
        this.computeAttributes()
        this.draw()
    }

    computeAttributes () {
        this.firstDayOfMonth = new Date(this.currentYear, this.currentMonth)
        this.firstDayOfNextMonth = new Date(this.currentYear, this.currentMonth + 1)
        this.timeOfCurrentMonth = this.firstDayOfMonth.getTime()
        this.timeOfNextMonth = this.firstDayOfNextMonth.getTime()
        this.amountDayOnMonth = (this.timeOfNextMonth - this.timeOfCurrentMonth) /  TIME.DAY
        this.lastDayOfMonth = new Date(this.currentYear, this.currentMonth, this.amountDayOnMonth)
    }

    computeLastMonth():number {
        let lastMonth:number
        if(this.currentMonth !== 0) {
            return lastMonth = this.currentMonth - 1
        }
        else {
           return lastMonth = 11
        }
    }

    draw () {
        this.addCellBeforeFirstDay()
        this.addDates()
        this.addCellAfterLastDay()
        this.month.drawNameOfMonth()
        this.highlightCurrentDay()
        console.log(this.currentDay)
    }

    addCellBeforeFirstDay () {
        let day = this.firstDayOfMonth
        let dayNumber = this.firstDayOfMonth.getDate()
        let lastMonth = this.computeLastMonth()
        let amountDayOfWeekBeforeFirstDay = this.firstDayOfMonth.getDay()
        if(amountDayOfWeekBeforeFirstDay !== 0) {
            for (let i = 1; i < amountDayOfWeekBeforeFirstDay; i++) {
                let cell = this.cell.createCell()
                cell.style.color = "darkGray"
                dayNumber = new Date(day.getTime() - TIME.DAY).getDate()
                day = new Date(this.currentYear, lastMonth, dayNumber)
                cell.innerHTML = `${dayNumber}`
                this.calendar.prepend(cell)
            }
        }
        else {
            for (let i = 1; i < 7; i++) {
                let cell = this.cell.createCell()
                cell.style.color = "darkGray"
                day = new Date(this.currentYear, this.currentMonth, dayNumber)
                dayNumber = new Date(day.getTime() - TIME.DAY).getDate()
                cell.innerHTML = `${dayNumber}`
                this.calendar.prepend(cell)
            }
        }
    }

    addCellAfterLastDay () {
        let day = this.lastDayOfMonth
        let dayNumber = this.lastDayOfMonth.getDate()
        let amountDayOfWeekAfterLastDay = 7 - this.lastDayOfMonth.getDay()

        if(amountDayOfWeekAfterLastDay !== 7) {
            for (let i = 0; i < amountDayOfWeekAfterLastDay; i++) {
                let cell = this.cell.createCell()
                cell.style.color = "darkGray"
                day = new Date(this.currentYear, this.currentMonth, dayNumber)
                dayNumber = new Date(day.getTime() + TIME.DAY).getDate()
                cell.innerHTML = `${dayNumber}`
                this.calendar.append(cell)
            }
        }
    }

    addDates () {
        let dayNumber = this.firstDayOfMonth.getDate()
        let day = this.firstDayOfMonth
        for (let i = 0; i < this.amountDayOnMonth; i++) {
            let cell = this.cell.createCell()
            cell.innerHTML = `${dayNumber}`
            this.calendar.append(cell)

            day = new Date(this.currentYear, this.currentMonth, dayNumber)
            dayNumber = new Date(day.getTime() + TIME.DAY).getDate()
        }

    }

    removeDates () {
        while (this.calendar.firstChild) {
            this.calendar.removeChild(this.calendar.firstChild);
        }
    }

    highlightCurrentDay () {
        let currentDay = new Date()
        if(currentDay.getMonth() === this.currentMonth) {
            let cells= this.calendar.querySelectorAll('.cell')
            let cellsArr = [...cells] as HTMLElement[]
            let currentDateCell = cellsArr.find(cell => cell.innerHTML === `${currentDay.getDate()}`)
            currentDateCell.style.backgroundColor = '#FFB97C'
        }

    }

}