# 📅 Revision Reminder using Google Sheets and Google Calendar

This project automates reminders for revision topics (like coding, non-tech, etc.) using Google Sheets and Google Calendar. You simply enter the date, topic, and category in the sheet, and the script automatically adds calendar events as reminders.

---

## 🚀 Features

- Set up reminders via Google Calendar from a Google Sheet
- Customize topics like Coding, DSA, Soft Skills, etc.
- Easy to reuse and modify as per individual learning needs

---

## 📁 Project Structure

📂 Google-Sheet-Reminder/
├── 📄 Code.gs # Google Apps Script code
├── 📄 README.md # Project documentation (this file)


---

## 🧰 Prerequisites

- A Google account
- A Google Sheet with the following columns:  
  `Date`, `Topic`, `Category`
- Basic knowledge of Google Apps Script (helpful but not required)

---

## 🛠️ Setup Instructions

### 1. Copy the Sheet Template

- Open Google sheet 
- Or create a new Google Sheet with headers in Row 1:
- Date | Topic | Category

- 
### 2. Open Apps Script Editor

- Go to `Extensions` → `Apps Script` in your Google Sheet
- Replace the default code with your `Code.gs` script from this repo

### 3. Paste the Script

```javascript
// Sample function (replace with full code from Code.gs)
function createRevisionReminders() {
const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
const data = sheet.getDataRange().getValues();
const calendar = CalendarApp.getDefaultCalendar();

for (let i = 1; i < data.length; i++) {
  let [date, topic, category] = data[i];
  if (date && topic) {
    calendar.createAllDayEvent(`📘 ${category}: ${topic}`, new Date(date));
  }
}
}
(Make sure to paste your actual code instead of the above snippet)
```
4. Save and Run
- Click the disk icon 💾 to save
- Run the function createRevisionReminders once
- Grant permission when prompted

Tips 
Use triggers to automate daily runs (Triggers → Add Trigger → time-driven)
